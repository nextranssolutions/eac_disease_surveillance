<?php

namespace Modules\OTP\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Modules\Authentication\App\Models\ParUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;

class OTPController extends Controller
{
    public function requestOtp(Request $req)
{
    try {
        $process_id = 19;
        // print_r($req->email_address);
        // Decode the email address before validation
        $decodedEmail = base64_decode($req->email_address);

        $validator = Validator::make(['email_address' => $decodedEmail] + $req->all(), [
           // 'email_address' => 'required|email',
            'created_by' => 'nullable|max:255',
            'requested_on' => now(),
            'created_on' => now(),
        ]);
        $encryptedEmail = aes_encrypt($decodedEmail);

        $user_count = Db::table('usr_users_information')->where(array('email_address'=>$encryptedEmail))->count();

        if ($user_count >0) {
            return response()->json([
                'success' => false,
                'message' => 'There is an exiting account with a similar email, proceed to login',
            ], 200);
        }
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 200);
        }

        $otp = rand(10000, 99999);
        $expiryTime = now()->addMinutes(3);
        
       
      
        $otpRecord = DB::table('usr_onetimepwd_tokens')
            ->where('email_address', '=', $encryptedEmail)
            ->where('expiry_time', '>=', now())
            ->count();

        if ($otpRecord > 0) {
            return response()->json([
                'success' => false,
                'message' => 'There is an active OTP Token already sent to your email, check to proceed',
            ], 200);
        }

        $user_data = [
            'email_address' => $encryptedEmail,
            'otp_value' => aes_encrypt($otp),
            'expiry_time' => $expiryTime,
            'process_id' => $process_id,
        ];

        $template_id = 9;
        $subject = 'OTP Verification';
        $vars = [
            '{email_address}' => $decodedEmail,
            '{otp_value}' => $otp,
            '{expiry_time}' => $expiryTime->toDateTimeString(),
        ];

