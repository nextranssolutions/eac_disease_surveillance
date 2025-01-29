<?php

namespace Modules\SysAdministration\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class SysAdministrationController extends Controller
{
    public function GetDetails()
    {
        try {
            $usr_users_groups = DB::table('usr_users_groups')->get();
            $usr_users_accesslvls = DB::table('usr_users_accesslvls')->get();
            $tra_group_navigationassignment = DB::table('tra_group_navigationassignment')->get();

            $res = array(
                'success' => true,
                'message' => 'Fetched User groups, access levels and navigation assignments',
                'usr_users_groups' => $usr_users_groups,
                'usr_users_accesslvls' => $usr_users_accesslvls,
                'tra_group_navigationassignment' => $tra_group_navigationassignment,
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function GetSingleDetail($id)
    {
        try {
            $usr_users_groups = DB::table('usr_users_groups')->find($id);
            $usr_users_accesslvls = DB::table('usr_users_accesslvls')->find($id);
            $tra_group_navigationassignment = DB::table('tra_group_navigationassignment')->find($id);

            $res = array(
                'success' => true,
                'message' => 'Fetched User groups, access levels and navigation assignments',
                'usr_users_groups' => $usr_users_groups,
                'usr_users_accesslvls' => $usr_users_accesslvls,
                'tra_group_navigationassignment' => $tra_group_navigationassignment,
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    public function onSaveSystemAdministrationDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $resetcolumns = $req->resetcolumns;
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

            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
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
    // public function onSaveSystemAdminWithImage(Request $req)
    // {
    //     try {
    //         // Gather inputs
    //         $data = $req->all();
    //         $record_id = $req->id; // Capture record ID
    //         $user_id = $req->user_id;
    //         $user_name = $req->user_name;
    //         $table_name = $req->table_name; 
    //         $resetcolumns = $req->resetcolumns;
    
    //         // Remove unnecessary fields
    //         unset($data['user_id'], $data['user_name'], $data['table_name'], $data['resetcolumns']);
    
    //         if ($resetcolumns != '') {
    //             $restcolumn_array = explode(',', $resetcolumns);
    //             $data = unsetArrayData($data, $restcolumn_array);
    //         }
    
    //         // Handle file upload if present
    //         if ($req->hasFile('image_path')) {
    //             $file = $req->file('image_path');
    //             $extension = $file->getClientOriginalExtension();
    //             $upload_directory = config('images.upload_directory');
    //             $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;
    
    //             if ($file->move($upload_directory, $savedName)) {
    //                 $data['image_path'] = $savedName;
    //             } else {
    //                 return response()->json([
    //                     'success' => false,
    //                     'message' => 'File upload failed'
    //                 ], 500);
    //             }
    //         }
    
    //         // Remove the `id` key if it is null or empty
    //         if (empty($record_id)) {
    //             unset($data['id']); // Ensure `id` is not passed in the insert
    //         }
    
    //         // Update if record ID is provided
    //         if (validateIsNumeric($record_id)) {
    //             $where = ['id' => $record_id];
    
    //             if (recordExists($table_name, $where)) {
    //                 $data['dola'] = Carbon::now();
    //                 $data['altered_by'] = $user_id;
    //                 $previous_data = getPreviousRecords($table_name, $where);
    
    //                 $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
    //             }
    //         } else {
    //             // Insert a new record if no ID is provided
    //             $data['created_by'] = $user_id;
    //             $data['created_on'] = Carbon::now();
    //             $resp = insertRecord($table_name, $data, $user_name);
    //         }
    
    //         // Handle response
    //         if ($resp['success']) {
    //             $res = [
    //                 'success' => true,
    //                 'record_id' => $resp['record_id'],
    //                 'message' => 'Saved Successfully'
    //             ];
    //         } else {
    //             $res = [
    //                 'success' => false,
    //                 'message' => $resp['message']
    //             ];
    //         }
    //     } catch (\Exception $exception) {
    //         $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     } catch (\Throwable $throwable) {
    //         $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
    //     }
    
    //     return response()->json($res, 200);
    // }    


    public function onSaveNotSlidesInformation(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'not_slides_informations';

            // Prepare data for insert/update
            $data = array(
                'name' => $req->name,
                'title' => $req->title,
                'slide_content' => $req->slide_content,
                'footer' => $req->footer,
                'is_enabled' => $req->boolean('is_enabled')
            );

            // Handle file upload if present
            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                // $upload_directory = '/opt/lampp/htdocs/nextrans-solutions/auda-ecred/developmentv2/public/views/dev_portal/auda-ecredsolution/src/assets/dist/img/';
                $upload_directory = config('images.upload_directory');
                $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;

                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);

                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onSaveSignatories(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'wf_process_signatorydetails';

            // Prepare data for insert/update
            $data = array(
                'process_id' => $req->process_id,
                'name' => $req->name,
                'signatory_title' => $req->signatory_title,
                'active_from' => formatDate($req->active_from),
                'active_to' => formatDate($req->active_to),
                'user_id' => $req->user_id,
                // 'is_enabled' => $req->boolean('is_enabled')
            );

            // Handle file upload if present
            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                //$upload_directory = '/opt/lampp/htdocs/nextrans-solutions/auda-ecred/developmentv2/public/views/dev_portal/auda-ecredsolution/src/assets/dist/img/';
                $upload_directory = config('images.upload_directory');
                $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;

                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);

                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }

    public function onSaveSystemAdminWithImage(Request $req)
    {
        try {
            // Gather inputs from the request
            $record_id = $req->id;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'sys_system_information';

            // Prepare data for insert/update
            $data = array(
                'system_name' => $req->system_name,
                'system_acronym' => $req->system_acronym,
                'organisation_name' => $req->organisation_name,
                'physical_address' => $req->physical_address,
                'country' => $req->country,
                'email_address' => $req->email_address,
                'image_path' => $req->image_path,
                
                // 'user_id' => $req->user_id,
                // 'is_enabled' => $req->boolean('is_enabled')
            );

            // Handle file upload if present
            if ($req->hasFile('image_path')) {
                $file = $req->file('image_path');
                $extension = $file->getClientOriginalExtension();
                //$upload_directory = '/opt/lampp/htdocs/nextrans-solutions/auda-ecred/developmentv2/public/views/dev_portal/auda-ecredsolution/src/assets/dist/img/';
                $upload_directory = config('images.upload_directory');
                $savedName = 'assets/dist/img/image-' . rand(0, 10000) . '.' . $extension;

                if ($file->move($upload_directory, $savedName)) {
                    // Save the file path to the data array
                    $data['image_path'] = $savedName;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed'
                    ], 500);
                }
            }

            // Update if record ID is provided
            if (validateIsNumeric($record_id)) {
                $where = ['id' => $record_id];

                // Update if record exists
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);

                    // Perform the update
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_name);
                }
            } else {
                // Insert a new record if no ID is provided
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $resp = insertRecord($table_name, $data, $user_name);
            }

            // Handle response based on success or failure of the operation
            if ($resp['success']) {
                $res = [
                    'success' => true,
                    'record_id' => $resp['record_id'],
                    'message' => 'Saved Successfully'
                ];
            } else {
                $res = [
                    'success' => false,
                    'message' => $resp['message']
                ];
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onLoadSystemAdministrationData(Request $req)
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

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res, 200);
    }


    public function onDeleteSystemAdministrationDetails(Request $req)
    {
        try {
            $record_id = $req->id;
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

                $resp = deleteRecordNoTransaction($table_name, $previous_data['results'], $where_state, $user_id);
            }
            if ($resp['success']) {
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

    public function getAppUserGroupNavigationMenus(Request $req)
    {
        try {
            $level = 0;
            $user_group_id = $req->user_group_id;

            $navigationItems = DB::table('wf_navigation_items as t1')
                ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
                ->leftJoin('sys_usergroup_navpermissions as t4', function ($join) use ($user_group_id) {
                    $join->on('t1.id', '=', 't4.navigation_item_id')
                        ->on('t4.user_group_id', '=', DB::raw($user_group_id));
                })
                ->leftjoin( 'wf_navigation_types as t5', 't1.navigation_type_id', 't5.id')
                ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't4.user_access_levels_id', 't4.navigation_item_id', 't4.user_group_id')
                ->orderBy('t1.order_no')
                ->where(array('level' => $level))

                ->get();
            $rootItems = array();
            // This will store items in a hierarchical structure
            $hierarchicalItems = [];

            // Group items by their parent_id to create a hierarchical structure
            foreach ($navigationItems as $item) {

                $parent_id = $item->id;
                $level = 1;
                $childrens = $this->getNavigationItemsChildrens($parent_id, $level, $user_group_id);
                if (!empty($childrens)) {
                    $item->children = $childrens;
                    $rootItems[] = $item;
                } else {
                    $rootItems[] = $item;
                }
            }

            $res = $rootItems;
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);

    }
    function getNavigationItemsChildrens($parent_id, $level, $user_group_id)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->leftJoin('sys_usergroup_navpermissions as t4', function ($join) use ($user_group_id) {
                $join->on('t1.id', '=', 't4.navigation_item_id')
                    ->on('t4.user_group_id', '=', DB::raw($user_group_id));
            })
            ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't4.user_access_levels_id', 't4.navigation_item_id', 't4.user_group_id')

            ->orderBy('order_no')
            ->where(array('level' => $level, 'parent_id' => $parent_id))->get();
        foreach ($navigationItems as $item) {

            $child_id = $item->id;
            $level_child = 2;
            //check for the next level 
            $grand_children = $this->grandNavigationschildfunction($child_id, $level_child, $user_group_id);
            if (!empty($grand_children)) {

                $item->children = $grand_children;
                $childrens[] = $item;
            } else {
                $childrens[] = $item;
            }
        }

        return $childrens;
    }
    function grandNavigationschildfunction($parent_id, $level, $user_group_id)
    {
        $childrens = array();
        $navigationItems = DB::table('wf_navigation_items as t1')
            ->leftJoin('wf_system_interfaces as t3', 't1.system_interface_id', 't3.id')
            ->leftJoin('sys_usergroup_navpermissions as t4', function ($join) use ($user_group_id) {
                $join->on('t1.id', '=', 't4.navigation_item_id')
                    ->on('t4.user_group_id', '=', DB::raw($user_group_id));
            })
            ->select('t1.*', 't3.routerlink', 't1.iconsCls', 't4.user_access_levels_id', 't4.navigation_item_id', 't4.user_group_id')
            ->where(array('level' => $level, 'parent_id' => $parent_id))->get();

        foreach ($navigationItems as $child) {

            $childrens[] = $child;
        }

        return $childrens;

    }

