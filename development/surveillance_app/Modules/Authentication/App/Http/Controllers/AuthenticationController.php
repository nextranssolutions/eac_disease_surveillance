<?php

namespace Modules\Authentication\App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Authentication\App\Models\ParUsers;
use Modules\Authentication\App\Models\ParPasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Helpers\DbHelper;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Modules\AuthenticationUsrApi\app\Emails\PasswordResetMail as EmailsPasswordResetMail;

class AuthenticationController extends Controller
{
    public function onUserLogin(Request $request)
    {
        try {
            $email_address = base64_decode($request->email_address);
            $otp_value = $request->otp_value;
            $user_password = base64_decode($request->password);

            if ($email_address != 'admin@gmail.com') {
                $email_address = aes_encrypt($email_address);
            }
            $user = ParUsers::where('email_address', $email_address)->first();
         
            if (!$user) {
                $login_logs = array(
                    'email_address' => $email_address,
                    'attempted_on' => Carbon::now(),
                    'ip_address' => $request->ip(), // Add the IP address here
                    'created_by' => $email_address,
                    'created_on' => Carbon::now()
                );
                $usr_loggedin_id = 0;
                
                $resp = insertRecord('aud_usermaliciouslogins_logs', $login_logs);

                return response()->json(['success' => false, 'message' => 'The email provided is either incorrect or not associated with any registered account.'], 200);

            } elseif (!Hash::check($user_password, $user->password)) {
                $login_logs = array(
                    'email_address' => $email_address,
                    'attempted_on' => Carbon::now(),
                    'ip_address' => $request->ip(), // Add the IP address here
                    'created_on' => Carbon::now(),
                    'created_by' => $email_address,
                    
                );
                $usr_loggedin_id = 0;
                $resp = insertRecord('aud_userfailedlogins_logs', $login_logs);

                return response()->json(['success' => false, 'message' => 'The password entered is incorrect. Please try again or reset your account password.'], 200);
            }

            // Check if the user is blocked
            if ($user->is_verified === false) {
                return response()->json(['success' => false, 'message' => 'The account has not been verified, verify the account via your email and proceed'], 401);
            }

            if ($otp_value) {
                $encryptedEmail = $email_address;

                $otpRecord = DB::table('usr_onetimepwd_tokens')
                    ->where('email_address', '=', $encryptedEmail)
                    ->where('otp_value', '=', aes_encrypt($otp_value))
                    ->where('expiry_time', '>=', now()) // Check if OTP is not expired
                    ->first();

                if (!$otpRecord) {
                    return response()->json([
                        'success' => false,
                        'encryptedEmail' => $encryptedEmail,
                        'otp_value' => aes_encrypt($otp_value),
                        'message' => 'Invalid or expired OTP. Please request a new OTP.',
                    ], 200);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'OTP is required.',
                ], 200);
            }

            $account_type_id = $user->account_type_id;
            $user_group_id = $user->user_group_id;
            $userId = $user->id;
            $country_of_origin_id = $user->country_of_origin_id;
            $country_id = $user->country_id;
            $other_names = $user->other_names;
            
            $country_data = getTableData('par_countries', array('id' => $country_of_origin_id));
            if (!$country_data) {
                $country_data = getTableData('par_countries', [
                    'id' => $country_id
                ]);
            }

            $countryName = $country_data ? $country_data->name : null;

            $usergroup_data = getTableData('usr_users_groups', [
                'id' => $user_group_id
            ]);
            $useraccount_data = getTableData('sys_account_types', [
                'id' => $account_type_id
            ]);
            $userGroupName = $usergroup_data ? $usergroup_data->name:$useraccount_data->name;
            $user_first_name = $user->first_name;

             //update the last_login_time
             DB::table('usr_users_information')->where(array('id' => $userId))
             ->update(array('last_login_time' => now()));

            $token = JWTAuth::fromUser($user);
         
            $res = array(
                'status' => 'success',
                'success' => 'success',
                'message' => "Successfully logged in as $userGroupName",
                'user_group_name' => $userGroupName,
                'first_name' => aes_decrypt($user_first_name),
                'id' => $userId,
                'isLoggedIn' => true,
                'account_type_id' => $account_type_id,
                'user_group_id' => $user_group_id,
                'userId' => $userId,
                'access_token' => $token,
                'country_of_origin' => $country_of_origin_id,
                'countryName' => $countryName,
                'partner_state_id' => $user->partner_state_id,
                
                'other_names' => aes_decrypt($other_names),
                'token_type' => 'Bearer',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]
            );
            $account_type = false;
            //login logs 
            $login_logs = array(
                'usr_id' => $userId,
                'email_address' => $email_address,
                'login_date' => Carbon::now(),
                'ip_address' => $request->ip(),
                'created_by' => $userId,
                'created_on' => Carbon::now()
            );
            $usr_loggedin_id = 0;
            $resp = insertRecord('usr_login_logs', $login_logs);

            if ($resp['success']) {
                $usr_loggedin_id = $resp['record_id'];
            }

