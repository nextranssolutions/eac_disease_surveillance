<?php

namespace Modules\UserManagement\App\Http\Controllers;

use Modules\UserManagement\App\Models\ParUsers;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    // public function onsaveUserGroupDetails(Request $req)
    // {
    //     try {
    //         $record_id = $req->input("id");
    //         $appworkflow_status_id = 2;
    //         $record = Db::table('usr_users_information')
    //             ->where('email_address', '=', $record_id)
    //             ->count();

    //         if ($record > 0) {
    //             $table_name = 'usr_users_information';
    //             $full_names = $req->first_name . ' ' . $req->other_names;

    //             $user_data = array(
    //                 'account_type_id' => $req->account_type_id,
    //                 'account_group_id' => $req->account_group_id,
    //                 'user_title_id' => $req->user_title_id,
    //                 'country_of_origin_id' => $req->country_of_origin_id,
    //                 'member_state_id' => $req->member_state_id,
    //                 'institution_type_id' => $req->institution_type_id,
    //                 'email_address' => aes_encrypt($req->email_address),
    //                 'other_names' => aes_encrypt($req->other_names),
    //                 'first_name' => aes_encrypt($req->first_name),
    //                 'appworkflow_status_id' => $appworkflow_status_id,
    //                 'identification_number' => $req->identification_number,
    //                 'institution_id' => $req->institution_id,
    //                 'institution_department_id' => $req->institution_department_id,
    //                 'secretariat_department_id' => $req->secretariat_department_id,
    //                 'identification_type_id' => $req->identification_type_id
    //             );

    //             $user_data['altered_by'] = $req->email_address;
    //             $user_data['dola'] = Carbon::now();

    //             $where = array('id' => $record_id);
    //             if (recordExists($table_name, $where)) {

    //                 $previous_data = getPreviousRecords($table_name, $where);
    //                 $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

    //             }
    //             if ($resp['success']) {
    //                 $template_id = 5;
    //                 $subject = 'User Permissions & Approval';
    //                 $vars = array(
    //                     '{user_name}' => $full_names,
    //                     '{email_address}' => $req->email_address
    //                 );
    //                 $res = sendMailNotification($full_names, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

    //                 $res = array(
    //                     'success' => true,
    //                     'message' => 'The User Account has been Updated has been sent to you email.',

    //                 );
    //             } else {
    //                 $res = array(
    //                     'success' => false,
    //                     'resp' => $resp,
    //                     'message' => 'Error Occurred in updating the user Account Details.',

    //                 );
    //             }
    //         } else {
    //             $res = array(
    //                 'success' => false,
    //                 'message' => 'There is no existing user account with the same Email Address, contact the System administrator.'
    //             );

    //         }
    //     } catch (\Exception $exception) {
    //         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     } catch (\Throwable $throwable) {
    //         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     }
    //     return response()->json($res, 200);
    // }

    public function onsaveUserGroupDetails(Request $req)
    {
        try {
            $record_id = $req->input("id");
            $appworkflow_status_id = 2;
            $record = Db::table('usr_users_information')
                ->where('id', '=', $record_id)
                ->count();
            if ($record > 0) {
                $table_name = 'usr_users_information';
                $full_names = $req->first_name . ' ' . $req->other_names;

                $user_data = array(

                    'account_type_id' => $req->account_type_id,
                    'account_group_id' => $req->account_group_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'partner_state_id' => $req->partner_state_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($req->email_address),
                    'other_names' => aes_encrypt($req->other_names),
                    'first_name' => aes_encrypt($req->first_name),
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'institution_id' => $req->institution_id,
                    'institution_department_id' => $req->institution_department_id,
                    'secretariat_department_id' => $req->secretariat_department_id,
                    'identification_type_id' => $req->identification_type_id,
                    'user_group_id' => $req->user_group_id
                );

                $user_data['altered_by'] = $req->email_address;
                $user_data['dola'] = Carbon::now();

                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                }
                if ($resp['success']) {
                    $template_id = 5;
                    $subject = 'User Permissions & Approval';
                    $vars = array(
                        '{user_name}' => $full_names,
                        '{email_address}' => $req->email_address
                    );
                    $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);


                    $res = array(
                        'success' => true,
                        'message' => 'The User Account has been Updated has been sent to you email.',

                    );
                } else {
                    $res = array(
                        'success' => false,
                        'resp' => $resp,
                        'message' => 'Error Occurred in updating the user Account Details.',

                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'There is no existing user account with the same Email Address, contact the System administrator.'
                );

            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }








    public function onUpdateUserProfileInformation(Request $req)
    {
        try {
            $record_id = $req->input("id");
            $appworkflow_status_id = 2;
            $record = DB::table('usr_users_information')
                ->where('id', '=', $record_id)
                ->count();
            if ($record > 0) {
                $table_name = 'usr_users_information';
                $full_names = $req->first_name . ' ' . $req->other_names;

                $user_data = array(
                    'account_type_id' => $req->account_type_id,
                    'account_group_id' => $req->account_group_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'member_state_id' => $req->member_state_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($req->email_address),
                    'other_names' => aes_encrypt($req->other_names),
                    'first_name' => aes_encrypt($req->first_name),
                    'appworkflow_status_id' => $appworkflow_status_id,
                    'identification_number' => $req->identification_number,
                    'institution_id' => $req->institution_id,
                    'institution_department_id' => $req->institution_department_id,
                    'secretariat_department_id' => $req->secretariat_department_id,
                    'identification_type_id' => $req->identification_type_id
                );
                $user_data['altered_by'] = $req->email_address;
                $user_data['dola'] = Carbon::now();

                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');
                }
                if ($resp['success']) {
                    $template_id = 5;
                    $subject = 'User Permissions & Approval';
                    $vars = array(
                        '{user_name}' => $full_names,
                        '{email_address}' => $req->email_address
                    );
                    $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                    $res = array(
                        'success' => true,
                        'message' => 'The User Account has been updated and account details has been sent to your email.',
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'resp' => $resp,
                        'message' => 'Error occurred in updating the account details.',
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'There is no existing user account with the same Email Address, contact System Administrator.'
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUpdateTraderAccountDetails(Request $req)
    {
        try {
            // Validate request data
            $validatedData = $req->validate([
                'id' => 'required|integer',
                // 'identification_no' => 'required|string',
                'email_address' => 'required|email',
                'traderaccount_type_id' => 'nullable|integer',
                'contact_person' => 'nullable|string',
                'contact_person_email' => 'nullable|email',
                'contact_person_telephone' => 'nullable|string',
                'physical_address' => 'nullable|string',
                'postal_address' => 'nullable|string',
                'telephone_no' => 'nullable|string',
                'country_id' => 'nullable|integer',
                // 'region_id' => 'nullable|integer',
                // 'district_id' => 'nullable|integer',
                'name' => 'nullable|string',
                'mobile_no' => 'nullable|string',
            ]);

            $record_id = $req->input('id');
            $identification_no = $req->identification_no;
            $email_address = $req->email_address;

            // Default response
            $res = ['success' => false, 'message' => 'Trader information updated.'];

            // Check if record exists in the database
            $existingRecord = DB::table('txn_trader_account')
                // ->where('email_address', aes_encrypt($email_address))
                ->where('id', $record_id)
                ->exists();
            $userRecord = DB::table('usr_users_information')
                ->where('id', $record_id)
                ->exists();

            if ($existingRecord) {
                $table_name = 'txn_trader_account';

                // Prepare user data for update
                $trader_data = [
                    'traderaccount_type_id' => $req->traderaccount_type_id,
                    'contact_person' => $req->contact_person,
                    'contact_person_email' => $req->contact_person_email,
                    'contact_person_telephone' => $req->contact_person_telephone,
                    'physical_address' => $req->physical_address,
                    'postal_address' => $req->postal_address,
                    'telephone_no' => $req->telephone_no,
                    'country_id' => $req->country_id,
                    'region_id' => $req->region_id,
                    'district_id' => $req->district_id,
                    'name' => $req->name,
                    'mobile_no' => $req->mobile_no,
                    'email_address' => aes_encrypt($req->email_address), // Re-encrypt email
                    'altered_by' => $email_address,
                    'dola' => Carbon::now(),
                ];

                $where = ['id' => $record_id];

                // Check if the specific record exists
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $trader_data, '');

                    if ($resp) {
                        $table_name = 'usr_users_information';

                        // Update the user password directly
                        $user_data = array(

                            'is_initiateprofile_update' => 0,
                            'dola' => Carbon::now(),
                            'altered_by' => $email_address
                        );

                        $where = ['id' => $record_id];

                        // Check if the specific record exists
                        if (recordExists($table_name, $where)) {
                            $previous_data = getPreviousRecords($table_name, $where);
                            $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                            if ($resp['success']) {
                                $res = [
                                    'success' => true,
                                    'message' => 'The User Account has been updated.',
                                ];
                            } else {
                                $res = [
                                    'success' => false,
                                    'message' => 'Error occurred while updating the user account details.',
                                    'resp' => $resp,
                                ];
                            }
                        } else {
                            $res = [
                                'success' => false,
                                'message' => 'The specified record does not exist.',
                            ];
                        }
                    }

                    if ($resp['success']) {
                        $res = [
                            'success' => true,
                            'message' => 'The Trader Account has been updated.',
                        ];
                    } else {
                        $res = [
                            'success' => false,
                            'message' => 'Error occurred while updating the user account details.',
                            'resp' => $resp,
                        ];
                    }
                } else {
                    $res = [
                        'success' => false,
                        'message' => 'The specified record does not exist.',
                    ];
                }
            } else if ($existingRecord) {


            } else {
                $res = [
                    'success' => false,
                    'message' => 'No matching record found for the provided trader or email address.',
                ];
            }
        } catch (\Illuminate\Validation\ValidationException $validationException) {
            // Handle validation errors
            $res = [
                'success' => false,
                'message' => 'Validation error.',
                'errors' => $validationException->errors(),
            ];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    // public function onUserAccountRegistration(Request $req)
    // {
    //     DB::beginTransaction();
    //     $process_id = 1;
    //     $account_type_id = $req->account_type_id;
    //     $otp_value = $req->otp_value;
    //     try {
    //         $validator = Validator::make($req->all(), [
    //             'user_title_id' => 'required|integer',
    //             'account_type_id' => 'required|integer',
    //             'country_of_origin_id' => 'required|integer',
    //             'member_state_id' => 'nullable|integer',
    //             'institution_type_id' => 'nullable|integer',
    //             'institution_id' => 'nullable|integer',
    //             'organization_name' => 'nullable|string',
    //             'institution_department_id' => 'nullable|integer',
    //             'registration_number' => 'nullable|max:50',
    //             'secretariat_department_id' => 'nullable|integer',
    //             'identification_type_id' => 'nullable|integer',
    //             'identification_number' => 'nullable',
    //             'first_name' => 'required|string',
    //             'surname' => 'nullable|string',
    //             'other_names' => 'nullable|string',
    //             'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
    //             'phone_number' => 'nullable|string',

    //             'otp_value' => 'nullable|string',
    //             'created_by' => 'nullable|max:255',
    //             'created_on' => now()
    //         ]);

    //         // $appworkflow_status_id = 1;

    //         if ($validator->fails()) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => $validator->errors()->first(),
    //             ], 422);
    //         }

    //         $app_statusrecord = getInitialWorkflowStatusId($process_id);
    //         if (!$app_statusrecord) {

    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'The Initial Workflow Status Has not been set, contact the system admin',
    //             ], 200);
    //         }

    //         $appworkflow_status_id = $app_statusrecord->appworkflow_status_id;

    //         //OTP validation
    //         if ($otp_value) {
    //             $encryptedEmail = aes_encrypt($req->email_address);
    //             $otpRecord = DB::table('usr_onetimepwd_tokens')
    //                 ->where('email_address', '=', $encryptedEmail)
    //                 ->where('otp_value', '=', aes_encrypt($otp_value))
    //                 ->where('expiry_time', '>=', now()) // Check if OTP is not expired
    //                 ->first();
    //             if (!$otpRecord) {
    //                 return response()->json([
    //                     'success' => false,
    //                     'message' => 'Invalid or expired OTP. Please request a new OTP.',
    //                 ], 200);
    //             }
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'OTP is required.',
    //             ], 200);
    //         }
    //         $generatedPassword = bin2hex(random_bytes(8));

    //         $email_address = aes_encrypt($req->email_address);

    //         $record = DB::table('usr_users_information')
    //             ->where('email_address', $email_address)
    //             ->where('identification_number', '=', $req->identification_number)
    //             ->count();

    //         if ($record > 0) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'There is an existing user account with the same Email Address, reset password or contact the System administrator.'
    //             ], 200);
    //         }


    //         // $telephone_no = $req->phone_number['internationalNumber'];
    //         $table_name = 'usr_users_information';
    //         $application_code = generateApplicationCode($process_id, $table_name);
    //         $full_names = trim($req->first_name . ' ' . $req->surname);

    //         $user_data = [
    //             'account_type_id' => $req->account_type_id,
    //             'user_title_id' => $req->user_title_id,
    //             'country_of_origin_id' => $req->country_of_origin_id,
    //             'institution_type_id' => $req->institution_type_id,
    //             'email_address' => $email_address,
    //             'password' => Hash::make($generatedPassword),
    //             'surname' => aes_encrypt($req->surname),
    //             'first_name' => aes_encrypt($req->first_name),
    //             'phone_number' => aes_encrypt($req->phone_number),
    //             'process_id' => $process_id,
    //             'appworkflow_status_id' => $appworkflow_status_id,
    //             'identification_number' => $req->identification_number,
    //             'institution_id' => $req->institution_id,
    //             'application_code' => $application_code,
    //             'institution_department_id' => $req->institution_department_id,
    //             'secretariat_department_id' => $req->secretariat_department_id,
    //             'identification_type_id' => $req->identification_type_id,
    //             'created_by' => $req->email_address,
    //             'is_initiatepassword_change' => 1,
    //             'created_on' => now(),
    //         ];

    //         $resp = insertRecord('usr_users_information', $user_data);

    //         if (!$resp['success']) {
    //             DB::rollBack();
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Error occurred: ' . $resp['message'],
    //             ], 200);
    //         }

    //         $user_information_id = $resp['record_id'];
    //         $experts_profile_no = '';
    // if ($req->account_type_id == 1) {
    //     $process_id = 2;
    //     $exp_table = 'exp_expertsprofile_information';
    //     $experts_profile_no = generateUserRegistrationNo($exp_table);
    //     $application_code = generateApplicationCode($process_id, $exp_table);
    //     $app_reference_no = generateAppReferenceNo($process_id, $exp_table, $req->email_address);

    //     $app_statusrecord = getInitialWorkflowStatusId($process_id);
    //     if (!$app_statusrecord) {

    //         return response()->json([
    //             "process_id" => $process_id,
    //             'success' => false,
    //             'message' => 'The Initial Workflow Status Has not been set, contact the system admin',
    //         ], 200);
    //     }

    //     $appworkflow_status_id = $app_statusrecord->appworkflow_status_id;

    //     $experts_profile = [
    //         'user_information_id' => $user_information_id,
    //         'app_reference_no' => $app_reference_no,
    //         'experts_profile_no' => $experts_profile_no,
    //         'process_id' => $process_id,
    //         'appworkflow_status_id' => $appworkflow_status_id,
    //         'email_address' => $req->email_address,
    //         'first_name' => $req->first_name,
    //         'other_names' => $req->other_names,
    //         'user_title_id' => $req->user_title_id,
    //         'identification_type_id' => $req->identification_type_id,
    //         'identification_number' => $req->identification_number,
    //         'country_of_origin_id' => $req->country_of_origin_id,
    //         'physical_address' => $req->physical_address,
    //         // 'present_telephone_no' => $telephone_no,
    //         'application_code' => $application_code,
    //         'created_by' => $req->input('email_address'),
    //         'created_on' => now(),
    //     ];

    //     $exp_resp = insertRecord($exp_table, $experts_profile);

    //     if (!$exp_resp['success']) {
    //         DB::rollBack();
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Error occurred: ' . $exp_resp['message'],
    //         ], 200);
    //     }
    // }
    //         initiateInitialProcessSubmission('usr_users_information', $application_code, $process_id, $user_information_id);

    //         $template_id = 1;
    //         $subject = 'Account Creation Notification';
    //         $vars = [
    //             '{user_name}' => $full_names,
    //             '{email_address}' => $req->email_address,
    //             '{user_password}' => $generatedPassword,
    //             '{experts_profile_no}' => $experts_profile_no
    //         ];

    //         $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

    //         if (!$res['success']) {
    //             DB::rollBack();
    //             return response()->json([
    //                 'success' => true,
    //                 'appworkflow_status_id' => $appworkflow_status_id,
    //                 'process_id' => $process_id,
    //                 'message' => 'Your account has been created successfully, unfortunately the email notification failed, try recreating the account or contact the system administrator.',
    //             ], 200);
    //         }

    //         DB::commit();
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Your account has been created successfully, and the account credentials have been emailed to you.',
    //         ], 200);

    //     } catch (\Exception $exception) {
    //         DB::rollBack();
    //         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     } catch (\Throwable $throwable) {
    //         DB::rollBack();
    //         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     }
    //     return response()->json($res, 200);
    // }

    public function onCheckUserPWDRequestDetails(Request $req)
    {
        try {
            $user_id = $req->user_id;
            $email_address = $req->email_address;
            //, 'email_address'=>aes_encrypt($req->email_address)
            $record = Db::table('usr_users_information')
                ->where(array('id' => $user_id))
                ->first();

            if ($record) {
                $is_initiatepassword_change = ($record->is_initiatepassword_change);
                $res = array(
                    'success' => true,
                    'message' => 'Kindly change your account Password to proceed',
                    'is_initiatepassword_change' => $is_initiatepassword_change
                );
            } else {
                $res = array('success' => false, 'message' => 'User Account Not found');

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserChangePassword(Request $req)
    {
        try {
            $loggedInUserId = $req->user_id;
            $new_password = $req->new_password;
            $user_password = $req->password;
            $record = Db::table('usr_users_information')
                ->where('id', '=', $loggedInUserId)
                ->first();

            if ($record) {
                $email_address = ($record->email_address);

                if ($email_address != 'admin@gmail.com') {
                    // $email_address = aes_decrypt($email_address);
                }

                $user = ParUsers::where('email_address', $email_address)->first();

                if (!Hash::check($user_password, $user->password)) {
                    return response()->json(['success' => false, 'message' => 'The old password entered is incorrect. Please try again or reset your account password.'], 200);
                }

                $table_name = 'usr_users_information';
                $record_id = $record->id;

                // Update the user password directly
                $user_data = array(
                    'password' => Hash::make($new_password),
                    'is_initiatepassword_change' => 0,
                    'dola' => Carbon::now(),
                    'altered_by' => $email_address
                );
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $previous_data = getPreviousRecords($table_name, $where);
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                    $password_change = array(
                        'email_address' => $email_address,
                        'user_id' => $loggedInUserId,
                        'password_changedon' => Carbon::now(),
                        'ip_address' => $req->ip(), // Add the IP address here
                        'created_by' => $email_address,
                        'created_on' => Carbon::now()
                    );

                    $resp = insertRecord('aud_userpwdchangerequest_logs', $password_change);

                    if ($resp['success']) {
                        return response()->json([
                            'success' => true,
                            'message' => 'Your password has been successfully updated.'
                        ], 200);
                    } else {
                        return response()->json([
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error occurred in updating the user account details.'
                        ], 200);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                    ], 404);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                ], 404);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserPasswordRequestRecovery(Request $req)
    {
        try {
            $email_address = $req->email_address;
            $userId = $req->userId;
            $record = Db::table('usr_users_information')
                ->where('email_address', '=', aes_encrypt($email_address))
                ->first();
            if ($record) {
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);
                $generatedPassword = bin2hex(random_bytes(8));
                $table_name = 'usr_users_information';
                $record_id = $record->id;
                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address,
                    '{user_password}' => $generatedPassword
                );
                $subject = 'Password Reset Instructions - CONTINENTAL REGULATORY EXPERTS SOLUTION (E-CRES)';
                $template_id = 2;
                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                if ($res['success']) {

                    //reset the user Password
                    $user_data = array(
                        'password' => Hash::make($generatedPassword),
                        'dola' => Carbon::now(),
                        'is_initiatepassword_change' => 1,
                        'altered_by' => $email_address
                    );
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $previous_data = getPreviousRecords($table_name, $where);
                        $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                        $password_reset_logs = array(

                            'email_address' => $email_address,
                            'user_id' => $userId,
                            'requested_on' => Carbon::now(),
                            'ip_address' => $req->ip(), // Add the IP address here
                            // 'created_by' => $userId,
                            'created_on' => Carbon::now(),

                        );
                        // $usr_loggedin_id = 0;
                        insertRecord('aud_userpwdresetrequest_logs', $password_reset_logs);

                    }
                    if ($resp['success']) {
                        $res = array(
                            'success' => true,
                            'message' => 'The reset password has been sent to you email.',

                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error Occurred in updating the user Account Details.',

                        );
                    }
                    //
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error in sending Email notification, please try again or contact the system administrator.',

                    );
                }


            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                );

            }


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserAccountApproval(Request $req)
    {
        try {
            $email_address = $req->email_address;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $loggedInUserId = $req->loggedInUserId;
            $decision_description = $req->decision_description;
            $id = $req->id;
            $record = Db::table('usr_users_information')
                ->where(array('id' => $id))
                ->first();
            $name = '';
            if ($record) {
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);
                $generatedPassword = bin2hex(random_bytes(8));
                $table_name = 'usr_users_information';
                $record_id = $record->id;
                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address
                );

                $subject = 'User Account Notification ' . $decision_description . ' of User Account';
                if ($appworkflow_status_id == 5) {
                    $template_id = 3;
                } else {
                    $template_id = 4;
                }

                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);


                if ($res['success']) {

                    //reset the user Password
                    $user_data = array(
                        'appworkflow_status_id' => $appworkflow_status_id,
                        'dola' => Carbon::now(),
                        'altered_by' => $loggedInUserId
                    );
                    $where = array('id' => $record_id);
                    if (recordExists($table_name, $where)) {

                        $previous_data = getPreviousRecords($table_name, $where);
                        $resp = updateRecord($table_name, $previous_data['results'], $where, $user_data, '');

                    }
                    if ($resp['success']) {
                        $res = array(
                            'success' => true,
                            'message' => 'The user account ' . $decision_description . ' has been effected successfully.',

                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error Occurred in updating the user Account Details.',

                        );
                    }
                    //
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error in sending Email notification, please try again or contact the system administrator.',

                    );
                }


            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify your email address or contact the system administrator for assistance.'
                );

            }


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onUserAccountRejection(Request $req)
    {
        try {
            // Extract parameters from the request
            $email_address = $req->email_address;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $loggedInUserId = $req->loggedInUserId;
            $id = $req->id;

            // Fetch user record from the database
            $record = DB::table('usr_users_information')
                ->where('id', $id)
                ->first();

            if ($record) {
                // decrypt user details
                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);

                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address
                );

                $subject = 'User Account Rejection Notification';

                $template_id = 4;

                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                if ($res['success']) {
                    $user_data = array(
                        'appworkflow_status_id' => $appworkflow_status_id,
                        'dola' => Carbon::now(),
                        'altered_by' => $loggedInUserId
                    );
                    $where = array('id' => $id);

                    if (recordExists('usr_users_information', $where)) {
                        $previous_data = getPreviousRecords('usr_users_information', $where);
                        $resp = updateRecord('usr_users_information', $previous_data['results'], $where, $user_data, '');
                    }

                    if ($resp['success']) {
                        $res = array(
                            'success' => true,
                            'message' => 'The user account has been rejected and the user has been notified.',
                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error occured while updating the user account details.',
                        );
                    }

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error sending email notification. Please try again or contact the system administrator.',
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify the email address or contact the system administrator.',
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onconfirmInitiateSelectionAndAppoitment(Request $req)
    {
        try {

            $email_address = $req->email_address;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $loggedInUserId = $req->loggedInUserId;
            $id = $req->id;


            $record = DB::table('exp_expertsprofile_information')
                ->where('id', $id)
                ->first();

            if ($record) {

                $full_names = aes_decrypt($record->first_name) . ' ' . aes_decrypt($record->other_names);

                $vars = array(
                    '{user_name}' => $full_names,
                    '{email_address}' => $email_address
                );

                $subject = 'Selection and Appointment';

                $template_id = 10;

                $res = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
                // print_r($res);
                if ($res['success']) {
                    $user_data = array(
                        'appworkflow_status_id' => $appworkflow_status_id,
                        'dola' => Carbon::now(),
                        'altered_by' => $loggedInUserId
                    );
                    $where = array('id' => $id);

                    if (recordExists('exp_expertsprofile_information', $where)) {
                        $previous_data = getPreviousRecords('exp_expertsprofile_information', $where);
                        $resp = updateRecord('exp_expertsprofile_information', $previous_data['results'], $where, $user_data, '');
                    }

                    if ($resp['success']) {
                        $res = array(
                            'success' => true,
                            'message' => 'The user account has been appointed and the user has been notified.',
                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'resp' => $resp,
                            'message' => 'Error occured while updating the user account details.',
                        );
                    }

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Error sending email notification. Please try again or contact the system administrator.',
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'No user account associated with this email address exists. Please verify the email address or contact the system administrator.',
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }




    public function onsaveUserData(Request $req)
    {
        try {
            $user_id = $req->id;
            $process_id = 1;
            $account_type_id = $req->account_type_id;
            $email_address = $req->email_address;

            // $telephone_no = $phone_number['internationalNumber'];
            $telephone_n = $req->telephone_no;
            $phone_number = $req->phone_number;
            // $experts_profile_no = '';


            $validator = Validator::make($req->all(), [
                'user_title_id' => 'required|integer',
                'account_type_id' => 'required|integer',
                'country_of_origin_id' => 'required|integer',
                'member_state_id' => 'nullable|integer',
                'institution_type_id' => 'nullable|integer',
                'institution_id' => 'nullable|integer',
                'institution_department_id' => 'nullable|integer',
                'registration_number' => 'nullable|max:50',
                'secretariat_department_id' => 'nullable|integer',
                'identification_type_id' => 'required|integer',
                'identification_number' => 'required',
                'first_name' => 'required|string',
                'surname' => 'nullable|string',
                'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
                'created_by' => 'nullable|max:255',
                'created_on' => now()
            ]);
            $appworkflow_status_id = 1;

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first(),
                ], 422);
            }

            // Check if a user with the given identification number already exists


            // If the user exists, update their information
            if (validateIsNumeric($req->id)) {

                $existingRecord = DB::table('usr_users_information')
                    ->where('id', '=', $req->id)
                    ->first();

                $user_data = [
                    'account_type_id' => $req->account_type_id,
                    'user_title_id' => $req->user_title_id,
                    'country_of_origin_id' => $req->country_of_origin_id,
                    'institution_type_id' => $req->institution_type_id,
                    'email_address' => aes_encrypt($email_address),
                    'surname' => aes_encrypt($req->surname),
                    'first_name' => aes_encrypt($req->first_name),
                    'phone_number' => aes_encrypt($phone_number),
                    'process_id' => $process_id,
                    'identification_number' => $req->identification_number,
                    'institution_id' => $req->institution_id,
                    'altered_by' => $req->email_address,
                    'dola' => now(), // Set the altered timestamp
                ];

                $where = ['id' => $existingRecord->id];
                $table_name = 'usr_users_information';

                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];

                $resp = updateRecord($table_name, $previous_data, $where, $user_data, '');
                if ($resp['success']) {
                    $res = [
                        'success' => true,
                        'message' => 'The account has been updated successfully.',
                    ];
                } else {
                    $res = [
                        'success' => false,
                        'message' => 'Error occurred while updating the user account information.',
                    ];
                }
            } else {
                // If the user does not exist, create a new account
                $generatedPassword = bin2hex(random_bytes(8)); // 8 bytes = 16 characters in hex
                $table_name = 'usr_users_information';

                // Ensure no user with the same email exists
                $existingEmailRecord = DB::table('usr_users_information')
                    ->where('email_address', '=', aes_encrypt($req->email_address))
                    ->first();

                if (!$existingEmailRecord) {
                    $application_code = generateApplicationCode($process_id, $table_name);

                    $full_names = $req->first_name . ' ' . $req->other_names;

                    $user_data = [
                        'account_type_id' => $req->account_type_id,
                        'user_title_id' => $req->user_title_id,
                        'country_of_origin_id' => $req->country_of_origin_id,
                        'institution_type_id' => $req->institution_type_id,
                        'email_address' => aes_encrypt($email_address),
                        'password' => Hash::make($generatedPassword),
                        'surname' => aes_encrypt($req->surname),
                        'first_name' => aes_encrypt($req->first_name),
                        'phone_number' => aes_encrypt($phone_number),
                        'process_id' => $process_id,
                        'is_initiatepassword_change' => 1,
                        'appworkflow_status_id' => $appworkflow_status_id,
                        'identification_number' => $req->identification_number,
                        'institution_id' => $req->institution_id,
                        'application_code' => $application_code,
                        'institution_department_id' => $req->institution_department_id,
                        'secretariat_department_id' => $req->secretariat_department_id,
                        'identification_type_id' => $req->identification_type_id,
                        'created_by' => $req->email_address,
                        'created_on' => now(), // Set the created_on timestamp
                    ];

                    $resp = insertRecord($table_name, $user_data);

                    if ($resp['success']) {
                        // $exp_table = 'exp_expertsprofile_information';
                        $user_information_id = $resp['record_id'];
                        // if ($account_type_id == 1) {
                        //     $experts_profile_no = generateUserRegistrationNo($exp_table);
                        //     $process_id = 2;
                        //     $appworkflow_status_id = 1;
                        //     $application_code = generateApplicationCode($process_id, $exp_table);
                        //     $app_reference_no = generateAppReferenceNo($process_id, $exp_table, $req->email_address);

                        //     $experts_profile = [
                        //         'user_information_id' => $user_information_id,
                        //         'app_reference_no' => $app_reference_no,
                        //         'experts_profile_no' => $experts_profile_no,
                        //         'process_id' => $process_id,
                        //         'appworkflow_status_id' => 1,
                        //         'email_address' => aes_encrypt($email_address),
                        //         'first_name' => aes_encrypt($req->first_name),
                        //         'other_names' => aes_encrypt($req->other_names),
                        //         'user_title_id' => $req->user_title_id,
                        //         'identification_type_id' => $req->identification_type_id,
                        //         'identification_number' => $req->identification_number,
                        //         'country_of_origin_id' => $req->country_of_origin_id,
                        //         'physical_address' => aes_encrypt($req->physical_address),
                        //         'present_telephone_no' => aes_encrypt($phone_number),
                        //         'application_code' => $application_code,
                        //         'created_by' => $req->email_address,
                        //         'created_on' => now(),
                        //     ];
                        //     $exp_resp = insertRecord($exp_table, $experts_profile);
                        //     if ($exp_resp['success']) {
                        //         $res = [
                        //             'success' => true,
                        //             'message' => 'Your expert profile has been created successfully.',
                        //         ];
                        //     }
                        // }
                        initiateInitialProcessSubmission($table_name, $application_code, $process_id, $user_information_id);

                        $template_id = 1;
                        $subject = 'Account Creation Notification';

                        $vars = [
                            '{user_name}' => $full_names,
                            '{email_address}' => $req->email_address,
                            '{user_password}' => $generatedPassword,
                            // '{experts_profile_no}' => $experts_profile_no
                        ];
                        $res = sendMailNotification($full_names, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);
                        if ($res['success']) {
                            $res = [
                                'success' => true,
                                'message' => 'Your account has been created successfully, and the account credentials have been emailed to you.',
                            ];
                        } else {
                            $res = [
                                'success' => true,
                                'message' => 'Your account has been created successfully, but the email notification failed. Try recreating the account or contact the system administrator.',
                            ];
                        }
                    } else {
                        $res = [
                            'success' => false,
                            'message' => 'Error occurred: ' . $resp['message'],
                        ];
                    }
                } else {
                    $res = [
                        'success' => false,
                        'message' => 'There is an existing user account with the same Email Address. Reset password or contact the System Administrator.'
                    ];
                }
            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onGetSingleUserProfileDetails(Request $req)
    {
        try {
            $user_data = array();
            $user_profile_id = $req->user_profile_id;
            $table_name = 'usr_users_information';

            if (validateIsNumeric($user_profile_id)) {
                $record = DB::table($table_name)
                    ->select([
                        'id',
                        'user_title_id',
                        'user_group_id',
                        'identification_type_id',
                        'country_of_origin_id',
                        'institution_id',
                        'institution_department_id',
                        'user_status',
                        'email_address',
                        'first_name',
                        'surname',
                        'phone_number',
                        'workflow_status_id',
                        'account_roles_id',
                        'last_login_time',
                        'is_verified',
                        'account_type_id',
                        'application_code',
                        'account_registration_no',
                        'member_state_id',
                        'identification_number',
                        'secretariat_department_id',
                        'process_id',
                        'appworkflow_status_id',
                        'created_on'
                    ])
                    ->where('id', $user_profile_id)
                    ->first();

                if ($record) {
                    $user_data = array(
                        'id' => $record->id,
                        'user_title_id' => $record->user_title_id,
                        'user_group_id' => $record->user_group_id,
                        'identification_type_id' => $record->identification_type_id,
                        'country_of_origin_id' => $record->country_of_origin_id,
                        'institution_id' => $record->institution_id,
                        'institution_department_id' => $record->institution_department_id,
                        'user_status' => $record->user_status,
                        'email_address' => aes_decrypt($record->email_address),
                        'first_name' => aes_decrypt($record->first_name),
                        'surname' => aes_decrypt($record->surname),
                        'phone_number' => aes_decrypt($record->phone_number),
                        'workflow_status_id' => $record->workflow_status_id,
                        'account_roles_id' => $record->account_roles_id,
                        'last_login_time' => $record->last_login_time,
                        'is_verified' => $record->is_verified,
                        'account_type_id' => $record->account_type_id,
                        'application_code' => $record->application_code,
                        'account_registration_no' => $record->account_registration_no,
                        'member_state_id' => $record->member_state_id,
                        'identification_number' => $record->identification_number,
                        'secretariat_department_id' => $record->secretariat_department_id,
                        'process_id' => $record->process_id,
                        'appworkflow_status_id' => $record->appworkflow_status_id,
                        'created_on' => $record->created_on,
                    );
                }
            }

            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }




    public function onGetUserInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $phone_number = $req->phone_number;
            // $user_group_id = $req->user_group_id;
            $table_name = 'usr_users_information';
            $process_id = 1;
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflow_statuses as t2', 't2.id', 't1.appworkflow_status_id')
                ->select('t1.*', 't2.name as appworkflow_status');
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            // if (validateIsNumeric($user_group_id)) {
            //     $sql->where('user_group_id', $user_group_id);
            // }

            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();

            foreach ($data as $rec) {
                if ($rec->appworkflow_status_id == 2) {
                    $appworkflow_status_id = 6;
                } else {

                    $appworkflow_status_id = $rec->appworkflow_status_id;
                }

                $user_data[] = array(
                    'id' => $rec->id,
                    'user_title_id' => $rec->user_title_id,
                    // 'user_group_id' => $rec->user_group_id,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'identification_type_id' => $rec->identification_type_id,
                    'country_of_origin_id' => $rec->country_of_origin_id,
                    'institution_id' => $rec->institution_id,
                    'institution_department_id' => $rec->institution_department_id,
                    'user_status' => $rec->user_status,
                    'email_address' => aes_decrypt($rec->email_address),
                    'first_name' => aes_decrypt($rec->first_name),
                    'surname' => aes_decrypt($rec->surname),
                    'phone_number' => aes_decrypt($rec->phone_number),
                    'workflow_status_id' => $rec->workflow_status_id,
                    'account_roles_id' => $rec->account_roles_id,
                    'last_login_time' => $rec->last_login_time,
                    'is_verified' => $rec->is_verified,
                    'account_type_id' => $rec->account_type_id,
                    'application_code' => $rec->application_code,
                    'account_registration_no' => $rec->account_registration_no,
                    'member_state_id' => $rec->member_state_id,
                    'identification_number' => $rec->identification_number,
                    'secretariat_department_id' => $rec->secretariat_department_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );


            }
            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onGetApiUserInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = 'usr_api_users';
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->select('t1.*');
            $data = $sql->get();
            foreach ($data as $rec) {

                $user_data[] = array(
                    'id' => $rec->id,
                    'apiuser_category_id' => $rec->apiuser_category_id,
                    'email' => $rec->email,
                    'username' => $rec->username,
                    'last_login_time' => $rec->last_login_time,
                );
            }
            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onGetExternalUserInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = 'usr_external_users';
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->select('t1.*');
            $data = $sql->get();
            foreach ($data as $rec) {

                $user_data[] = array(
                    'id' => $rec->id,
                    'externaluser_category_id' => $rec->externaluser_category_id,
                    'email' => $rec->email,
                    'username' => $rec->username,
                    'phone'=>$rec->phone,
                    'mobile'=>$rec->mobile,
                    'last_login_time' => $rec->last_login_time,
                    'is_active'=>$rec->is_active,
                );
            }
            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onGetTraderInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $table_name = $req->table_name;
            $table_name = 'txn_trader_account';
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('cfg_trader_categories as t2', 't2.id', 't1.trader_category_id')
                ->leftJoin('cfg_traderaccount_types as t3', 't3.id', 't1.traderaccount_type_id')
                ->leftJoin('cfg_regions as t4', 't4.id', 't1.region_id')
                ->leftJoin('cfg_districts as t5', 't5.id', 't1.district_id')
                ->leftJoin('cfg_account_statuses as t6', 't6.id', 't1.status_id')
                ->leftJoin('cfg_countries as t7', 't7.id', 't1.country_id')
                ->select('t1.id as trader_id', 't1.*', 't2.name as trader_categories', 't3.name as traderaccount_types', 't4.name as regions', 't5.name as districts', 't6.name as status', 't7.name as country');
            // if (validateIsNumeric($appworkflow_status_id)) {
            //     $sql->where('appworkflow_status_id', $appworkflow_status_id);
            // }

            // if (validateIsNumeric($user_group_id)) {
            //     $sql->where('user_group_id', $user_group_id);
            // }

            // $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();

            foreach ($data as $rec) {
                // if ($rec->appworkflow_status_id == 2) {
                //     $appworkflow_status_id = 6;
                // } else {

                //     $appworkflow_status_id = $rec->appworkflow_status_id;
                // }

                $user_data[] = array(
                    'id' => $rec->trader_id,
                    'country_id' => $rec->country_id,
                    'traderaccount_type_id' => $rec->traderaccount_type_id,
                    'trader_category_id' => $rec->trader_category_id,
                    'region_id' => $rec->region_id,
                    'district_id' => $rec->district_id,
                    'status_id' => $rec->status_id,

                    'country' => $rec->country,
                    'traderaccount_types' => $rec->traderaccount_types,
                    'trader_categories' => $rec->trader_categories,
                    'regions' => $rec->regions,
                    'districts' => $rec->districts,
                    'status' => $rec->status,

                    'email_address' => aes_decrypt($rec->email_address),
                    'name' => $rec->name,
                    'identification_no' => $rec->identification_no,
                    'mobile_no' => $rec->mobile_no,
                    'code_no' => $rec->code_no,
                    'telephone_no' => $rec->telephone_no,
                    'pacra_reg_no' => $rec->pacra_reg_no,
                    'tpin_no' => $rec->tpin_no,
                    'website' => $rec->website,
                    'fax' => $rec->fax,
                    'postal_address' => $rec->postal_address,
                    'physical_address' => $rec->physical_address,
                    'contact_person_telephone' => $rec->contact_person_telephone,
                    'contact_person_email' => $rec->contact_person_email,
                    'contact_person' => $rec->contact_person,
                    // 'surname' => aes_decrypt($rec->surname),
                    // 'phone_number' => aes_decrypt($rec->phone_number),
                    // 'workflow_status_id' => $rec->workflow_status_id,
                    // 'account_roles_id' => $rec->account_roles_id,
                    // 'last_login_time' => $rec->last_login_time,
                    // 'is_verified' => $rec->is_verified,
                    // 'account_type_id' => $rec->account_type_id,
                    // 'application_code' => $rec->application_code,
                    // 'account_registration_no' => $rec->account_registration_no,
                    // 'member_state_id' => $rec->member_state_id,
                    // 'identification_number' => $rec->identification_number,
                    // 'secretariat_department_id' => $rec->secretariat_department_id,
                    // 'process_id' => $rec->process_id,
                    // 'appworkflow_status_id' => $rec->appworkflow_status_id,
                    // 'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );


            }
            $res = array('success' => true, 'data' => $user_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadUserData(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $check_exempt = DB::table('txn_exemptedpublic_tables')
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
            //,'contextMenu' => returnActionColumn($rec->application_status_id, $actionColumnData)
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadPortalUserData(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);

            $check_exempt = DB::connection('portal')->table('ptl_exemptedpublic_tables')
                ->where(array('table_name' => $table_name))
                ->count();
            $sql = DB::connection('portal')->table($table_name . ' as t1');

            if ($check_exempt > 0 || $table_name == null || $table_name == '') {
                $res = array('success' => false, 'message' => 'Table has been blocked for access');
                return response()->json($res);
            }
            if (!empty($requestData)) {
                $sql->where($requestData);
            }

            $data = $sql->get();

            $res = array('success' => true, 'data' => $data);
            //,'contextMenu' => returnActionColumn($rec->application_status_id, $actionColumnData)
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onDeleteUserData(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();
            //get the records 
            $resp = false;

            $where_state = array('id' => $record_id);

            $records = DB::table($table_name)
                ->where($where_state)
                ->get();

            if (count($records) > 0) {
                //delete functionality
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state, $user_id);
            }
            if ($resp) {
                $res = array('success' => true, 'message' => $title . ' deleted successfully');
            } else {
                $res = array('success' => false, 'message' => $title . ' delete failed, contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }

    public function onsaveTraderData(Request $req)
    {
        // $trader_data = json_decode($req->traderData_sub);
        DB::beginTransaction();

        try {
            // Generate registration number
            $trader_no = generateUserRegistrationNo('txn_trader_account');

            $data = [
                'name' => $req->name,
                'contact_person' => $req->contact_person,
                'contact_person_email' => $req->contact_person_email,
                'country_id' => $req->country_id,
                'region_id' => $req->region_id,
                'district_id' => $req->district_id,
                'physical_address' => $req->physical_address,
                'postal_address' => $req->postal_address,
                'telephone_no' => $req->telephone_no,
                'mobile_no' => $req->mobile_no,
                'email_address' => $req->email_address,
                'status_id' => 1,
                'identification_no' => $trader_no,
            ];

            // Check if the email already exists
            $emailExists = DB::table('txn_trader_account')
                ->where('email_address', $req->email_address)
                ->exists();
              
            if ($emailExists) {
                // return response()->json(['success' => false, 'message' => 'Email already exists.'], 400);
                return $this->onUpdateTraderData($req);
                //  write code here using the refactored function onUpdateTraderData to update the txn_trader_account in the main db and the portal db as well as update the email in usr_users_information in the portal_db
            } else {

                // Insert trader account into the primary database
                $resp = insertRecord('txn_trader_account', $data, 'Create Trader Account');
                if (!$resp['success']) {
                    throw new \Exception('Failed to create trader account in the primary database.');
                }

                $trader_id = $resp['record_id'];

                // Insert trader account into the 'portal' database
                $portalResp = insertPortalRecord('txn_trader_account', $data, 'portal');
                if (!$portalResp['success']) {
                    throw new \Exception('Failed to create trader account in the portal database.');
                }

                $generatedPassword = bin2hex(random_bytes(8));


                $user_data = [
                    'trader_id' => $trader_id,
                    'email_address' => $req->email_address,
                    'name' => $req->name,
                    'password' => aes_encrypt($generatedPassword),
                    'is_verified' => $req->is_verified ?? 0,
                    'telephone_number' => $req->telephone_no,
                    'is_initiatepassword_change' => 1,
                    'country_id' => $req->country_id,
                    'account_type_id' => $req->account_type_id ?? null,
                    'is_initiateprofile_update' => 1,
                    'created_by' => $req->email_address,
                    'created_on' => now(),
                ];

                // Insert user account details into the 'portal' database
                $userResp = insertPortalRecord('usr_users_information', $user_data, 'portal');

                if (!$userResp['success']) {
                    throw new \Exception('Failed to create user information in the portal database.');
                }

                // Send email notification
                $template_id = 1;
                $subject = 'Trader Account Creation Notification';
                $vars = [
                    '{name}' => $req->name,
                    '{email_address}' => $req->email_address,
                    '{password}' => $generatedPassword,
                    '{identification_no}' => $trader_no
                ];

                $decodedEmail = $req->email_address;
                // $mailResp = sendMailNotification($req->name, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                $mailResp = sendMailNotification($decodedEmail, $subject, '', '', '', '', '', $template_id, $vars);

                if (!$mailResp['success']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Account created, but email notification failed. Please contact support.'
                    ], 500);
                }

                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Trader account created successfully. Login credentials have been emailed.'
                ], 200);
            }

        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json(sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
        } catch (\Throwable $throwable) {
            DB::rollBack();
            return response()->json(sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__)), 500);
        }
    }

    public function onUpdateTraderData(Request $req)
    {
        try {
            $record_id = $req->input("id");
            $email_address = $req->email_address;
            $trader_no = '';

            $validator = Validator::make($req->all(), [
                'country_id' => 'nullable|integer',
                'name' => 'nullable|string',
                'created_by' => 'nullable|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first(),
                ], 422);
            }

            if (validateIsNumeric($req->id)) {
                $existingRecord = DB::table('txn_trader_account')->where('id', '=', $req->id)->first();

                $trader_data = [
                    'country_id' => $req->country_id,
                    'traderaccount_type_id' => $req->traderaccount_type_id,
                    'trader_category_id' => $req->trader_category_id,
                    'region_id' => $req->region_id,
                    'district_id' => $req->district_id,
                    'status_id' => $req->status_id,
                    'country' => $req->country,
                    'traderaccount_types' => $req->traderaccount_types,
                    'trader_categories' => $req->trader_categories,
                    'regions' => $req->regions,
                    'districts' => $req->districts,
                    'status' => $req->status,
                    'email_address' => $req->email_address,
                    'name' => $req->name,
                    'identification_no' => $req->identification_no,
                    'mobile_no' => $req->mobile_no,
                    'code_no' => $req->code_no,
                    'telephone_no' => $req->telephone_no,
                    'pacra_reg_no' => $req->pacra_reg_no,
                    'tpin_no' => $req->tpin_no,
                    'website' => $req->website,
                    'fax' => $req->fax,
                    'postal_address' => $req->postal_address,
                    'physical_address' => $req->physical_address,
                    'contact_person_telephone' => $req->contact_person_telephone,
                    'contact_person_email' => $req->contact_person_email,
                    'contact_person' => $req->contact_person,
                    'altered_by' => $req->email_address,
                    'dola' => now(),
                ];

                DB::beginTransaction();

                $where = ['id' => $existingRecord->id];
                $table_name = 'txn_trader_account';

                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];

                $resp = updateRecord($table_name, $previous_data, $where, $trader_data, '');

                if ($resp['success']) {
                    // Update in portal
                    $existingPortalRecord = DB::connection('portal')->table('txn_trader_account')
                        ->where('email_address', '=', $req->email_address)
                        ->first();
                    if ($existingPortalRecord) {
                        $resp = updatePortalRecord($table_name, $previous_data, $where, $trader_data, 'portal');
                    }

                    $existingUserPortalRecord = DB::connection('portal')->table('usr_users_information')
                        ->where('email_address', '=', $req->email_address)
                        ->first();
                    if ($existingUserPortalRecord) {
                        $resp = updatePortalRecord($table_name, $previous_data, $where, $trader_data, 'portal');

                        // Send email notification if needed
                        $template_id = 10;
                        $subject = 'Trader Account Update Notification';
                        $vars = [
                            '{name}' => $req->name,
                            '{email_address}' => $req->email_address,
                            '{identification_no}' => $trader_no,
                        ];

                        $mailResp = sendMailNotification($req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                        if (!$mailResp['success']) {
                            DB::rollBack();
                            return response()->json([
                                'success' => false,
                                'message' => 'Account updated, but email notification failed. Please contact support.',
                            ], 500);
                        }
                    }

                    DB::commit();
                    return response()->json([
                        'success' => true,
                        'message' => 'Trader account updated successfully. Updated login credentials have been emailed.',
                    ], 200);
                }

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }


    public function onLoadUserAccountStatusCounters(Request $req)
    {
        try {
            // account_type_id: account_type_id,member_state_id:member_state_id
            $account_type_id = $req->account_type_id;
            $member_state_id = $req->member_state_id;


            $records = DB::table('usr_users_information as t1')
                ->join('wf_workflow_statuses as t2', 't1.appworkflow_status_id', '=', 't2.id')
                ->select(DB::raw("t1.appworkflow_status_id, t2.name as user_statusname, count(t1.id) as statuses_counter"));
            if (validateIsNumeric($account_type_id)) {
                $account_types = getTableData('sys_account_types', array('id' => $account_type_id));
                $has_memberstate_defination = $account_types->has_memberstate_defination;
                if ($has_memberstate_defination) {
                    $records = $records->where("member_state_id", $member_state_id);
                }
            }

            $records = $records->groupBy('t1.appworkflow_status_id', 't2.name')->get();
            $res = array('success' => true, 'data' => $records);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }

    public function onUserSubscriptionRequest(Request $req)
    {
        try {
            $process_id = 1;
            $email_address = $req->email_address;

            $publications_type_id = $req->publications_type_id;

            $validator = Validator::make($req->all(), [
                // 'publications_types_id' => 'integer',
                //'publications_informations_id' => 'integer',
                'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
                'created_by' => 'nullable|max:255',
                'created_on' => now(), // Manually set the created_on timestamp
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first(),
                ], 422);
            }
            $table_name = 'tra_subscription_registration';
            $where = array('email_address' => $email_address);

            if (recordExists($table_name, $where)) {
                $user_data = array(

                    'altered_by' => $req->input('email_address'),
                    'dola' => now(),
                );
                $previous_data = getPreviousRecords($table_name, $where);
                $previous_data = $previous_data['results'];


                $resp = updateRecord($table_name, $previous_data, $where, $user_data, '');

            } else {
                $application_code = generateApplicationCode($process_id, $table_name);

                $user_data = array(
                    'email_address' => aes_encrypt($req->email_address),
                    // 'publications_types_id' => $req->publication_types,
                    //'publications_informations_id' => $req->publication_information,
                    'application_code' => $application_code,
                    'process_id' => $process_id,
                    'created_by' => $req->input('email_address'),
                    'created_on' => now(),
                );

                $resp = insertRecord($table_name, $user_data);


            }

            if ($resp['success']) {

                $subscription_registration_id = $resp['record_id'];
                foreach ($publications_type_id as $record) {
                    $tabl_name = 'tra_subscriptionsregistration_types';
                    $data = array('subscription_registration_id' => $subscription_registration_id, 'publications_type_id' => $record);
                    if (!recordExists($tabl_name, $data)) {
                        $data['created_on'] = now();
                        $data['created_by'] = $req->input('email_address');
                        insertRecord($tabl_name, $data);

                    }

                }
                //insertion of the publication items

                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id, $subscription_registration_id);

                $template_id = 8;
                $subject = 'Publication Information on uRIMS Guidelines for Regulatory Authorities';
                $vars = array(
                    '{email_address}' => $req->email_address,
                    // '{publication_types_id}' => $req->publication_types_id,
                    '{publication_information}' => $req->publication_information,
                );
                $res = sendMailNotification($req->publication_types, $req->email_address, $subject, '', '', '', '', '', $template_id, $vars);

                if ($res) {
                    $res = array(
                        'success' => true,
                        'message' => 'Subscription success'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Your account has been created successfully, unfortunately the email notification failed. Please contact the system administrator.',
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Error occurred: ' . $resp['message'],
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

}
