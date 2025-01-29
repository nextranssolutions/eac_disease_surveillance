<?php

namespace Modules\NotificationsManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotificationsManagementController extends Controller
{
    public function onsaveNotificationProcesses(Request $req)
    {
        try {
            $process_id = 22;
            $application_code = $req->application_code;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'exp_processes_notifications';
    
            $data = array(
                'email_from' => $req->email_from,
                'subject' => $req->subject,
                'has_email_template' => $req->has_email_template,
                'email_body' => $req->email_body,
                'expertsprofile_information_id' => $req->expertsprofile_information_id
            );
    
            if (!validateIsNumeric($application_code)) {
                $application_code = generateApplicationCode($process_id, $table_name);
                $data['sent_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['sent_on'] = Carbon::now();
    
                $resp = insertRecord($table_name, $data);
            } else {
                $where = array('application_code' => $application_code);
                $previous_data = getPreviousRecords($table_name, $where);
    
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
    
                    $application_code = $previous_data['results'][0]['application_code'];
    
                    if (!validateIsNumeric($application_code)) {
                        $application_code = generateApplicationCode($process_id, $table_name);
                    }
                    $previous_data = $previous_data['results'];
                   
                    $data['application_code'] = $application_code;
                    $resp = updateRecord($table_name, $previous_data, $where, $data, $user_name);
                } else {
                    $resp = array(
                        'success' => false,
                        'message' => 'Record does not exist'
                    );
                }
            }
    
            if ($resp['success']) {
                $resource_id = $resp['record_id'];
                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id);
    
                $res = array(
                    'success' => true,
                    'application_code' => $application_code,
                   
                    'resource_id' => $resource_id,
                    'message' => 'Record Saved Successfully'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $resp['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    public function onLoadNotificationProcesses(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'exp_processes_notifications';
            $process_id = 22;
            $notification_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                
                ->leftJoin('wf_processes as t2', 't1.process_id', 't2.id')
                ->leftJoin('exp_expertsprofile_information as t3', 't3.id', 't1.expertsprofile_information_id')
                ->leftJoin('ntf_email_templates as t4', 't4.id', 't1.email_template_id')
            ->select('t2.name as process_name', 't1.*', 't3.email_address as email_address', 't4.name as template_name' );
            
           
            $data = $sql->get();
            foreach ($data as $rec) {
                $notification_data[] = array(
                    'id' => $rec->id,
                    'process_id' => $rec->process_id,
                    'process_name' => $rec->process_name,
                    'expertsprofile_information_id' => $rec->expertsprofile_information_id,
                    'email_address' => $rec->email_address,
                    'template_name' => $rec->template_name,
                    'email_from' => $rec->email_from,
                    'subject' => $rec->subject,
                    'has_email_template' => $rec->has_email_template,
                    'email_template_id' => $rec->email_template_id,
                    'email_body' => $rec->email_body,
                    'sent_on' => $rec->sent_on
                    
                );
            }
            $res = ['success' => true, 'data' => $notification_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    
}
