<?php

namespace Modules\PublicInfoManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PublicInfoManagementController extends Controller
{

    public function onLoadPublicInfoConfig(Request $req)
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
    public function onSearchExpertsProfileInformation(Request $req)
{
    try {
        $process_id = 2;
        // Correct variable names
        $experts_keywordsearch = $req->experts_keywordsearch;
        $experts_country = $req->experts_country;
        $experts_regulatoryfuncsearch = $req->experts_regulatoryfuncsearch;
        $experts_regulatoryinstitutiontype = $req->experts_regulatoryinstitutiontype;
        
        // Initialize the query builder
        $user_data = array();
        $table_name = 'exp_expertsprofile_information';
        
        $sql = DB::table($table_name . ' as t1')
            ->leftJoin('usr_users_information as t2', 't1.user_information_id', 't2.id')
            ->leftJoin('cfg_regulatory_functions as t3', 't1.coreregulatory_function_id', 't3.id')
            ->leftJoin('par_areasof_expertises as t4', 't1.area_of_expertise_id', 't4.id')
            ->leftJoin('par_countries as t5', 't1.country_of_origin_id', 't5.id')
            ->leftJoin('par_institutions as t6', 't1.institution_id', 't6.id')
            ->leftJoin('par_institutions_types as t7', 't1.institution_type_id', 't7.id')
            ->leftJoin('usr_users_title as t8', 't1.user_title_id', 't8.id')
            ->select(
                't1.*',
                't6.name as institution_name', 
                't5.name as country_of_residence',  
                't3.name as regulatory_function', 
                't4.name as area_of_expertise', 
                't7.name as institutions_types',
                't8.name as expert_title'
            )
            ->where('allow_public_visibility', true);

        // Check if any filter is provided and apply necessary conditions
        if (!empty($experts_country) || !empty($experts_keywordsearch) || !empty($experts_regulatoryfuncsearch) || !empty($experts_regulatoryinstitutiontype)) {
            
            // Keyword search: first name, other names, or surname
            if (!empty($experts_keywordsearch)) {
                $sql->where(function($query) use ($experts_keywordsearch) {
                    $query->where('t1.first_name', 'like', "%$experts_keywordsearch%")
                          ->orWhere('t1.other_names', 'like', "%$experts_keywordsearch%")
                          ->orWhere('t1.surname', 'like', "%$experts_keywordsearch%");
                });
            }

            // Institution type filtering (if numeric)
            if (is_numeric($experts_regulatoryinstitutiontype)) {
                $sql->where('t1.institution_type_id', $experts_regulatoryinstitutiontype);
            }

            // Regulatory function filtering (if numeric)
            if (is_numeric($experts_regulatoryfuncsearch)) {
                $sql->where('t3.id', $experts_regulatoryfuncsearch);
            }

            // Country filtering (if numeric)
            if (is_numeric($experts_country)) {
                $sql->where('t5.id', $experts_country);
            }
        }
        $data = $sql->get();

        // Loop through each record and build the response array
        foreach ($data as $rec) {
            $user_data[] = array(
                'id' => $rec->id,
                'user_title_id' => $rec->user_title_id,
                'identification_type_id' => $rec->identification_type_id,
                'country_of_origin_id' => $rec->country_of_origin_id,
                'nationality_id' => $rec->nationality_id,
                'email_address' => $rec->email_address,
                'experts_name' => $rec->first_name . ' ' . $rec->other_names . ' ' . $rec->surname,
                'areas_of_specialisation' => $rec->regulatory_function . ' ' . $rec->area_of_expertise,
                'experts_profile_no' => $rec->experts_profile_no,
                'area_of_expertise_id' => $rec->area_of_expertise_id,
                'present_telephone_no' => $rec->present_telephone_no,
                'permanent_telephone_no' => $rec->permanent_telephone_no,
                'present_address' => $rec->present_address,
                'country_of_residence' => $rec->country_of_residence,
                'regulatory_function' => $rec->regulatory_function,
                'institution_name' => $rec->institution_name,
                'institutions_types' => $rec->institutions_types,
                'expert_title'=>$rec->expert_title,
                'organization_name'=>$rec->organization_name,
            );
        }
        $user_data=encrypt_data($user_data);
        $res = array('success' => true, 'data' => $user_data);

    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }
    return response()->json($res, 200);
}