            $res['usr_loggedin_id'] = $usr_loggedin_id;

            $login_logs = array(
                'user_id' => $userId,
                'email_address' => $email_address,
                'login_on' => Carbon::now(),
                'logout_on' => Carbon::now(),
                'ip_address' => $request->ip(), // Add the IP address here
                'created_by' => $userId,
                'created_on' => Carbon::now()
            );
            
            $usr_loggedin_id = 0;
            insertRecord('aud_userloginout_logs', $login_logs);

            if (validateIsNumeric($account_type_id)) {

                $account_type = DB::table('sys_account_types as  t1')
                    ->join('sys_dashboard_types as t2', 't1.dashboard_type_id', '=', 't2.id')
                    ->select('t1.*', 't2.name as dashboard_name', 't2.routerlink as dashboard_link')
                    ->where('t1.id', $account_type_id)
                    ->first();

            }
            if ($account_type) {
                $res['account_type_name'] = $account_type->name;
                $res['dashboard_name'] = $account_type->dashboard_name;
                $res['dashboard_link'] = $account_type->dashboard_link;
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    protected function getCompleteNavigationStructure($navigationIds)
    {
        $navigationItems = DB::table('par_navigation_items')->whereIn('id', $navigationIds)->get();
        $hierarchicalItems = [];

        foreach ($navigationItems as $item) {
            if ($item->level === 0) {
                $hierarchicalItems[$item->id] = $item;
                $item->children = $this->fetchChildren($item->id);
            }
        }

        return array_values($hierarchicalItems);
    }

    protected function fetchChildren($parentId)
    {
        $children = DB::table('par_navigation_items')
            ->where('parent_id', $parentId)
            ->get();

        foreach ($children as $child) {
            $child->children = $this->fetchChildren($child->id);
        }

        return $children;
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Logged in successfully',
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60 // Token expiration time in minutes
            ]
        ]);
    }



    // password reset request api call
    public function requestParPasswordReset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email_address' => 'required|email|exists:par_users,email_address',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $user = ParUsers::where('email_address', $request->email_address)->first();

        // Generate a unique token (like UUID) for password reset
        $token = Str::uuid();

        // Store the token in the database with associated user ID and expiry timestamp
        ParPasswordReset::create([
            'user_id' => $user->id,
            'token' => $token,
            'email_address' => $request->email_address,
            'expires_at' => now()->addHours(1), // Set expiration time, e.g., 1 hour from now
        ]);


        // Compose the password reset link with the token
        $resetLink = url("/reset-password?token=$token");

        // Send email with the reset link
        Mail::to($request->email_address)->send(new EmailsPasswordResetMail($resetLink));

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset link sent successfully. Check your email.',
        ]);
    }



    //  Reset Password API call
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string|exists:password_resets,token',
            'password' => 'required|string|min:8|confirmed|strong_password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $ParPasswordReset = ParPasswordReset::where('token', $request->token)
            ->where('expires_at', '>', now()) // Check token expiration
            ->first();

        if (!$ParPasswordReset) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired token.',
            ], 422);
        }

        $user = ParUsers::find($ParPasswordReset->user_id);
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the used token
        $ParPasswordReset->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successfully.',
        ]);
    }


    public function funcUserLogOut(Request $request)
    {
        try {
            $usr_loggedin_id = $request->usr_loggedin_id;
            $email_address = $request->email_address;
            $userId = $request->userId;
            auth()->logout(); // Log the user out
            //check for log-out logs
            $table_name = 'usr_login_logs';
            $where = array('id' => $usr_loggedin_id, 'email_address' => $email_address);

            $record = DB::table('usr_login_logs')
                ->where($where)
                ->first();
            if (!$record) {
                $previous_data = getPreviousRecords($table_name, $where);

                $logout_data = array(
                    'logout_date' => Carbon::now(),
                    'logout_ipaddress' => getIPAddress(),
                    'altered_by' => $userId,
                    'dola' => Carbon::now()
                );
                $resp = updateRecord($table_name, $previous_data['results'], $where, $logout_data, '');

            } else {
                $login_logs = array(
                    'usr_id' => $userId,
                    'email_address' => $email_address,
                    'logout_date' => Carbon::now(),
                    'ip_address' => getIPAddress(),
                    'created_by' => $userId,
                    'created_on' => Carbon::now()
                );
                $usr_loggedin_id = 0;
                $resp = insertRecord('usr_login_logs', $login_logs);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logout failed. Please try again.',
            ], 500);
        }
    }
    public function onLoadUserCountryOfOriginCountData(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $check_exempt = DB::table('tra_exemptedpublic_tables')
                ->where(array('table_name' => $table_name))
                ->count();
            $sql = DB::table($table_name . ' as t1');

            if ($check_exempt > 0 || $table_name == null || $table_name == '') {
                $res = array('success' => false, 'message' => 'Table has been blocked for access');
                return response()->json($res);
            }
            if (!empty($requestData)) {
                $sql->where($requestData);
            }

            $data = $sql->get();

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
}
