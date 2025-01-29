<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 8/2/2017
 * Time: 7:23 PM
 */

namespace App\Helpers;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Carbon\Carbon;

class DbHelper
{

    static function clearEmptyValues($array_data){
        $filteredData = array_filter($array_data, function($value) {
            return $value !== null && $value !== '';
        });
       return $filteredData;

    }
    public static function insertRecordNoTransaction($table_name, $table_data, $user_id, $con = 'mysql')
    {
        $table_data = self::clearEmptyValues($table_data);
        $record_id = DB::connection($con)->table($table_name)->insertGetId($table_data);

        $data = serialize($table_data);
        $audit_detail = array(
            'table_name' => $table_name,
            'table_action' => 'insert',
            'record_id' => $record_id,
            'current_tabledata' => $data,
            'ip_address' => self::getIPAddress(),
            'created_by' => $user_id,
            'created_at' => Carbon::now()
        );
      DB::table('aud_audit_trail')->insert($audit_detail);
        return $record_id;
    }
    public static function updateRecordNoTransaction($con, $table_name, $previous_data, $where_data, $current_data, $user_id)
    {
        try {
            $current_data = self::clearEmptyValues($current_data);
            DB::connection($con)->table($table_name)
                ->where($where_data)
                ->update($current_data);
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $data_current = serialize($current_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'update',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'current_tabledata' => $data_current,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => Carbon::now()
            );
            DB::table('aud_audit_trail')->insert($audit_detail);
            $res = array(
                'success' => true,
                'record_id' => $record_id
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    public static function deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con)
    {
        $affectedRows = DB::connection($con)->table($table_name)->where($where_data)->delete();
        if ($affectedRows) {
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'delete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => date('Y-m-d H:i:s')
            );
            DB::table('aud_audit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    public static function deletePortalRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con)
    {
        $affectedRows = DB::connection($con)->table($table_name)->where($where_data)->delete();
        if ($affectedRows) {
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'delete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => date('Y-m-d H:i:s')
            );
            DB::table('aud_audit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    
    public static function softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        $deletion_update = array(
            'is_enabled' => 0
        );
        $affectedRows = DB::table($table_name)->where($where_data)->update($deletion_update);
        if ($affectedRows > 0) {
            $current_data = $previous_data;
            $current_data[0]['is_enabled'] = 0;
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $data_current = serialize($current_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'softdelete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'current_tabledata' => $data_current,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => Carbon::now()
            );
            DB::table('aud_audit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }
    public static function undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        $deletion_update = array(
            'is_enabled' => 1
        );
        $affectedRows = DB::table($table_name)->where($where_data)->update($deletion_update);
        if ($affectedRows > 0) {
            $current_data = $previous_data;
            $current_data[0]['is_enabled'] = 1;
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $data_current = serialize($current_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'undosoftdelete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'current_tabledata' => $data_current,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => Carbon::now()
            );
            DB::table('aud_audit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    static function insertRecord($table_name, $table_data, $user_id, $con)
    {
        $table_data = self::clearEmptyValues($table_data);
        $res = array();
        try {

            DB::transaction(function () use ($con, $table_name, $table_data, $user_id, &$res) {

                $res = array(
                    'success' => true,
                    'record_id' => self::insertRecordNoTransaction($table_name, $table_data, $user_id, $con),
                    'message' => 'Data Saved Successfully!!'
                );
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function insertRecordNoAudit($table_name, $table_data)
    {
        $table_data = self::clearEmptyValues($table_data);
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $table_data, &$res) {
                DB::table($table_name)->insert($table_data);
                $res = array(
                    'success' => true,
                    'message' => 'Data Saved Successfully!!'
                );
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function updateRecord($table_name, $previous_data, $where_data, $current_data, $user_id, $con)
    {
        $current_data = self::clearEmptyValues($current_data);
        $res = array();
        try {

            DB::transaction(function () use ($con, $table_name, $previous_data, $where_data, $current_data, $user_id, &$res) {
                $update = self::updateRecordNoTransaction($con, $table_name, $previous_data, $where_data, $current_data, $user_id);
                if ($update['success'] == true) {
                    $res = array(
                        'success' => true,
                        'record_id' => $update['record_id'],
                        'message' => 'Data updated Successfully!!'
                    );
                } else {
                    $res = $update;
                    
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function deleteRecord($table_name, $previous_data, $where_data, $user_id, $con)
    {
        $res = array();
        try {
            DB::transaction(function () use ($con, $table_name, $previous_data, $where_data, $user_id, &$res) {
                if (self::deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con)) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function softDeleteRecord($table_name, $previous_data, $where_data, $user_id)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $previous_data, $where_data, $user_id, &$res) {
                if (self::softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function undoSoftDeletes($table_name, $previous_data, $where_data, $user_id)
    {
        $res = array();

        try {
            DB::transaction(function () use ($table_name, $previous_data, $where_data, $user_id, &$res) {
                if (self::undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id)) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function deleteRecordNoAudit($table_name, $where_data)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $where_data, &$res) {
                $affectedRows = DB::table($table_name)->where($where_data)->delete();
                if ($affectedRows) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function recordExists($table_name, $where, $con)
    {
        $recordExist = DB::connection($con)->table($table_name)->where($where)->get();
        if ($recordExist && count($recordExist) > 0) {
            return true;
        }
        return false;
    }

    static function getPreviousRecords($table_name, $where, $con)
    {
        try {
            $prev_records = DB::connection($con)->table($table_name)->where($where)->get();
            if ($prev_records && count($prev_records) > 0) {
                $prev_records = self::convertStdClassObjToArray($prev_records);
            }
            $res = array(
                'success' => true,
                'results' => $prev_records,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    static function auditTrail($table_name, $table_action, $prev_tabledata, $table_data, $user_id)
    {
        $ip_address = self::getIPAddress();
        switch ($table_action) {
            case "insert":
                //get serialised data $row_array = $sql_query->result_array();
                $data = $table_data;
                $audit_detail = array(
                    'table_name' => $table_name,
                    'table_action' => $table_action,
                    'current_tabledata' => $data,
                    'ip_address' => $ip_address,
                    'created_by' => $user_id,
                    'created_at' => date('Y-m-d H:i:s')
                );
                DB::table('aud_audit_trail')->insert($audit_detail);
                $res = true;
                break;
            case "update":
                //get serialised data $row_array = $sql_query->result_array();
                $data_previous = serialize($prev_tabledata);
                $data_current = serialize($table_data);
                $audit_detail = array(
                    'table_name' => $table_name,
                    'table_action' => 'update',
                    'prev_tabledata' => $data_previous,
                    'current_tabledata' => $data_current,
                    'ip_address' => $ip_address,
                    'created_by' => $user_id,
                    'created_at' => date('Y-m-d H:i:s')
                );
                DB::table('aud_audit_trail')->insert($audit_detail);
                $res = true;
                break;
            case "delete":
                //get serialised data $row_array = $sql_query->result_array();
                $data_previous = serialize($prev_tabledata);
                $audit_detail = array(
                    'table_name' => $table_name,
                    'table_action' => 'delete',
                    'prev_tabledata' => $data_previous,
                    'ip_address' => $ip_address,
                    'created_by' => $user_id,
                    'created_at' => date('Y-m-d H:i:s')
                );
                DB::table('aud_audit_trail')->insert($audit_detail);
                $res = true;
                break;
            default:
                $res = false;
        }
        return $res;
    }

    static function getRecordValFromWhere($table_name, $where, $col)
    {
        try {
            $record = DB::table($table_name)
                ->select($col)
                ->where($where)->get();
            return self::convertStdClassObjToArray($record);
        } catch (QueryException $exception) {
            echo $exception->getMessage();
            return false;
        }
    }

    //without auditing
    static function insertReturnID($table_name, $table_data)
    {
        $table_data = self::clearEmptyValues($table_data);
        $insert_id = '';
        DB::transaction(function () use ($table_name, $table_data, &$insert_id) {
            try {
                $insert_id = DB::table($table_name)->insertGetId($table_data);
            } catch (QueryException $exception) {
                echo $exception->getMessage();
                $insert_id = '';
            }
        }, 5);
        return $insert_id;
    }

    static function convertStdClassObjToArray($stdObj)
    {
        return json_decode(json_encode($stdObj), true);
    }

    static function convertAssArrayToSimpleArray($assArray, $targetField)
    {
        $simpleArray = array();
        foreach ($assArray as $key => $array) {
            $simpleArray[] = $array[$targetField];
        }
        return $simpleArray;
    }

    static function getIPAddress()
    {

        if (isset($_SERVER)) {
            if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
                $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
                if (strpos($ip, ",")) {
                    $exp_ip = explode(",", $ip);
                    $ip = $exp_ip[0];
                }
            } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
                $ip = $_SERVER["HTTP_CLIENT_IP"];
            } else {
                $ip = $_SERVER["REMOTE_ADDR"];
            }
        } else {
            if (getenv('HTTP_X_FORWARDED_FOR')) {
                $ip = getenv('HTTP_X_FORWARDED_FOR');
                if (strpos($ip, ",")) {
                    $exp_ip = explode(",", $ip);
                    $ip = $exp_ip[0];
                }
            } else if (getenv('HTTP_CLIENT_IP')) {
                $ip = getenv('HTTP_CLIENT_IP');
            } else {
                $ip = getenv('REMOTE_ADDR');
            }
        }
        return $ip;
    }

    
    static function convertArrayToString($array){
        $string = '';
            if(is_array($array)){
                $string='';
                foreach($array as $row){
                    $string = $row .','.$string;
                }
            }
            return $string;
    }
    
    
   
    static function getSingleRecord($table, $where,$con)
    {
        $record = DB::connection($con)->table($table)->where($where)->first();
        return $record;
    }

    static function getSingleRecordColValue($table, $where, $col, $con)
    {
        $val = DB::connection($con)->table($table)->where($where)->value($col);
        return $val;
    }

    static function getTableData($table_name, $where,$col)
    {
        $qry = DB::connection($col)->table($table_name)
            ->where($where);
        $results = $qry->first();
        return $results;
    }
	// handler
	 static function sys_error_handler($error, $level, $me, $class_array, $user_id)
    {
        //defaults
            $function = "failed to fetch";
            //class
            if(isset($class_array[5])){
              $class = $class_array[5];
            }else{
              $class = "Failed to fetch";
            }
            //specifics
            if(isset($me[0]['function'])){
              $function = $me[0]['function'];
            }
            if(isset($me[0]['class'])){
              $class = $me[0]['class'];
            }
            $origin = "function-->".$function." class-->".$class;
        //log error
        DB::table('system_error_logs')->insert(['error'=>$error, 'error_level_id'=>$level, 'originated_from_user_id'=>$user_id, 'error_origin'=>$origin]);

        $res = array(
                'success' => false,
                'message' => "An Error occured please contact system admin",
                'error'=>$error
            );
        return $res;
    }

    
    public static function getParameterItem($table_name, $record_id, $con)
    {
        $record_name = '';
        $rec = DB::connection($con)->table($table_name)->where(array('id' => $record_id))->value('name');
        if ($rec) {
            $record_name = $rec;
        }
        return $record_name;

    }

    static function unsetPrimaryIDsInArray($array)
    {
        foreach ($array as $key => $item) {
            unset($item['id']);
            $array[$key] = $item;
        }
        return $array;
    }

    static function createInitialRegistrationRecord($reg_table, $application_table, $reg_params, $application_id, $reg_column)
    {
        $reg_id = DB::table($reg_table)
            ->insertGetId($reg_params);
        DB::table($application_table)
            ->where('id', $application_id)
            ->update(array($reg_column => $reg_id));
        return $reg_id;
    }

    static function getExchangeRate($currency_id)
    {
        $exchange_rate = DB::table('par_exchange_rates')
            ->where('currency_id', $currency_id)
            ->value('exchange_rate');
        return $exchange_rate;
    }

    

    static function getParameterItems($table_name, $filter, $con)
    {
        $record_name = '';
        $rec = DB::connection($con)
            ->table($table_name);

        if ($filter != '') {
            $rec = $rec->where($filter);
        }
        $rec = $rec->get();

        return convertStdClassObjToArray($rec);
    }

    static function updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id)
    {
        self::updateApplicationRegulationDetails($app_details, $document_types, $decision_id);
        self::updateApplicationConditionDetails($app_details, $document_types, $decision_id);
    }
   public static function getAssignedProcessStages($user_group_id)
    {
        //get process stages
        $qry1 = DB::table('wf_workflow_definition as t1')
            ->join('wf_workflow_stages as t2', 't1.id', '=', 't2.workflow_id')
            ->select('t2.id as workflow_stage_id');
        
        $possible_stages = $qry1->get();
       
        $possible_stages = convertStdClassObjToArray($possible_stages);
       
        $possible_stages = self::convertAssArrayToSimpleArray($possible_stages, 'workflow_stage_id');
        
        $qry2 = DB::table('sys_user_workflowstagepermissions')
            ->select('workflow_stage_id')
            ->whereNotIn('user_access_levels_id', [3])
            ->where(array('user_group_id'=>$user_group_id));
        $all_assigned_stages = $qry2->get();

        
        
        $all_assigned_stages = convertStdClassObjToArray($all_assigned_stages);
        $all_assigned_stages = self::convertAssArrayToSimpleArray($all_assigned_stages, 'workflow_stage_id');
       
        return array_intersect($possible_stages, $all_assigned_stages);
    }
  
 
}