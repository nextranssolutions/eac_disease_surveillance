<?php

namespace Modules\DashboardManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardManagementController extends Controller
{

    public function funcFetchPublicDetailsCounter()
    {
        try {
            //get country for 

            $res = array(
                'success' => true,
                'message' => 'Fetched Counts Successfully'
            );

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onLoadWorkflowData(Request $req)
    {

        try {
            $requestData = $req->all();
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);

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
    public function onLoadUserCompletedTasksDetails(request $req)
    {
        try {
            //filters 
            $process_id = $req->process_id;
            $user_information_id = $req->user_information_id;
            $process_id = $req->process_id;
            $current_stage_id = $req->current_stage_id;

            $where_submission = array(
                't1.process_id' => $process_id,
                't1.current_stage_id' => $current_stage_id,
                'isdone' => 1,
                'released_by' => $user_information_id
            );


            $records = DB::table('tra_applicationprocess_submissions as t1')
                ->join('wf_workflow_stages as t2', 't1.current_stage_id', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.previous_stage_id', 't3.id')
                ->leftJoin('wf_workflow_statuses as t4', 't1.appworkflow_status_id', 't4.id')
                ->join('wf_processes as t5', 't1.process_id', 't5.id')
                ->leftJoin('wf_workflowstatuses_actions as t6', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't6.workflow_status_id');
                    $join->on('t1.process_id', '=', 't6.process_id');
                    $join->on('t6.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t7', 't6.statuses_action_id', 't7.id')
                ->select(DB::raw("t1.*, EXTRACT(DAY FROM AGE(date_released, date_received)) AS time_span,t7.name as action_name, t7.iconCls, t7.action, t2.name as current_stage, t3.name as previous_stage, t4.name as application_status, t5.name as process_name"));
                
                //previous_user
            $records->whereNotIn('t1.process_id', [2]);
            $records = $records->where($where_submission)->get();
            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    
    public function onGetAdminFinalisedTasksAsignmentsData(request $req)
    {
        try {
            //filters 
            $records = array();

            $user_information_id = $req->user_information_id;

            $process_id = $req->process_id;
            $is_completed = $req->is_completed;
            $dashboard_type_id = $req->dashboard_type_id;

            $where_submission = array('isdone' => 1, 'released_by' => $user_information_id);

            //wf_workflowstatuses_interfaces
            $records = DB::table('tra_applicationprocess_submissions as t1')
                ->join('wf_workflow_stages as t2', 't1.current_stage_id', 't2.id')
                ->leftJoin('wf_workflow_statuses as t4', 't1.appworkflow_status_id', 't4.id')
                ->join('wf_processes as t5', 't1.process_id', 't5.id')
                ->leftJoin('wf_workflowstatuses_interfaces as t6', 't1.appworkflow_status_id', 't6.workflow_status_id')
                ->leftJoin('wf_system_interfaces as t7', 't6.system_interface_id', 't7.id')
                ->select(DB::raw("t4.id,t1.process_id,t1.current_stage_id, t5.name as process_name,t7.routerlink, t4.name as workflow_status, t2.name as workflow_stage,count(t1.application_code) as number_of_assignment"));

            if (validateIsNumeric($process_id)) {
                $where_submission['t1.process_id'] = $process_id;
            }

            $records->whereNotIn('t1.process_id', [2]);
            $records = $records->groupBy('t1.process_id', 't1.current_stage_id', 't1.process_id', 't4.id', 't5.name', 't7.routerlink', 't4.name', 't2.name')->where($where_submission)->get();

            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onGetAdminactiveTasksAsignmentsData(request $req)
    {
        try {
            //filters 
            $records = array();

            $user_information_id = $req->user_information_id;

            $process_id = $req->process_id;
            $is_completed = $req->is_completed;
            $dashboard_type_id = $req->dashboard_type_id;
            if (validateIsNumeric($is_completed)) {
                $where_submission = array('isdone' => 1);
            } else {
                $where_submission = array('isdone' => 0);
            }
            //get the user group
            $user_record = DB::table('usr_users_information as t1')
                ->join('usr_users_groups as t2', 't1.user_group_id', 't2.id')
                ->select('t1.*', 't2.is_super_admin')
                ->where('t1.id', $user_information_id)
                ->first();

            if ($user_record) {
                $is_super_admin = $user_record->is_super_admin;
                $user_group_id = $user_record->user_group_id;


                //wf_workflowstatuses_interfaces
                $records = DB::table('tra_applicationprocess_submissions as t1')
                    ->join('wf_workflow_stages as t2', 't1.current_stage_id', 't2.id')
                    ->leftJoin('wf_workflow_statuses as t4', 't1.appworkflow_status_id', 't4.id')
                    ->join('wf_processes as t5', 't1.process_id', 't5.id')
                    ->leftJoin('wf_workflowstatuses_interfaces as t6', 't1.appworkflow_status_id', 't6.workflow_status_id')
                    ->leftJoin('wf_system_interfaces as t7', 't6.system_interface_id', 't7.id')
                    ->select(DB::raw("t4.id,t1.process_id, t5.name as process_name,t7.routerlink, t4.name as workflow_status, t2.name as workflow_stage,count(t1.application_code) as number_of_assignment"));

                if (validateIsNumeric($process_id)) {
                    $where_submission['t1.process_id'] = $process_id;
                }
                if (!$is_super_admin) {
                    $assigned_workflowstages = getAssignedProcessStages($user_group_id);
                    //check for user rights
                    $records->whereIn('t1.current_stage_id', $assigned_workflowstages);
                }

                $records->whereNotIn('t1.process_id', [2]);
                $records = $records->groupBy('t1.process_id', 't4.id', 't5.name', 't7.routerlink', 't4.name', 't2.name')->where($where_submission)->get();


            }

            $res = array('success' => true, 'data' => $records);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    //


}
