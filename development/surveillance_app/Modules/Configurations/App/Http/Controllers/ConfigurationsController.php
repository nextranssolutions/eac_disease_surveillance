<?php

namespace Modules\Configurations\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ConfigurationsController extends Controller
{

    public function onLoadInformationSharingConfig(Request $req)
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

    public function onsaveConfigData(Request $req)
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
            if ($resetcolumns != '') {
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

            $res = getGenericResponsewithRercId($resp);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onLoadConfigurationData(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            //Decryption 
            // $table_name_data=decrypt_data($req->table_name);
            // $table_name = base64_decode($table_name_data);
            $table_name = base64_decode($req->table_name);

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
            if ($table_name == 'cfg_applicationforms_fields' || $table_name == 'cfg_dataentry_formfields') {
                $sql->orderBy('t1.order_no', 'asc');
            } else {
                $sql->orderBy('t1.name', 'asc');
            }
            $data = $sql->get();
            // Encryption
            // $data=encrypt_data($data);

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onLoadApplicationtablsList(Request $req)
    {
        try {
            $table_name = $req->table_name;

            $table_name = base64_decode($table_name);
            if($table_name == 'mis_tables'){
                $tables_mis = DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
            }else{
                $tables_ptl = DB::connection('portal')->select("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
            }
           
            // Merge MIS and Portal Tables
            // $tables=array_merge($tables_mis,$tables_ptl);
            //Retrieve only unique table names
            $tables = array_unique($tables_mis, SORT_REGULAR);
            sort($tables);
            // Return the table names as JSON response
            return response()->json([
                'success' => true,
                'tables' => $tables
            ], 200);
    
        } catch (\Exception $exception) {
            // Handling the exception
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            // Handling throwable
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
    
        // Return error response in case of exception or throwable
        return response()->json($res, 200);
    }
    
    public function onEnableConfigurationsDetails(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();

            $user_name = $req->user_name;
            //get the records 
            $resp = false;
            if (validateIsNumeric($req->id)) {
                $record_id = $req->id;
            }

            $where_state = array('id' => $record_id);

            $record = DB::table($table_name)
                ->where($where_state)
                ->first();
            if ($record) {
                $is_enabled = $record->is_enabled;
                if ($is_enabled) {
                    $is_enabled = false;
                    $enabling_string = "Disabled Successfully";
                } else {
                    $is_enabled = true;
                    $enabling_string = "Enabled Successfully";
                }
                $data = array('is_enabled' => $is_enabled);

                $previous_data = getPreviousRecords($table_name, $where_state);

                $data['dola'] = Carbon::now();
                $data['altered_by'] = $user_id;

                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = updateRecord($table_name, $previous_data['results'], $where_state, $data, $user_name);
            }

            if ($resp) {
                $res = array('success' => true, 'message' => $title . $enabling_string);
            } else {
                $res = array('success' => false, 'message' => $title . ' ' . $enabling_string . ' , contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }

    public function onLoadTranslationManagement(Request $req)
    {
        try {
            $translation_data = array();
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);
            $system_language_id = $req->system_language_id;

            $records = DB::table('cfg_system_labels as t1')
                ->join('cfg_system_languages as t2', 't1.system_language_id', 't2.id')
                ->select('t1.id', 't1.name', 't1.description', 't2.name as default_language', 't1.translation as default_translation', 't2.id as system_language_id')
                ->get();

            $language_records = DB::table('cfg_system_languages')->get();

            $translation_records = DB::table('tra_translation_management')->get();

            $translation_map = [];
            foreach ($translation_records as $translation) {
                $translation_map[$translation->system_label_id][$translation->system_language_id] = $translation;
            }

            foreach ($records as $rec) {
                $system_label_id = $rec->id;
                $system_label = $rec->name;

                foreach ($language_records as $language) {
                    $language_id = $language->id;
                    $translation_record = isset($translation_map[$system_label_id][$language_id]) ? $translation_map[$system_label_id][$language_id] : null;

                    if ($translation_record) {
                        $translation_data[] = array(
                            'system_label_id' => $rec->id,
                            'system_label' => $system_label,
                            'id' => $rec->id,
                            'default_language' => $rec->default_language,
                            'translation_id' => $translation_record->id,
                            'description' => $rec->description,
                            'system_language_id' => $language_id,
                            'default_translation' => $rec->default_translation,
                            'language' => $language->name,
                            'translation' => $translation_record->translation
                        );
                    } else {
                        $translation_data[] = array(
                            'system_label_id' => $rec->id,
                            'id' => $rec->id,
                            'system_label' => $rec->name,
                            'default_language' => $rec->default_language,
                            'description' => $rec->description,
                            'system_language_id' => $language_id,
                            'default_translation' => $rec->default_translation,
                            'language' => $language->name
                        );
                    }
                }
            }
            $res = array('success' => true, 'data' => $translation_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }
    public function onDeleteConfigData(Request $req)
    {
        try {
            $record_id = $req->record_id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();
            //get the records 
            $resp = false;
            if (validateIsNumeric($req->id)) {
                $record_id = $req->id;
            }

            $where_state = array('id' => $record_id);

            $records = DB::table($table_name)
                ->where($where_state)
                ->get();
            if (count($records) > 0) {
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = deleteRecordNoTransaction($table_name, $previous_data['results'], $where_state, $user_id);
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

    public function onDeleteConfigurationsDetails(Request $req) {
        try {
            $record_id = $req->record_id;
            $table_name = $req->table_name;
            $title = $req->title;
            $user_id = $req->user_id;
            $data = array();
            //get the records 
            $resp = false;
            if (validateIsNumeric($req->id)) {
                $record_id = $req->id;
            }

            $where_state = array('id' => $record_id);

            $records = DB::table($table_name)
                ->where($where_state)
                ->get();
            if (count($records) > 0) {
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = deleteRecordNoTransaction($table_name, $previous_data['results'], $where_state, $user_id);
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
    public function onSavingLanguageTranslationManagement(Request $req)
    {
        try {

            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = 'tra_translation_management';
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {
                //"system_label_id":1,"system_language_id":2,"translation":"Besoin daide ou de clarification"
                foreach ($permission_data as $rec) {

                    $system_label_id = $rec->system_label_id;
                    $system_language_id = $rec->system_language_id;
                    $translation = $rec->translation;
                    $where = array('system_label_id' => $system_label_id, 'system_language_id' => $system_language_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'system_label_id' => $system_label_id,
                        'system_language_id' => $system_language_id,
                        'translation' => $translation
                    );
                    if (validateIsNumeric($system_label_id) && validateIsNumeric($system_language_id)) {
                        if (count($records) > 0) {
                            $data['dola'] = Carbon::now();
                            $data['altered_by'] = $user_id;

                            $previous_data = getPreviousRecords($table_name, $where);

                            $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                        } else {

                            $data['created_by'] = $user_id;
                            $data['created_on'] = Carbon::now();
                            $resp = insertRecord($table_name, $data, $user_name);
                        }
                    }
                }
            }
            $res = getGenericResponsewithRercId($resp);


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }
    public function onLoadRegulatoryFunctions(Request $req)
    {
        try {
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = base64_decode($req->table_name);
            $sectionSelection = $req->sectionSelection;
            $user_group_id = $req->user_group_id;
            
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->select('t1.*');

            if (!empty($requestData)) {
                $sql->where($requestData);
            }

            if (!empty($user_group_id)){
                $sql->where('t1.user_group_id', $user_group_id);
            }
            $sql->orderBy('t1.order_no', 'asc');
            $data = $sql->get();

            // Encryption
            // $data=encrypt_data($data);

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function getAppRegulatoryFunctionFeeConfig(Request $req)
    {
        
        // $user_id = \Auth::user()->id;
        $regulatory_function_id = $req->regulatory_function_id;
        try{
			
            $qry = DB::table('txn_appmodules_feesconfigurations as t1')
                ->leftJoin('cfg_regulatory_functions as t2', 't1.regulatory_function_id', 't2.id')
                ->leftJoin('cfg_regulatory_subfunctions as t3', 't1.regulatory_subfunction_id', 't3.id')
                ->leftJoin('cfg_regulated_productstypes as t4', 't1.product_type_id', 't4.id')
                ->leftJoin('cfg_assessmentprocedure_types as t5', 't1.assessmentprocedure_type_id', 't5.id')
                ->leftJoin('cfg_prodclass_categories as t6', 't1.prodclass_category_id', 't6.id')
                ->leftJoin('cfg_product_subcategories as t7', 't1.product_subcategory_id', 't7.id')
                ->leftJoin('cfg_product_origins as t9', 't1.product_origin_id', 't9.id')
                ->leftJoin('cfg_applicationfee_types as t10', 't1.application_feetype_id', 't10.id')
                ->leftJoin('cfg_classifications as t11', 't1.classification_id', 't11.id')
                ->leftJoin('txn_feescharges_configurations as t12', 't1.element_costs_id', 't12.id')
                ->leftJoin('cfg_currencies as t14', 't12.currency_id', 't14.id')
                ->leftJoin('cfg_fee_types as t15', 't12.fee_type_id', 't15.id')
                ->leftJoin('cfg_cost_categories as t16', 't12.cost_category_id', 't16.id')
                ->leftJoin('cfg_cost_sub_categories as t17', 't12.sub_cat_id', 't17.id')
                ->leftJoin('cfg_cost_elements as t18', 't12.element_id', 't18.id')
                ->leftJoin('cfg_business_types as t20', 't1.business_type_id', 't20.id')
                ->leftJoin('cfg_gmplocation_details as t21', 't1.gmp_type_id', 't21.id')
                ->leftJoin('cfg_importexport_permittypes as t22', 't1.importexport_permittype_id', 't22.id')
                ->leftJoin('cfg_advertisement_types as t23', 't1.advertisement_type_id', 't23.id')
                ->leftJoin('cfg_investigationprod_classifications as t24', 't1.investigationprod_classification_id', 't24.id')
                // ->leftJoin('cfg_product_categories as t25', 't1.product_category_id', 't25.id')
                // ->leftJoin('cfg_clincialtrialfunding_sources as t26', 't1.clincialtrialfunding_source_id', 't26.id')
                // ->leftJoin('cfg_clincialtrialfields_types as t27', 't1.clincialtrialfields_type_id', 't27.id')
                // ->leftJoin('cfg_device_types as t28', 't1.device_type_id', 't28.id')
                // ->leftJoin('cfg_permitsproduct_categories as t29', 't1.permit_productscategory_id', 't29.id')
                ->select('t12.*', 't2.name as regulatory_function', 't20.name as business_type', 't3.name as regulatory_subfunction', 't4.name as product_type','t12.costs as costs',
				't5.name as assessment_proceduretype', 't6.name as prodclass_category','t24.name as investigationprod_classification', 't18.name as cost_element', 't7.name as product_subcategory', 't9.name as product_origin', 't10.name as applicationfeetype', 't1.*', 
                't11.name as classification_name','t15.name as fee_type','t16.name as cost_category','t17.name as cost_sub_category', DB::raw("CONCAT(t12.costs,' (',t14.name,')') as element_cost"),'t20.name as premise_type', 't21.name as gmp_type',
                't22.name as importexport_permittype','t23.name as advertisement_type',);
				
                // ->select('t12.*','t28.name as device_type','t29.name as permit_category', 't2.name as module','t25.name as product_category','t27.name as clincialtrialfields_type', 't26.name as clincialtrialfunding_source', 't20.name as business_type', 't3.name as sub_module', 't4.name as section_name','t4.name as section','t12.cost as costs',
				// 't5.name as assessment_proceduretype', 't6.name as prodclass_category','t24.name as investigationprod_classification', 't18.name as cost_element', 't7.name as product_subcategory', 't9.name as product_origin', 't10.name as applicationfeetype', 't1.*', 't11.name as classification_name','t15.name as fee_type','t16.name as cost_category','t17.name as cost_sub_category', DB::raw("CONCAT(t12.cost,' (',t14.name,')') as element_cost"),'t20.name as premise_type', 't21.name as gmp_type','t23.name as advertisement_type', 't22.name as importexport_permittype');
				
				if(validateIsNumeric($regulatory_function_id)){
					
					$qry->where('t1.regulatory_function_id', $regulatory_function_id);
					
				}
				
            $results = $qry->get();
            $res = array(
                'success'=>true,
                'message'=>'All is well',
                'results'=>$results
            );
        }
        catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
            } 
        catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
            }
        return response()->json($res);
    }

    public function getFeesChargesConfigurations(Request $req)
    {

        // $user_id = \Auth::user()->id;
        $regulatory_function_id = $req->regulatory_function_id;
        try{
			
            $qry = DB::table('txn_feescharges_configurations as t1')
                // ->leftJoin('cfg_regulatory_functions as t2', 't1.regulatory_function_id', 't2.id')

                // ->leftJoin('cfg_regulatory_subfunctions as t3', 't1.regulatory_subfunction_id', 't3.id')
                // ->leftJoin('cfg_regulated_productstypes as t4', 't1.product_type_id', 't4.id')
                // ->leftJoin('cfg_assessmentprocedure_types as t5', 't1.assessmentprocedure_type_id', 't5.id')
                // ->leftJoin('cfg_prodclass_categories as t6', 't1.prodclass_category_id', 't6.id')
                // ->leftJoin('cfg_product_subcategories as t7', 't1.product_subcategory_id', 't7.id')
                // ->leftJoin('cfg_product_origins as t9', 't1.product_origin_id', 't9.id')
                ->leftJoin('cfg_applicationfee_types as t10', 't1.application_feetype_id', 't10.id')
                // ->leftJoin('cfg_classifications as t11', 't1.classification_id', 't11.id')
                // ->leftJoin('txn_element_costs as t12', 't1.element_costs_id', 't12.id')
                ->leftJoin('cfg_currencies as t14', 't1.currency_id', 't14.id')
                ->leftJoin('cfg_fee_types as t15', 't1.fee_type_id', 't15.id')
                ->leftJoin('cfg_cost_categories as t16', 't1.cost_category_id', 't16.id')
                ->leftJoin('cfg_cost_sub_categories as t17', 't1.sub_cat_id', 't17.id')
                ->leftJoin('cfg_cost_elements as t18', 't1.element_id', 't18.id')
                ->leftJoin('cfg_cost_types as t20', 't1.cost_type_id', 't20.id')
                // ->leftJoin('cfg_gmplocation_details as t21', 't1.gmp_type_id', 't21.id')
                // ->leftJoin('cfg_importexport_permittypes as t22', 't1.importexport_permittype_id', 't22.id')
                // ->leftJoin('cfg_advertisement_types as t23', 't1.advertisement_type_id', 't23.id')
                // ->leftJoin('cfg_investigationprod_classifications as t24', 't1.investigationprod_classification_id', 't24.id')
                // ->leftJoin('cfg_product_categories as t25', 't1.product_category_id', 't25.id')
                // ->leftJoin('cfg_clincialtrialfunding_sources as t26', 't1.clincialtrialfunding_source_id', 't26.id')
                // ->leftJoin('cfg_clincialtrialfields_types as t27', 't1.clincialtrialfields_type_id', 't27.id')
                // ->leftJoin('cfg_device_types as t28', 't1.device_type_id', 't28.id')
                // ->leftJoin('cfg_permitsproduct_categories as t29', 't1.permit_productscategory_id', 't29.id')
                ->select('t1.*','t15.name as fee_type','t16.name as cost_category','t17.name as cost_sub_category','t18.name as cost_element',
                 't10.name as applicationfeetype','t14.name as currency','t20.name as cost_type',);
				
                // ->select('t12.*','t28.name as device_type','t29.name as permit_category', 't2.name as module','t25.name as product_category','t27.name as clincialtrialfields_type', 't26.name as clincialtrialfunding_source', 't20.name as business_type', 't3.name as sub_module', 't4.name as section_name','t4.name as section','t12.cost as costs',
				// 't5.name as assessment_proceduretype', 't6.name as prodclass_category','t24.name as investigationprod_classification', 't18.name as cost_element', 't7.name as product_subcategory', 't9.name as product_origin', 't10.name as applicationfeetype', 't1.*', 't11.name as classification_name','t15.name as fee_type','t16.name as cost_category','t17.name as cost_sub_category', DB::raw("CONCAT(t12.cost,' (',t14.name,')') as element_cost"),'t20.name as premise_type', 't21.name as gmp_type','t23.name as advertisement_type', 't22.name as importexport_permittype');
				
				if(validateIsNumeric($regulatory_function_id)){
					
					$qry->where('t1.regulatory_function_id', $regulatory_function_id);
					
				}
				
            $results = $qry->get();
            $res = array(
                'success'=>true,
                'message'=>'All is well',
                'results'=>$results
            );
        }
        catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
            } 
        catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
            }
        return response()->json($res);
    } 

}
