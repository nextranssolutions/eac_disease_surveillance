<?php

namespace Modules\InformationSharing\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InformationSharingController extends Controller
{

    public function onLoadInformationSharingConfig(Request $req)
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
            $sql->orderBy('t1.name', 'asc'); 

            $data = $sql->get();

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onSaveExpertsPublicationManagement(Request $req)
    {
        try {
            $process_id = 13;
            $appworkflow_status_id = 1;

            $application_code = $req->application_code;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'tra_publication_management';

            $data = array(
                'title' => $req->title,
                'abstract' => $req->abstract,
                'keywords' => $req->keywords,
                'journal_conference' => $req->journal_conference,
                'doi' => $req->doi,
                'publication_date' => $req->publication_date,
                'publication_type' => $req->publication_type,
                'peer_reviewed' => $req->peer_reviewed,
                'publication_link' => $req->publication_link,
                'repository_info' => $req->repository_info,
                'research_area' => $req->research_area,
                'is_expert_publication' => $req->is_expert_publication,
                'authors' => $req->authors,
            );

            if (!validateIsNumeric($application_code)) {
                $application_code = generateApplicationCode($process_id, $table_name);
                $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                $data['app_reference_no'] = $app_reference_no;
                $data['created_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['appworkflow_status_id'] = $appworkflow_status_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_name);
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
                    $app_reference_no = $previous_data[0]['app_reference_no'];
                    if ($app_reference_no == '') {
                        $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                        $data['app_reference_no'] = $app_reference_no;

                    }
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
                $publication_management_id = $resp['record_id'];
                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id);

                $res = array(
                    'success' => true,
                    'application_code' => $application_code,
                    'app_reference_no' => $app_reference_no,
                    'publication_management_id' => $publication_management_id,
                    'message' => 'Publication Information Saved Successfully'
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
    public function onLoadExpertsPublicationManagement(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_publication_management';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $user_profile_id = $req->loggedInUserId;
            $eoi_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflowstatuses_actions as t2', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't2.workflow_status_id');
                    $join->on('t1.process_id', '=', 't2.process_id');
                    $join->on('t2.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t3', 't2.statuses_action_id', 't3.id')
                ->leftJoin('wf_workflow_statuses as t4', 't1.appworkflow_status_id', 't4.id')
                ->select('t1.id as publication_management_id', 't4.name as appworkflow_status', 't1.*', 't3.name as action_name', 't3.iconCls', 't3.action');

            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

          
            if (validateIsNumeric($user_profile_id)) {
                $sql->where("user_profile_id", $user_profile_id);
            }


            $process_id = 13;
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
            foreach ($data as $rec) {
                $eoi_data[] = array(
                    'id' => $rec->publication_management_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'application_code' => $rec->application_code,
                    'title' => $rec->title,
                    'abstract' => $rec->abstract,
                    'keywords' => $rec->keywords,
                    'journal_conference' => $rec->journal_conference,
                    'doi' => $rec->doi,
                    'publication_date' => $rec->publication_date,
                    'peer_reviewed' => $rec->peer_reviewed,
                    'publication_link' => $rec->publication_link,
                    'repository_info' => $rec->repository_info,
                    'research_area' => $rec->research_area,
                    'is_expert_publication' => $rec->is_expert_publication,
                    'app_reference_no' => $rec->app_reference_no,
                    'action_name' => $rec->action_name,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'action' => $rec->action,
                    'iconCls' => $rec->iconCls,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );
            }
            $eoi_data=encrypt_data($eoi_data);
            $res = ['success' => true, 'data' => $eoi_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onSaveResourceManagement(Request $req)
    {
        try {
            $process_id = 14;
            $appworkflow_status_id = 1;
    
            $application_code = $req->application_code;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'tra_resources_managementrepository';
    
            $data = array(
                'title' => $req->title,
                'description' => $req->description,
                'resource_type' => $req->resource_type,
                'resource_category' => $req->resource_category,
                'file_path' => $req->file_path,
            );
    
            if (!validateIsNumeric($application_code)) {
                $application_code = generateApplicationCode($process_id, $table_name);
                $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                $data['app_reference_no'] = $app_reference_no;
                $data['created_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['appworkflow_status_id'] = $appworkflow_status_id;
                $data['created_on'] = Carbon::now();
    
                $resp = insertRecord($table_name, $data, $user_name);
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
                    $app_reference_no = $previous_data[0]['app_reference_no'];
                    if ($app_reference_no == '') {
                        $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                        $data['app_reference_no'] = $app_reference_no;
                    }
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
                    'app_reference_no' => $app_reference_no,
                    'resource_id' => $resource_id,
                    'message' => 'Resource Saved Successfully'
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
    
    public function onLoadExpertsResourceManagement(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_resources_managementrepository';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $eoi_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflowstatuses_actions as t2', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't2.workflow_status_id');
                    $join->on('t1.process_id', '=', 't2.process_id');
                    $join->on('t2.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t3', 't2.statuses_action_id', 't3.id')
                ->leftJoin('wf_workflow_statuses as t4', 't1.appworkflow_status_id', 't4.id')
                ->select('t1.id as resource_id', 't4.name as appworkflow_status', 't1.*', 't3.name as action_name', 't3.iconCls', 't3.action');

            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            $process_id = 14;
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
            foreach ($data as $rec) {
                $eoi_data[] = array(
                    'id' => $rec->resource_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'application_code' => $rec->application_code,
                    'title' => $rec->title,
                    'description' => $rec->description,
                    'resource_type' => $rec->resource_type,
                    'resource_category' => $rec->resource_category,
                    'file_path' => $rec->file_path,
                    'app_reference_no' => $rec->app_reference_no,
                    'action_name' => $rec->action_name,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'action' => $rec->action,
                    'iconCls' => $rec->iconCls,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );
            }
            $eoi_data=encrypt_data($eoi_data);
            $res = ['success' => true, 'data' => $eoi_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    

    public function onFuncSaveKnowledgeCenterData(Request $req)
    {
        try {
            $process_id = 15;
            $appworkflow_status_id = 1;

            $application_code = $req->application_code;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'tra_knowledgecenter_management';

            $data = array(
                'title' => $req->title,
                'description' => $req->description,
                'knowledge_link' => $req->knowledge_link,
                'category' => $req->category,
            );

            if (!validateIsNumeric($application_code)) {
                $application_code = generateApplicationCode($process_id, $table_name);
                $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                $data['app_reference_no'] = $app_reference_no;
                $data['created_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['appworkflow_status_id'] = $appworkflow_status_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_name);
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
                    $app_reference_no = $previous_data[0]['app_reference_no'];
                    if ($app_reference_no == '') {
                        $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                        $data['app_reference_no'] = $app_reference_no;

                    }
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
                $knowledgecenter_id = $resp['record_id'];
                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id);

                $res = array(
                    'success' => true,
                    'application_code' => $application_code,
                    'app_reference_no' => $app_reference_no,
                    'knowledgecenter_id' => $knowledgecenter_id,
                    'message' => 'Resource Saved Successfully'
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
    public function onLoadKnowledgeCenterManagementData(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_knowledgecenter_management';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $eoi_data = array();
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflowstatuses_actions as t2', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't2.workflow_status_id');
                    $join->on('t1.process_id', '=', 't2.process_id');
                    $join->on('t2.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t3', 't2.statuses_action_id', 't3.id')
                ->leftJoin('wf_workflow_statuses as t4', 't1.appworkflow_status_id', 't4.id')
                ->select('t1.id as knowledgecenter_id', 't4.name as appworkflow_status', 't1.*', 't3.name as action_name', 't3.iconCls', 't3.action');

            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }

            $process_id = 15;
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
            foreach ($data as $rec) {
                $eoi_data[] = array(
                    'id' => $rec->knowledgecenter_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'application_code' => $rec->application_code,
                    'title' => $rec->title,
                    'description' => $rec->description,
                    'knowledge_link' => $rec->knowledge_link,
                    'category' => $rec->category,

                    'app_reference_no' => $rec->app_reference_no,
                    'action_name' => $rec->action_name,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'action' => $rec->action,
                    'iconCls' => $rec->iconCls,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                );
            }
            $eoi_data=encrypt_data($eoi_data);
            $res = ['success' => true, 'data' => $eoi_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onDeleteInfoSharingData(Request $request)
    {
        try {
            $record_id = $request->input('id');
            $table_name = $request->input('table_name');
            $title = $request->input('title');
            $user_id = $request->input('user_id');

            $where_state = ['id' => $record_id];
            $records = DB::table($table_name)->where($where_state)->get();

            if ($records->isNotEmpty()) {
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = deleteRecordNoTransaction($table_name, $previous_data['results'], $where_state, $user_id);

                if ($resp) {
                    $res = ['success' => true, 'message' => $title . ' deleted successfully'];
                } else {
                    $res = ['success' => false, 'message' => $title . ' delete failed, contact the system admin if this persists'];
                }
            } else {
                $res = ['success' => false, 'message' => 'Record not found'];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res);
    }
    public function funcFetchResourcesCounter(Request $req)
    {
        try {

            $account_type_id = $req->account_type_id;
            $member_state_id = $req->member_state_id;

            $records = DB::table('tra_resources_managementrepository as t1')
                ->join('wf_workflow_statuses as t2', 't1.appworkflow_status_id', '=', 't2.id')
                ->select(DB::raw("t1.appworkflow_status_id, t2.name as statusname, count(t1.id) as statuses_counter"));
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

    public function funcFetchExpertPublicationsCounter(Request $req)
    {
        try {
            // account_type_id: account_type_id,member_state_id:member_state_id
            $user_information_id = $req->loggedInUserId;


            $records = DB::table('tra_publication_management as t1')
                ->join('wf_workflow_statuses as t2', 't1.appworkflow_status_id', '=', 't2.id')
                ->select(DB::raw("t1.appworkflow_status_id, t2.name as statusname, count(t1.id) as statuses_counter"));
            if (validateIsNumeric($user_information_id)) {
                // $records = $records->where("user_information_id", $user_information_id);
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

    public function funcFetchKnowledgeCenterCounter(Request $req)
    {
        try {
            // account_type_id: account_type_id,member_state_id:member_state_id
            $user_information_id = $req->loggedInUserId;


            $records = DB::table('tra_knowledgecenter_management as t1')
                ->join('wf_workflow_statuses as t2', 't1.appworkflow_status_id', '=', 't2.id')
                ->select(DB::raw("t1.appworkflow_status_id, t2.name as statusname, count(t1.id) as statuses_counter"));
            if (validateIsNumeric($user_information_id)) {
                // $records = $records->where("user_information_id", $user_information_id);
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
    public function onloadapplicationWorkflowSubmissionCommetns(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $data = array();
            $records = DB::table('tra_applicationprocess_submissions as t1')
                ->join('wf_workflow_statuses as t2', 't1.appworkflow_status_id', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.previous_stage_id', 't3.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage_id', 't4.id')
                ->join('usr_users_information as t5', 't1.previous_user_id', 't5.id')
                ->select('t1.id', 't3.name as previous_stage', 't2.name as appworkflow_status', 't5.first_name', 't5.other_names', 't1.date_received', 't1.remarks')
                ->where(array('t1.application_code' => $application_code))
                ->orderBy('t1.date_received')
                ->get();
            if ($records) {

                foreach ($records as $rec) {

                    $data[] = array(
                        'previous_stage' => $rec->previous_stage,
                        'appworkflow_status' => $rec->appworkflow_status,
                        'first_name' => aes_decrypt($rec->first_name),
                        'other_names' => aes_decrypt($rec->other_names),
                        'previous_user' => aes_decrypt($rec->first_name) . ' ' . aes_decrypt($rec->other_names),
                        'date_received' => $rec->date_received,
                        'remarks' => $rec->remarks,
                        'id' => $rec->id

                    );
                }

            }
            $data=encrypt_data($data);
            $res = array('success' => true, 'data' => $data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
}