        $res = sendMailNotification($decodedEmail, $subject, '', '', '', '', '', $template_id, $vars);
        if ($res['success']) {
            $where = array('email_address' => $encryptedEmail);
            if (recordExists('usr_onetimepwd_tokens', $where)) {
                $previous_data = getPreviousRecords('usr_onetimepwd_tokens', $where);
                $user_data['altered_by'] = $encryptedEmail;
                $user_data['dola'] = Carbon::now();
                $user_data['requested_on'] = Carbon::now();
                $resp = updateRecord('usr_onetimepwd_tokens', $previous_data['results'], $where, $user_data, '');
            } else {
                $application_code = generateApplicationCode($process_id, 'usr_onetimepwd_tokens');
                $user_data['created_by'] = $encryptedEmail;
                $user_data['created_on'] = Carbon::now();
                $user_data['requested_on'] = Carbon::now();
                $user_data['application_code'] = $application_code;

                $resp = insertRecord('usr_onetimepwd_tokens', $user_data);

                if ($resp['success']) {
                    $user_id = $resp['record_id'];
                    $user_data['onetimepwd_tokens_id'] = $user_id;
                    insertRecord('usr_onetimepwd_tokenslogs', $user_data);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Error occurred while generating OTP: ' . $resp['message'],
                    ], 500);
                }
            }
            $response = [
                'success' => true,
                'message' => 'OTP sent successfully',
            ];
        } else {
            $response = [
                'otp' => $otp,
                'success' => false,
                'message1' => $res['message'],
                'message' => 'Failed to send OTP. Please try again.',
            ];
        }
    } catch (\Exception $exception) {
        Log::error('OTP Request Error: ' . $exception->getMessage());
        $response = [
            'success' => false,
            'message' => 'An error occurred while requesting OTP: ' . $exception->getMessage(),
        ];
    } catch (\Throwable $throwable) {
        Log::error('OTP Request Error: ' . $throwable->getMessage());
        $response = [
            'success' => false,
            'message' => 'An error occurred while requesting OTP: ' . $throwable->getMessage(),
        ];
    }

    return response()->json($response, 200);
}
    public function requestLoginOtp(Request $req)
{
    try {
        $process_id = 19;

        // Decode the email address before validation
        $decodedEmail = base64_decode($req->email_address);

        $validator = Validator::make(['email_address' => $decodedEmail] + $req->all(), [
            'email_address' => 'required|email',
            'requested_on' => now(),
            'created_on' => now(),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $user_password = base64_decode($req->password);
        $email_address = aes_encrypt($decodedEmail);

        $user = ParUsers::where('email_address', $email_address)->first();

        if (!Hash::check($user_password, $user->password)) {
            $login_logs = array(
                'email_address' => $email_address,
                'attempted_on' => Carbon::now(),
                'ip_address' => $req->ip(), // Add the IP address here
                'created_by' => $email_address,
                'created_on' => Carbon::now()
            );

            $resp = insertRecord('aud_userfailedlogins_logs', $login_logs);

            return response()->json(['success' => false, 'message' => 'The password entered is incorrect. Please try again or reset your account password.'], 200);
        }

        $otp = rand(10000, 99999);
        $expiryTime = now()->addMinutes(3);
       
        // $encryptedEmail = aes_encrypt($email_address);

        $otpRecord = DB::table('usr_onetimepwd_tokens')
            ->where('email_address', '=', $email_address)
            ->where('expiry_time', '>=', now())
            ->count();

        if ($otpRecord > 0) {
            return response()->json([
                'success' => false,
                'message' => 'There is an active OTP Token already sent to your email, check to proceed',
            ], 200);
        }

        $user_data = [
            'email_address' => $email_address,
            'otp_value' => aes_encrypt($otp),
            'expiry_time' => $expiryTime,
            'process_id' => $process_id,
        ];

        $template_id = 9;
        $subject = 'OTP Verification';
        $vars = [
            '{email_address}' => aes_decrypt($email_address),
            '{otp_value}' => $otp,
            '{expiry_time}' => $expiryTime->toDateTimeString(),
        ];

        $res = sendMailNotification(aes_decrypt($email_address), $subject, '', '', '', '', '', $template_id, $vars);

        if ($res['success']) {
            $where = array('email_address' => $email_address);
            if (recordExists('usr_onetimepwd_tokens', $where)) {
                $previous_data = getPreviousRecords('usr_onetimepwd_tokens', $where);
                $user_data['altered_by'] = $email_address;
                $user_data['dola'] = Carbon::now();
                $user_data['requested_on'] = Carbon::now();
                $resp = updateRecord('usr_onetimepwd_tokens', $previous_data['results'], $where, $user_data, '');
            } else {
                $application_code = generateApplicationCode($process_id, 'usr_onetimepwd_tokens');
                $user_data['created_by'] = $email_address;
                $user_data['created_on'] = Carbon::now();
                $user_data['requested_on'] = Carbon::now();
                $user_data['application_code'] = $application_code;

                $resp = insertRecord('usr_onetimepwd_tokens', $user_data);

                if ($resp['success']) {
                    $user_id = $resp['record_id'];
                    $user_data['onetimepwd_tokens_id'] = $user_id;
                    insertRecord('usr_onetimepwd_tokenslogs', $user_data);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Error occurred while generating OTP: ' . $resp['message'],
                    ], 500);
                }
            }

            $response = [
                'success' => true,
                'message' => 'OTP sent successfully',
            ];
        } else {
            $response = [
                'otp' => $otp,
                'success' => false,
                'message1' => $res['message'],
                'message' => 'Failed to send OTP. Please try again.',
            ];
        }
    } catch (\Exception $exception) {
        Log::error('OTP Request Error: ' . $exception->getMessage());
        $response = [
            'success' => false,
            'message' => 'An error occurred while requesting OTP: ' . $exception->getMessage(),
        ];
    } catch (\Throwable $throwable) {
        Log::error('OTP Request Error: ' . $throwable->getMessage());
        $response = [
            'success' => false,
            'message' => 'An error occurred while requesting OTP: ' . $throwable->getMessage(),
        ];
    }

    return response()->json($response, 200);
}

}