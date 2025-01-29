<?php

namespace Modules\AuditTrailManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuditTrailManagementController extends Controller
{
    public function onsaveAuditTrailData(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;
  
            $data = $req->all();
            $resetcolumns = $req->resetcolumns;
              
            $table_name = $req->table_name;
            $record_id = $req->id;
            unset($data['user_id']);
            unset($data['user_name']);
            unset($data['table_name']);
            unset($data['resetcolumns']);
            if($resetcolumns != ''){
                      $restcolumn_array = explode(',', $resetcolumns);
                      $data = unsetArrayData($data, $restcolumn_array);
              }
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
  
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
  
                    $previous_data = getPreviousRecords($table_name, $where);
  
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                unset($data['id']);
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }
  
            if ($resp['success']) {
  
                $res = array(
                    'success' => true,
                    'message' => 'Saved Successfully'
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
    
    public function getAuditTrailInfo(Request $req){
        try{
            $record_id = $req->record_id;
            $table_name = 'aud_audit_trail';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }
            
            $products_data = $sql->get();
        
             $res = array('success' => true, 'data' => $products_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);

    }

    public function getAuditUserLogoutInfo(Request $req)
    {
        try {

            $record_id = $req->record_id;
            $table_name = 'aud_userloginout_logs';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }

            $userlogout_data = $sql->get();


            $res = array('success' => true, 'data' => $userlogout_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);

    }


    public function getAuditFailedLoginsInfo(Request $req)
    {
        try {

            $record_id = $req->record_id;
            $table_name = 'aud_userfailedlogins_logs';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }
            $userlogout_data = $sql->get();


            $res = array('success' => true, 'data' => $userlogout_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);

    }

    public function getUserPasswordRequestInfo(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = 'aud_userpwdresetrequest_logs';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }
            $userlogout_data = $sql->get();
            $res = array('success' => true, 'data' => $userlogout_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function getUserPasswordChangeInfo(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = 'aud_userpwdchangerequest_logs';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }
            $userlogout_data = $sql->get();
            $res = array('success' => true, 'data' => $userlogout_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function getUserMaliciousLoginsInfo(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = 'aud_usermaliciouslogins_logs';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }
            $userlogout_data = $sql->get();
            $res = array('success' => true, 'data' => $userlogout_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function getUserAccessLogsInfo(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = 'aud_access_logs';

            $sql = DB::table($table_name . ' as t1');

            if (validateIsNumeric($record_id)) {
                $sql->where('record_id', $record_id);
            }
            $userlogout_data = $sql->get();
            $res = array('success' => true, 'data' => $userlogout_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onGetAuditTrailPrevCurrentData(Request $req)
    {
        try {
            $audit_trail_id = $req->audit_trail_id;
            // $audit_trail_id = 6566;

            $prev_tabledata = [];
            
           
            $combined_array = array();
            //get the records 
            $record = DB::table('aud_audit_trail')->where('id', $audit_trail_id)->first();

            if ($record) {
                $prev_tabledata = $this->unSerialiseAudutTableDtaa($record->prev_tabledata, 'Previous Data');

                $current_tabledata = $this->unSerialiseAudutTableDtaa($record->current_tabledata,'Current Data');
                if(is_array($prev_tabledata)){
                    if(count($prev_tabledata) >0){
                        $prev_tabledata = $prev_tabledata[0];
                        if(isset($prev_tabledata['data'])){
                            $prev_tabledata = $prev_tabledata['data'];
                           
                        }
                        $prev_tabledata['data_title'] = 'Previous Data';
                    }                                  
                }            
                // $combined_array = array_merge($current_tabledata,$prev_tabledata);             
            }
            $res = array(
                'success' => true,
                // 'data'=>$combined_array
                'prev_tabledata' => $prev_tabledata,
                'current_tabledata' => $current_tabledata
         
            );

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }
    
    function unSerialiseAudutTableDtaa($data, $data_title)
    {
        if (!empty($data)) {
            $data = unserialize($data);
            $data['data_title'] = $data_title;
        }else{
            $data = array();
        }
        return $data;
    }


    public function onDeleteAuditTrailInfo(Request $req)
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
                $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $user_id);
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
}