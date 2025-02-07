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
    public function onSavePandemicReportingInformation(Request $req)
    {
        try {
            $process_id = 1;
            $appworkflow_status_id = 1;

            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'txn_pandemic_reportinginformation';

            $data = array(
                'partner_state_id' => $req->partner_state_id,
                'reporting_period_from' => $req->reporting_period_from,
                'reporting_period_to' => $req->reporting_period_to,
                'reporting_period_type_id' => $req->reporting_period_type_id,
                'reporting_institution_id' => $req->reporting_institution_id,
                'source_ofinformation_id'=>$req->source_ofinformation_id,
                'pandemicreporting_type_id'=>$req->pandemicreporting_type_id,
                'description' => $req->description,
            );
            
            if (!validateIsNumeric($record_id)) {
                // New record
                $where_record = array(
                    'partner_state_id' => $req->partner_state_id,
                    'reporting_period_from' => $req->reporting_period_from,
                    'reporting_period_to' => $req->reporting_period_to,
                    'reporting_period_type_id' => $req->reporting_period_type_id,
                );
                $existingDataCount = DB::table($table_name)->where($where_record)->count();


                if ($existingDataCount > 0) {
                    return response()->json([
                        'success' => false,
                        'message' => 'There is an existing reported data for the selected period, verify from the the dashboard'
                    ], 200);
                }

                $application_code = generateApplicationCode($process_id, $table_name);
                $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');

                $data['app_reference_no'] = $app_reference_no;
                $data['created_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['appworkflow_status_id'] = $appworkflow_status_id;
                $data['created_on'] = Carbon::now();
                $data['reported_on'] = Carbon::now();
                $data['reported_by_id'] = $user_id;

                $resp = insertRecord($table_name, $data, $user_name);
            } else {
                // Existing record
                $where = array('id' => $record_id);
                $previous_data = getPreviousRecords($table_name, $where);

                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $application_code = $previous_data['results'][0]['application_code'];

                    if (!validateIsNumeric($application_code)) {
                        $application_code = generateApplicationCode($process_id, $table_name);
                    }

                    $app_reference_no = $previous_data['results'][0]['app_reference_no'];
                    if (empty($app_reference_no)) {
                        $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                        $data['app_reference_no'] = $app_reference_no;
                    }

                    $data['application_code'] = $application_code;
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                } else {
                    $resp = array(
                        'success' => false,
                        'message' => 'Record does not exist'
                    );
                }
            }

            if ($resp['success']) {
                $pandemic_reportinginformation_id = $resp['record_id'];

                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id);

                $res = array(
                    'success' => true,
                    'application_code' => $application_code,
                    'app_reference_no' => $app_reference_no,
                    'pandemic_reportinginformation_id' => $pandemic_reportinginformation_id,
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

    
public function onGetdiseaseOutbreakReportingInfo(Request $req)
{
    try {
        $process_id = 7;
        $user_id = $req->user_id;
        
        $has_state = getHasPartnerStatedefination($user_id);
        $requestData = $req->all();
        $filter = $req->filter;
        $table_name = 'txn_pandemic_reportinginformation';
        $appworkflow_status_id = $req->appworkflow_status_id;
        $publishing_status_id = $req->publishing_status_id;

        $workflow_status_id = $req->workflow_status_id;
        $notworkflow_status_id = $req->notworkflow_status_id;
        $appworkflowstatus_category_id = $req->appworkflowstatus_category_id;

        $pandemic_data = array();
        $sectionSelection = $req->sectionSelection;
        unset($requestData['table_name']);
//wkf_workflowstatuses_actions

        $sql = DB::table($table_name . ' as t1')
            ->leftJoin('cfg_countries as t2', 't2.id', 't1.partner_state_id')
            ->leftJoin('cfg_reporting_institutionstypes as t3', 't3.id', 't1.reporting_institution_id')
            ->leftJoin('wkf_workflowstatuses_actions as t7', function ($join) use ($process_id) {
                $join->on('t1.appworkflow_status_id', '=', 't7.workflow_status_id');
                if (validateIsNumeric($process_id)) {
                    $join->on('t7.process_id', '=', DB::raw($process_id));
                }
                $join->on('t7.is_default_action', '=', DB::raw(True));
            })
            ->leftJoin('wkf_statuses_actions as t8', 't7.statuses_action_id', 't8.id')
            ->leftJoin('wkf_workflow_statuses as t9', 't1.appworkflow_status_id', 't9.id')
            ->leftJoin('cfg_pandemic_informationsources as t10', 't1.source_ofinformation_id', 't10.id')
            ->leftJoin('cfg_pandemicreporting_types as t11', 't1.pandemicreporting_type_id', 't11.id')
            ->select(DB::raw("t1.*,(t1.reporting_period_from) as reporting_year, t8.name as action_name,t11.name as pandemicreporting_type, t10.name as source_ofinformation,  t8.iconcls, t8.action, t2.name as country_name, t3.name as institution_name, t1.id"));
           
        if ($workflow_status_id != '') {
            $workflow_status = explode(',', $workflow_status_id);
            $sql->whereIn('appworkflow_status_id', $workflow_status);
        }
        if ($notworkflow_status_id != '') {
            $workflow_status = explode(',', $notworkflow_status_id);
            $sql->whereNotIn('appworkflow_status_id', $workflow_status);
        }
        if (validateIsNumeric($appworkflowstatus_category_id)) {
            $sql->where(array('t9.appworkflowstatus_category_id' => $appworkflowstatus_category_id));
        }
        if (validateIsNumeric($appworkflow_status_id)) {
            $sql->where('appworkflow_status_id', $appworkflow_status_id);
        }
        if ($has_state['has_partnerstate_defination']) {
            $sql->where('t1.partner_state_id', $has_state['partner_state_id']);
        }
        if (validateIsNumeric($publishing_status_id)) {
            $sql->where('publishing_status_id', $publishing_status_id);
        }

        $actionColumnData = returnContextMenuActions($process_id);
        //check the usres 
        $partner_state_id = 0;
        $user_info = getSingleRecord('usr_users_information', array('id' => $user_id));
        if($user_info){
            if ($user_info->account_type_id == 1) {
                $partner_state_id = $user_info->partner_state_id;
                $sql->where('t1.partner_state_id', $partner_state_id);
    
            }
        }
        
        $data = $sql->get();
        
        foreach ($data as $rec) {
            $manufacturer_id = $rec->id;
            $pandemic_data[] = array(
                'id' => $rec->id,
                'reported_by_id' => $rec->reported_by_id,
                'action_name' => $rec->action_name,
                'iconcls' => $rec->iconcls,
                'action' => $rec->action,
                'reported_on' => formatDaterpt($rec->reported_on),
                'country_name' => $rec->country_name,
                'institution_name' => $rec->institution_name,
                'reporting_period_from' => $rec->reporting_period_from,
                'created_on' => $rec->created_on,

                'reporting_period_to' => $rec->reporting_period_to,
                'process_id' => $rec->process_id,
                'application_code' => $rec->application_code,
                'app_reference_no' => $rec->app_reference_no,
                'appworkflow_status_id' => $rec->appworkflow_status_id,
                'approved_by_id' => $rec->approved_by_id,

                'reporting_quarter_id' => $rec->reporting_quarter_id,
                'pandemic_reportinginformation_id' => $rec->id,
                'reporting_year' =>date('Y', strtotime($rec->reporting_year)),

                'created_by' => $rec->created_by,
                'description' => $rec->description,
                'institution_id' => $rec->institution_id,
                'altered_by' => $rec->altered_by,
                'reporting_period_type_id' => $rec->reporting_period_type_id,
                'pandemicreporting_type' => $rec->pandemicreporting_type,
                'source_ofinformation' => $rec->source_ofinformation,
                'reporting_institution_id' => $rec->reporting_institution_id,
                'source_ofinformation_id' => $rec->source_ofinformation_id,
                'pandemicreporting_type_id' => $rec->pandemicreporting_type_id,

                'partner_state_id' => $rec->partner_state_id,
                'noofreported_pandemics' => $this->getNumberofreportedPandemics($rec->id),
                'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
            );
        }

        $res = array('success' => true, 'data' => $pandemic_data);
    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }
    return response()->json($res, 200);
}
public function getNumberofreportedPandemics($pandemic_reportinginformation_id)
    {
        $count = DB::table('txn_diseasespandemics_information as t1')
            ->where('pandemic_reportinginformation_id', $pandemic_reportinginformation_id)
            ->count();

        return $count;

    }
    
    public function onGetreportingDiseasesPandemicDetails(Request $req)
    {
        try {

            $user_id = $req->loggedInUserId;
            $pandemic_reportinginformation_id = $req->pandemic_reportinginformation_id;
            $stocklevel_status_id = $req->stocklevel_status_id;
            $table_name = 'txn_diseasespandemics_information';
            $count = [];
            $data = [];
            if(!validateIsNumeric($pandemic_reportinginformation_id)){
                    $pandemic_reportinginformation_id =0;
            }
            $sql = DB::table('cfg_pandemic_prioritydiseases as t2')
                ->leftJoin($table_name . ' as t1', function ($join) use ($pandemic_reportinginformation_id) {
                    $join->on('t2.id', '=', 't1.pandemic_prioritydisease_id');
                    $join->on('t1.pandemic_reportinginformation_id', '=', DB::raw($pandemic_reportinginformation_id));
                   
                })
                ->leftJoin('cfg_source_of_infections as t3', 't3.id', 't1.source_of_infection_id')
                ->leftJoin('cfg_pandemic_intenventions as t4', 't4.id', 't1.pandemic_intenvention_id')
                ->leftJoin('txn_pandemic_reportinginformation as t5', 't5.id', 't1.pandemic_reportinginformation_id')
                ->leftJoin('cfg_countries as t6', 't6.id', 't5.partner_state_id')
                ->select(DB::raw("t1.*,t1.id as diseasespandemics_information_id,  t2.id as pandemic_prioritydisease_id, t6.name as country_name, t2.name as pandemic_prioritydisease, t3.name as source_of_infection, t4.name as pandemic_intenvention, t5.appworkflow_status_id"));
                $sql->orderBy('t1.id');
                $data = $sql->get();
          
            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    
    public function onGetdiseasepandemicGraphInformation(Request $req)
    {
        try {

            $user_id = $req->loggedInUserId;
            $pandemic_reportinginformation_id = $req->pandemic_reportinginformation_id;
            
            $partner_state_id = $req->partner_state_id;
            $pandemic_prioritydisease_id = $req->pandemic_prioritydisease_id;
            $source_of_infection_id = $req->source_of_infection_id;
          
            $table_name = 'txn_diseasespandemics_information';
            $count = [];
            $data = [];
            $sql = DB::table($table_name . ' as t1')
                ->join('cfg_pandemic_prioritydiseases as t2', 't2.id', 't1.pandemic_prioritydisease_id')
                ->join('cfg_source_of_infections as t3', 't3.id', 't1.source_of_infection_id')
                ->leftJoin('cfg_pandemic_intenventions as t4', 't4.id', 't1.pandemic_intenvention_id')
                ->join('txn_pandemic_reportinginformation as t5', 't5.id', 't1.pandemic_reportinginformation_id')
                ->leftJoin('cfg_countries as t6', 't6.id', 't1.partner_state_id')
                ->select(DB::raw("sum(t1.confirmed_cases) as number_ofconfirmed_cases,t6.name as partner_state, t2.name as pandemic_prioritydisease"));
                $sql = $sql->groupBy('t2.name','t6.name');
           
                if (validateIsNumeric($partner_state_id)) {
                    $sql->where('t1.partner_state_id', $partner_state_id);
                   
                }
                if (validateIsNumeric($pandemic_prioritydisease_id)) {
                    $sql->where('t1.pandemic_prioritydisease_id', $pandemic_prioritydisease_id);
                   
                }
                if (validateIsNumeric($source_of_infection_id)) {
                    $sql->where('t1.source_of_infection_id', $source_of_infection_id);
                   
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
    public function onGetreportedDiseasesPandemicDetails(Request $req)
    {
        try {

            $user_id = $req->loggedInUserId;
            $pandemic_reportinginformation_id = $req->pandemic_reportinginformation_id;
            $partner_state_id = $req->partner_state_id;
            $pandemic_prioritydisease_id = $req->pandemic_prioritydisease_id;
            $source_of_infection_id = $req->source_of_infection_id;
          
            $table_name = 'txn_diseasespandemics_information';
            $count = [];
            $data = [];
            $sql = DB::table($table_name . ' as t1')
                ->join('cfg_pandemic_prioritydiseases as t2', 't2.id', 't1.pandemic_prioritydisease_id')
                ->join('cfg_source_of_infections as t3', 't3.id', 't1.source_of_infection_id')
                ->leftJoin('cfg_pandemic_intenventions as t4', 't4.id', 't1.pandemic_intenvention_id')
                ->join('txn_pandemic_reportinginformation as t5', 't5.id', 't1.pandemic_reportinginformation_id')
                ->leftJoin('cfg_countries as t6', 't6.id', 't1.partner_state_id')
                ->select('t1.*', 't6.name as country_name', 't2.name as pandemic_prioritydisease', 't3.name as source_of_infection', 't4.name as pandemic_intenvention', 't5.appworkflow_status_id');

                if (validateIsNumeric($partner_state_id)) {
                    $sql->where('t1.partner_state_id', $partner_state_id);
                   
                }
                if (validateIsNumeric($pandemic_prioritydisease_id)) {
                    $sql->where('t1.pandemic_prioritydisease_id', $pandemic_prioritydisease_id);
                   
                }
                if (validateIsNumeric($source_of_infection_id)) {
                    $sql->where('t1.source_of_infection_id', $source_of_infection_id);
                   
                }
            if (validateIsNumeric($pandemic_reportinginformation_id)) {
                $sql->where('t1.pandemic_reportinginformation_id', $pandemic_reportinginformation_id);
               
            }else{
                $data = $sql->get();
            }

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onloadmyPreviousDataReportingReports(Request $req)
    {
        try {
            $user_id = $req->loggedInUserId;
            $partner_state_id = $req->partner_state_id;
            $reporting_quarter_id = $req->reporting_quarter_id;
            $table_name = 'txn_pandemic_reportinginformation';
            $process_id = $req->process_id;

            // Validate partner_state_id
            if (!is_numeric($partner_state_id)) {
                return response()->json(['success' => false, 'message' => 'Invalid partner state ID']);
            }

            $sql = DB::table($table_name . ' as t1')
                    ->leftJoin('cfg_countries as t2', 't2.id', 't1.partner_state_id')
                    ->leftJoin('cfg_reporting_institutionstypes as t3', 't3.id', 't1.reporting_institution_id')
                    ->leftJoin('wkf_workflowstatuses_actions as t7', function ($join) use ($process_id) {
                        $join->on('t1.appworkflow_status_id', '=', 't7.workflow_status_id');
                        if (validateIsNumeric($process_id)) {
                            $join->on('t7.process_id', '=', DB::raw($process_id));
                        }
                        $join->on('t7.is_default_action', '=', DB::raw(True));
                    })
                    ->leftJoin('wkf_statuses_actions as t8', 't7.statuses_action_id', 't8.id')
                    ->leftJoin('wkf_workflow_statuses as t9', 't1.appworkflow_status_id', 't9.id')
                    ->leftJoin('cfg_pandemic_informationsources as t10', 't1.source_ofinformation_id', 't10.id')
                    ->leftJoin('cfg_pandemicreporting_types as t11', 't1.pandemicreporting_type_id', 't11.id')
                    ->select(DB::raw("t1.*,(t1.reporting_period_from) as reporting_year, t8.name as action_name,t11.name as pandemicreporting_type, t10.name as source_ofinformation,  t8.iconcls, t8.action, t2.name as country_name, t3.name as institution_name, t1.id"));
                
            if (validateIsNumeric($partner_state_id)) {
                $sql->where('partner_state_id', $partner_state_id);
            }
           
            $data = $sql->get();
            $res = ['success' => true, 'data' => $data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    public function onFuncSaveDiseasePandemicDetails(Request $req)
    {
        try {

            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'txn_diseasespandemics_information';

            $data = array(
                'pandemic_prioritydisease_id' => $req->pandemic_prioritydisease_id,
                'source_of_infection_id' => $req->source_of_infection_id,
                'is_vaccinatable_disease' => $req->is_vaccinatable_disease,
                'date_of_confirmation' => $req->date_of_confirmation,
                'date_of_lastcase_reported' => $req->date_of_lastcase_reported,
                'expected_enddate' => $req->expected_enddate,
                'suspected_cases' => $req->suspected_cases,
                'testsundertaken' => $req->testsundertaken,
                'confirmed_cases' => $req->confirmed_cases,
                'recovered_cases' => $req->recovered_cases,
                'no_ofdeaths' => $req->no_ofdeaths,
                'tracer_item_code' => $req->tracer_item_code,
                'vaccine_dosesadministered' => $req->vaccine_dosesadministered,
                'pandemic_intenvention_id' => $req->pandemic_intenvention_id,
                'challenges' => $req->challenges,
                'other_comments' => $req->other_comments,
                'partner_state_id' => $req->partner_state_id,
                'province_id' => $req->province_id,
                'district_id' => $req->district_id,
                'is_vaccinatable_disease'=>$req->is_vaccinatable_disease,
                
                'latitude' => $req->latitude,
                'longitude' => $req->longitude,
                'geographic_location'=>$req->geographic_location,

                'pandemic_reportinginformation_id' => $req->pandemic_reportinginformation_id,
            );

            if (validateIsNumeric($record_id)) {
              
                $where = array('id' => $record_id);

                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
                //}


            } else {

                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }
            $res = getGenericResponsewithRercId($resp);


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);

    }
}