  public function onGetExpertsProfileInformation(Request $req)
    {
        try {
            $user_data = array();
            $requestData = $req->all();
            $table_name = $req->table_name;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $user_information_id = $req->user_information_id;
            $is_experts_register = $req->is_experts_register;

            $table_name = 'exp_expertsprofile_information';

            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->join('usr_users_information as t2', 't1.user_information_id', 't2.id')
                ->leftJoin('wf_workflowstatuses_actions as t6', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't6.workflow_status_id');
                    $join->on('t1.process_id', '=', 't6.process_id');
                    $join->on('t6.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t7', 't6.statuses_action_id', 't7.id')
                ->leftJoin('wf_workflow_statuses as t8', 't1.appworkflow_status_id', 't8.id')
                ->leftJoin('par_institutions_types as t9', 't1.institution_type_id', 't9.id')
                ->leftJoin('par_institutions as t10', 't1.institution_id', 't10.id')
                ->leftJoin('usr_identification_type as t11', 't1.identification_type_id', 't11.id')
                ->leftJoin('par_countries as t12', 't1.country_of_origin_id', 't12.id')
                ->leftJoin('cfg_regulatory_functions as t13', 't1.coreregulatory_function_id', 't13.id')
                ->leftJoin('par_areasof_expertises as t14', 't1.area_of_expertise_id', 't14.id')
            
                ->select('t1.*', 't7.name as action_name', 't7.iconCls', 't7.action', 't9.name as institution_type', 't10.name as institution', 't11.name as identification_type', 't12.name as country_of_origin', 't13.name as coreregulatory_function', 't14.name as area_of_expertise');
              
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
            }
            if (validateIsNumeric($user_information_id) && !$is_experts_register) {
                $sql->where('t2.id', $user_information_id);
            }

            $process_id = 2;
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();

            foreach ($data as $rec) {

                $user_data[] = array(
                    'id' => $rec->id,
                    'user_title_id' => $rec->user_title_id,
                    'identification_type_id' => $rec->identification_type_id,
                    'country_of_origin_id' => $rec->country_of_origin_id,
                    'nationality_id' => $rec->nationality_id,
                    'email_address' => ($rec->email_address),
                    'first_name' => ($rec->first_name),
                    'other_names' => ($rec->other_names),
                    'surname' => ($rec->surname),
                    'application_code' => $rec->application_code,
                    'experts_profile_no' => $rec->experts_profile_no,
                    'identification_number' => $rec->identification_number,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'area_of_expertise_id' => $rec->area_of_expertise_id,
                    'present_telephone_no' => $rec->present_telephone_no,
                    'permanent_telephone_no' => $rec->permanent_telephone_no,
                    'present_address' => $rec->present_address,
                    'coreregulatory_function_id' => $rec->coreregulatory_function_id,
                    'place_of_birth' => $rec->place_of_birth,
                    'permanent_address' => $rec->permanent_address,
                    'gender_id' => $rec->gender_id,
                    'date_of_birth' => $rec->date_of_birth,
                    'action_name' => $rec->action_name,
                    'allow_public_visibility' => $rec->allow_public_visibility,
                    'expertsprofile_information_id' => $rec->id,
                    
                    'institution_type' => $rec->institution_type,
                    'institution' => $rec->institution,
                    'identification_type' => $rec->identification_type,
                    'country_of_origin' => $rec->country_of_origin,
                    'area_of_expertise' => $rec->area_of_expertise,
                    'coreregulatory_function' => $rec->coreregulatory_function,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'action' => $rec->action,
                    'iconCls' => $rec->iconCls,
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
    public function getSystemNavigationItems(Request $req)
    {
        try {
            $rootItems = array();

            $navigation_type_id = $req->navigation_type_id;
            
                //get the table data ,'user_group_id' => $userGroupId
                $level = 0;
                $navigationItems = DB::table('wf_navigation_items as t1')
                   ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
                    ->select('t1.*', 't3.routerlink', 't1.iconsCls')
                    ->orderBy('t1.order_no')->where(array('level' => $level, 't1.navigation_type_id'=>$navigation_type_id));
              
    
                $navigationItems = $navigationItems->get();
                $rootItems = array();
                // This will store items in a hierarchical structure
                $hierarchicalItems = [];
      
                // Group items by their parent_id to create a hierarchical structure
                foreach ($navigationItems as $item) {
      
                    $parent_id = $item->id;
                    $level = 1;
                    $childrens = $this->getNavigationChildrens($parent_id, $level,$navigation_type_id);
                    if (!empty($childrens)) {
                        $item->children = $childrens;
                        $rootItems[] = $item;
                    } else {
                        $rootItems[] = $item;
                    }
                }
                // $rootItems=encrypt_data($rootItems);
           
            
            $res = array(
                'success' => true,
                'navigation_items' => $rootItems
            );
  
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
  
    }
    function getNavigationChildrens($parent_id, $level,$navigation_type_id)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('sys_usergroup_navpermissions as t2', 't1.id', 't2.navigation_item_id')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            
            ->select('t1.*', 't3.routerlink', 't1.iconsCls','t2.user_access_levels_id')
            ->orderBy('order_no') 
            ->where(array('level' => $level,'parent_id' => $parent_id ,'t1.navigation_type_id'=>$navigation_type_id));
           
            $navigationItems = $navigationItems->get();
        foreach ($navigationItems as $item) {
            
            $childrens[] = $item;
           
        }
  
        return $childrens;
    }

    public function getOrganisationServices(Request $req)
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


    public function onLoadExpertsPublicationManagement(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'tra_publication_management';
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
                ->select('t1.id as publication_management_id', 't4.name as appworkflow_status', 't1.*', 't3.name as action_name', 't3.iconCls', 't3.action');

            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('appworkflow_status_id', $appworkflow_status_id);
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

    public function onUserSubscriptionRequest(Request $req)
{
    try {
        $process_id = 18;
        $email_address = $req->email_address;

        $validator = Validator::make($req->all(), [
            'email_address' => 'required|string|email:rfc,dns,spoof|indisposable',
            'created_by' => 'nullable|max:255',
            'created_on' => now(), 
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
                'application_code' => $application_code,
                'process_id' => $process_id,
                'created_by' => $req->input('email_address'),
                'created_on' => now(),
            );

            $resp = insertRecord($table_name, $user_data);
        }

        if ($resp['success']) {
            $subscription_registration_id = $resp['record_id'];

            // Insertion of the publication items
            $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id, $subscription_registration_id);

            $template_id = 8;
            $subject = 'Publication Information';
            $vars = array(
                '{email_address}' => $req->email_address,
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

public function onLoadPublicApprovedExpressionofInterests(Request $req)
{
    try {
        $requestData = $req->all();
        $table_name = 'eoi_general_information';
        $date_today = date('Y-m-d');

        $appworkflow_status_id = $req->appworkflow_status_id;
        $eoi_data = array();

        $sql = DB::table($table_name . ' as t1')
            ->leftJoin('eoi_publishing_information as t2', 't1.id', '=', 't2.eoi_id')
            ->leftJoin('eoi_category as t11', 't1.eoi_category_id', 't11.id')
            ->leftJoin('cfg_regulatory_functions as t9', 't1.coreregulatory_function_id', 't9.id')
            ->leftJoin('par_areasof_expertises as t10', 't1.area_of_expertise_id', 't10.id')
            ->leftJoin('par_engagement_types as t12', 't1.engagement_type_id', 't12.id')
            ->leftJoin('par_timespan_definations as t13', 't2.period_spandefination_id','t13.id')

            ->select('t1.id as eoi_general_id', 't12.name as engagement_type', 't10.name as area_of_expertise', 't11.name as eoi_category', 't9.name as coreregulatory_function', 't13.name as period_spandefination', 't1.*', 't2.*');

        //  $sql->where('appworkflow_status_id', 2);
        $sql->whereRaw(" TO_CHAR(t2.closing_date, 'YYYY/MM/DD') >= '" . $date_today . "'");

        $process_id = 5;
        $data = $sql->get();
        foreach ($data as $rec) {
            $eoi_data[] = array(
                'id' => $rec->eoi_general_id,
                'eoi_id' => $rec->eoi_general_id,
                'process_id' => $rec->process_id,
                'appworkflow_status_id' => $rec->appworkflow_status_id,
                'area_of_expertise_id' => $rec->area_of_expertise_id,
                'coreregulatory_function_id' => $rec->coreregulatory_function_id,
                'application_code' => $rec->application_code,
                'engagement_type_id' => $rec->engagement_type_id,
                'eoi_category_id' => $rec->eoi_category_id,
                'eoi_title' => $rec->eoi_title,
                'closing_date' => $rec->closing_date,
                'enquiries_submissions_to' => $rec->enquiries_submissions_to,
                'publishing_remarks' => $rec->publishing_remarks,
                'submission_method_id' => $rec->submission_method_id,
                'last_enquiry_date' => $rec->last_enquiry_date,
                'background_information' => $rec->background_information,
                'app_reference_no' => $rec->app_reference_no,
                'eoi_regulatoryfunc_expertise' => $rec->eoi_regulatoryfunc_expertise,
                'objectives' => $rec->objectives,
                'area_of_expertise' => $rec->area_of_expertise,
                'eoi_category' => $rec->eoi_category,
                'coreregulatory_function' => $rec->coreregulatory_function,
                'engagement_type' => $rec->engagement_type,
                'period_of_work' => $rec->period_of_work . ' ' . $rec->period_spandefination,
            );
        }
        $res = ['success' => true, 'data' => $eoi_data];
    } catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    }
    return response()->json($res, 200);

}

}