    public function onSavingUserNavigationPermissions(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {

                foreach ($permission_data as $rec) {

                    $navigation_item_id = $rec->navigation_id;
                    $user_group_id = $rec->user_group_id;
                    $user_access_levels_id = $rec->user_access_levels_id;
                    $where = array('navigation_item_id' => $navigation_item_id, 'user_group_id' => $user_group_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'navigation_item_id' => $navigation_item_id,
                        'user_access_levels_id' => $user_access_levels_id,
                        'user_group_id' => $user_group_id
                    );

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


            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
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
    public function getAppUserGroupWorkflowPermission(Request $req)
    {
        try {
            $user_group_id = $req->user_group_id;

            $data = DB::table('wf_workflow_stages as t1')
                ->leftJoin('wf_workflow_definition as t3', 't1.workflow_id', 't3.id')
                ->leftJoin('sys_user_workflowstagepermissions as t4', function ($join) use ($user_group_id) {
                    $join->on('t1.id', '=', 't4.workflow_stage_id')
                        ->on('t4.user_group_id', '=', DB::raw($user_group_id));
                })
                ->select('t1.*', 't3.name as workflow_name', 't1.name as workflow_stage', 't4.user_access_levels_id', 't1.id as workflow_stage_id', 't4.user_group_id')
                ->orderBy('t1.order_no')
                ->get();

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }


    public function getAppUserGroupRegulatoryFunctions(Request $req)
    {
        try {
            $user_group_id = $req->user_group_id;

            $data = DB::table('cfg_regulatory_functions as t1')
                ->leftJoin('cfg_regulatoryfunctionaccess_groups as t2', function ($join) use ($user_group_id) {
                    $join->on('t1.id', '=', 't2.regulatory_function_id')
                        ->on('t2.user_group_id', '=', DB::raw($user_group_id));
                })
                ->select('t1.*')
                ->orderBy('t1.order_no')
                ->get();

            $res = array('success' => true, 'data' => $data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    

    public function onSaveSystemGuideline(Request $req)
    {
        try {
            $process_id = 17;
            $appworkflow_status_id = 1;

            $application_code = $req->application_code;
            $user_id = $req->user_id;
            $user_name = $req->user_name;
            $table_name = 'sys_systemguidelines_detail';
            $guidelines = base64_decode($req->guidelines);

            $dataguidelines = mb_convert_encoding($guidelines, 'UTF-8', 'UTF-8');

            $data = array(
                'systemguide_id' => $req->systemguide_id,
                'systems_functionality_id' => $req->systems_functionality_id,
                'dashboard_type_id' => $req->dashboard_type_id,
                'guideline_step_no' => $req->guideline_step_no,
                'guidelines' => $dataguidelines
            );

            if (!validateIsNumeric($application_code)) {
                // Creating a new record
                $application_code = generateApplicationCode($process_id, $table_name);
                $app_reference_no = generateAppReferenceNo($process_id, $table_name, '');
                $data['app_reference_no'] = $app_reference_no;
                $data['created_by'] = $user_id;
                $data['process_id'] = $process_id;
                $data['application_code'] = $application_code;
                $data['appworkflow_status_id'] = $appworkflow_status_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_name);
                $sub = initiateInitialProcessSubmission($table_name, $application_code, $process_id);

            } else {
                // Updating an existing record
                $where = array('application_code' => $application_code);
                $previous_data = getPreviousRecords($table_name, $where);

                if ($previous_data && recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = $previous_data['results'];
                    $app_reference_no = $previous_data[0]['app_reference_no'];
                    if (empty($app_reference_no)) {
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
                $eoi_id = $resp['record_id'];

                $res = array(
                    'success' => true,
                    'application_code' => $application_code,
                    'app_reference_no' => $app_reference_no,
                    'systemguide_id' => $eoi_id,
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

    public function onLoadSystemGuideline(Request $req)
    {
        try {
            $requestData = $req->all();
            $table_name = 'sys_systemguidelines_detail';
            $appworkflow_status_id = $req->appworkflow_status_id;
            $eoi_data = [];
            unset($requestData['table_name']);

            $sql = DB::table($table_name . ' as t1')
                ->leftJoin('wf_workflowstatuses_actions as t6', function ($join) {
                    $join->on('t1.appworkflow_status_id', '=', 't6.workflow_status_id');
                    $join->on('t1.process_id', '=', 't6.process_id');
                    $join->on('t6.is_default_action', '=', DB::raw(True));
                })
                ->leftJoin('wf_statuses_actions as t7', 't6.statuses_action_id', 't7.id')
                ->leftJoin('wf_workflow_statuses as t8', 't1.appworkflow_status_id', 't8.id')
                ->leftJoin('par_systems_functionalities as t11', 't1.systems_functionality_id', 't11.id')
                ->leftJoin('sys_dashboard_types as t9', 't1.dashboard_type_id', 't9.id')
                ->select('t1.id as systemguide_id', 't8.name as appworkflow_status', 't11.name as systems_functionality', 't9.name as dashboard_type', 't1.*', 't7.name as action_name', 't7.iconCls', 't7.action');

            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('t1.appworkflow_status_id', $appworkflow_status_id);
            }

            $process_id = 17;
            $actionColumnData = returnContextMenuActions($process_id);
            $data = $sql->get();
            foreach ($data as $rec) {
                $eoi_data[] = [
                    'id' => $rec->systemguide_id,
                    'process_id' => $rec->process_id,
                    'appworkflow_status_id' => $rec->appworkflow_status_id,
                    'systems_functionality_id' => $rec->systems_functionality_id,
                    'dashboard_type_id' => $rec->dashboard_type_id,
                    'application_code' => $rec->application_code,
                    'guideline_step_no' => $rec->guideline_step_no,
                    'guidelines' => $rec->guidelines,
                    'app_reference_no' => $rec->app_reference_no,
                    'systems_functionality' => $rec->systems_functionality,
                    'dashboard_type' => $rec->dashboard_type,
                    'appworkflow_status' => $rec->appworkflow_status,
                    'action' => $rec->action,
                    'iconCls' => $rec->iconCls,
                    'contextMenu' => returnActionColumn($rec->appworkflow_status_id, $actionColumnData)
                ];
            }

            $res = ['success' => true, 'data' => $eoi_data];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }
    public function onLoadSystemManualGuidelines(Request $req)
    {
        try {
            $dashboard_type_id = $req->dashboard_type_id;
            $process_id = $req->process_id;
            $systems_functionality_id = $req->systems_functionality_id;
            $system_guidelines = array();
            $process_records = DB::table('wf_processes')->select('name as process_name', 'id');
            $guideline_data = array();
            $functionaly_datetails = array();
            if (validateIsNumeric($process_id)) {
                $process_records->where('id', $process_id);
            }
            $process_records = $process_records->get();
            foreach ($process_records as $process_record) {
                $process_id = $process_record->id;
                //then get the functionality 
                $functionaly_data = DB::table('par_systems_functionalities')->select('name as functionality_name', 'id')
                    ->where('process_id', $process_id);
                if (validateIsNumeric($systems_functionality_id)) {
                    $functionaly_data->where('id', $systems_functionality_id);
                }
                $functionaly_data = $functionaly_data->get();
                if ($functionaly_data->count() > 0) {
                    $process_data = $process_record;
                    $functionaly_datetails = array();
                    foreach ($functionaly_data as $func_data) {

                        $system_functionality_id = $func_data->id;
                        $guideline_data = $this->getSystemGuidelines($process_id, $system_functionality_id, $dashboard_type_id);

                        if ($guideline_data->count() > 0) {

                            $func_data->guideline_data = $guideline_data;
                            $functionaly_datetails[] = $func_data;
                        }
                    }
                    $process_data->functionaly_data = $functionaly_datetails;
                    $system_guidelines[] = $process_data;
                }
            }

            $res = ['success' => true, 'data' => $system_guidelines];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    function getSystemGuidelines($process_id, $systems_functionality_id, $dashboard_type_id)
    {
        $guidelines = array();
        $records = DB::table('sys_systemguidelines_detail')
            ->select('guidelines', 'guideline_step_no')
            ->where(array('process_id' => $process_id, 'systems_functionality_id' => $systems_functionality_id))
            ->orderBy('guideline_step_no', 'asc');

        if (validateIsNumeric($dashboard_type_id)) {
            $records->where('dashboard_type_id', $dashboard_type_id);
        }
        $records = $records->get();

        return $records;
    }

    public function onLoadsystemGuidelinesProcesses(Request $req)
    {
        try {
            $dashboard_type_id = $req->dashboard_type_id;
            $process_id = $req->process_id;

            $records = DB::table('sys_systemguidelines_detail as t1')
                ->join('wf_processes as t2', 't1.process_id', 't2.id')
                ->select('t2.name', 't2.id')
                ->where(array('dashboard_type_id' => $dashboard_type_id))
                ->orderBy('t2.name', 'asc')
                ->groupBy('t2.id');
            if (validateIsNumeric($process_id)) {
                $records = $records->where('process_id', $process_id);

            }
            $records = $records->get();

            $res = ['success' => true, 'data' => $records];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onLoadsystemSignInUpGuidelines(Request $req)
    {
        try {
            $guideline_option_id = $req->guideline_option_id;
            if (!validateIsNumeric($guideline_option_id)) {
                $guideline_option_id = 1;
            }
            $records = DB::table('sys_signinsignup_guidelines as t1')
                ->select('t1.*')
                ->orderBy('t1.guideline_step_no', 'asc');

            if (validateIsNumeric($guideline_option_id)) {
                $records = $records->where('guideline_option_id', $guideline_option_id);
            }
            $records = $records->get();
            $records=encrypt_data($records);

            $res = ['success' => true, 'data' => $records];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);
    }

    public function onLoadsystemGuidelinesFunctionaliites(Request $req)
    {
        try {
            $process_id = $req->process_id;

            $records = DB::table('sys_systemguidelines_detail as t1')
                ->join('par_systems_functionalities as t2', 't1.systems_functionality_id', 't2.id')
                ->select('t2.name', 't2.id')
                ->where(array('t2.process_id' => $process_id))
                ->orderBy('t2.name', 'asc')
                ->groupBy('t2.id')
                ->get();

            $res = ['success' => true, 'data' => $records];
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res, 200);

    }


    public function onSavingUserWorkflowPermissions(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {

                foreach ($permission_data as $rec) {

                    $workflow_stage_id = $rec->workflow_stage_id;
                    $user_group_id = $rec->user_group_id;
                    $user_access_levels_id = $rec->user_access_levels_id;
                    $where = array('workflow_stage_id' => $workflow_stage_id, 'user_group_id' => $user_group_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'workflow_stage_id' => $workflow_stage_id,
                        'user_access_levels_id' => $user_access_levels_id,
                        'user_group_id' => $user_group_id
                    );

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


            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
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


    public function onSavingRegulatoryFunctionPermissions(Request $req)
    {
        try {
            $resp = "";
            $user_id = $req->user_id;
            $user_name = $req->user_name;

            $data = $req->all();

            $table_name = $req->table_name;
            $permission_data = $req->permission_data;
            $record_id = $req->id;

            $permission_data = json_decode($permission_data);
            if (is_array($permission_data)) {

                foreach ($permission_data as $rec) {

                    $regulatory_function_id = $rec->regulatory_function_id;
                    $user_group_id = $rec->user_group_id;
                    $user_access_levels_id = $rec->user_access_levels_id;
                    $where = array('regulatory_function_id' => $regulatory_function_id, 'user_group_id' => $user_group_id);

                    $records = DB::table($table_name)->where($where)->get();
                    $data = array(
                        'regulatory_function_id' => $regulatory_function_id,
                        'user_access_levels_id' => $user_access_levels_id,
                        'user_group_id' => $user_group_id
                    );

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


            if ($resp['success']) {

                $res = array(
                    'success' => true,
                    'record_id' => $resp['record_id'],
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
}
