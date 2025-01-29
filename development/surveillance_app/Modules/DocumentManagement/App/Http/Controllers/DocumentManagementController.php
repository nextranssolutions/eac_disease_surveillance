<?php

namespace Modules\DocumentManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use phpseclib3\Crypt\RSA;
use phpseclib3\Crypt\Hash;
use phpseclib3\File\ASN1;
use phpseclib3\Crypt\Signature\RSA as RSASignature;
use Storage;

class DocumentManagementController extends Controller
{

    function signDocument($documentPath, $privateKey)
    {
        $rsa = RSA::loadPrivateKey($privateKey);
        $rsa->setHash('sha256');
        $rsa->setMGFHash('sha256');

        $content = file_get_contents($documentPath);
        $signature = $rsa->sign($content);

        return base64_encode($signature);
    }
    function verifySignature($documentPath, $signature, $publicKey)
    {
        $rsa = RSA::loadPublicKey($publicKey);
        $rsa->setHash('sha256');
        $rsa->setMGFHash('sha256');

        $content = file_get_contents($documentPath);
        $signature = base64_decode($signature);

        return $rsa->verify($content, $signature);
    }
    public function sign($id)
    {
        // Retrieve document path from database based on $id
        $documentPath = ''; // assume retrieved path here

        $privateKey = RSA::load(file_get_contents(storage_path('app/private.pem')));

        $document = Storage::get($documentPath);
        $signature = $privateKey->sign($document);

        // Store signature in database or attach to document (omitted for brevity)
        return back()->with('success', 'Document signed successfully!');
    }
    public function signDocumentFunc(Request $request)
    {
        $user = User::find($request->user_id);
        $privateKey = decrypt($user->private_key);

        $rsa = RSA::load($privateKey);
        $signature = new RSASignature();
        $signed = $signature->sign($request->document_content, $rsa);

        // Store or return the signed document
        return response()->json(['signed_document' => base64_encode($signed)]);
    }

    //
    public function onLoadonLoadDocumentDataConfig(Request $req)
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
    public function onLoaddocumentTypeRequirements(Request $req)
    {
        try {
            $table_name = $req->table_name;
            $table_name = base64_decode($table_name);
            $process_id = $req->process_id;
            $document_type_id = $req->document_type_id;
            $appworkflow_status_id = $req->appworkflow_status_id;

            $sql = DB::table('dms_document_requirements as t1')
                ->join('dms_docrequirements_appstatus as t2', 't1.id', 't2.document_requirement_id')
                ->select('t2.document_requirement_id', 't1.*');

            if (validateIsNumeric($process_id)) {
                $sql->where('t2.process_id', $process_id);
            }
            if (validateIsNumeric($document_type_id)) {
                $sql->where('t2.document_type_id', $document_type_id);
            }
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('t2.appworkflow_status_id', $appworkflow_status_id);
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
    public function onSaveDMSSitedetails(Request $req)
    {

        try {
            $user_id = $req->user_id;
            $post_data = $req->all();
            $table_name = $req->table_name;
            $id = $post_data['id'];
            $node_ref = $post_data['node_ref'];
            //unset unnecessary values
            $table_data = array(
                'name' => $req->name,
                'description' => $req->description,
                'node_ref' => $req->node_ref,
                'code' => $req->code,
                'is_dmssite_root' => $req->is_dmssite_root,
            );

            $where = array(
                'id' => $id
            );
            if (validateIsNumeric($id)) {
                if (recordExists($table_name, $where)) {

                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    //dms function call with validation 
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                }
            } else {

                $sql = DB::table($table_name)
                    ->where(array('node_ref' => $node_ref))
                    ->get();

                $table_data['created_on'] = Carbon::now();
                $table_data['created_by'] = $user_id;

                if (!count($sql) > 0) {
                    $res = insertRecord($table_name, $table_data, $user_id);

                } else {
                    $res = array(
                        'success' => false,
                        'message' => "Root Reposiroty has already been defined"
                    );
                }

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res);


    }
    public function onSaveDMSProcessDocumentdefinationdetails(Request $req)
    {

        try {
            $user_id = $req->user_id;
            $post_data = $req->all();
            $table_name = 'dms_processes_docdefination';
            $id = $post_data['id'];
            $site_id = $post_data['dms_site_id'];
            $process_id = $post_data['process_id'];

            $unsetData = $req->input('unset_data');

            $table_data = array(
                'name' => $req->name,
                'dms_site_id' => $req->dms_site_id,
                'process_id' => $req->process_id
            );

            $where = array(
                'id' => $id
            );
            if (validateIsNumeric($id)) {
                if (recordExists($table_name, $where)) {

                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    //dms function call with validation 
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                }
            } else {
                $sql = DB::table($table_name)
                    ->where(array('dms_site_id' => $site_id, 'process_id' => $process_id))
                    ->get();
                if (!count($sql) > 0) {
                    $site_node_ref = getSiteNodeRef($site_id);
                    $process_name = $this->getTableDataName($process_id, 'wf_processes');
                    //create a node in the site 
                    $node_name = $process_name . ' Documents';

                    $process_name = strtolower(str_replace(' ', '', $process_name));

                    $node_details = array(
                        'name' => $node_name,
                        'nodeType' => 'cm:folder'
                    );

                    $response = dmsCreateAppRootNodesChildren($site_node_ref, $node_details);

                    if ($response['success']) {
                        $node_id = $response['node_details']->id;
                        $table_data['node_ref'] = $node_id;

                        $table_data['created_on'] = Carbon::now();
                        $table_data['created_by'] = $user_id;

                        $table_data['node_name'] = $node_name;

                        $table_data['is_enabled'] = true;
                        $res = insertRecord($table_name, $table_data, $user_id);
                        if ($res['success']) {
                            $res['message'] = $node_name . ' has been created successfully';

                        }

                    } else {
                        $res = $response;
                    }
                } else {

                    $res = array(
                        'success' => false,
                        'message' => "Node Repository has already been defined"
                    );
                }
            }

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
        return response()->json($res);

    }
    public function onSaveDMSNonStructuredDocdefinationdetails(Request $req)
    {

        try {
            $user_id = $req->user_id;
            $post_data = $req->all();
            $table_name = 'dms_nonstructured_docrequirement';
            $id = $post_data['id'];
            $site_id = $post_data['dms_site_id'];

            $table_data = array(
                'name' => $req->name,
                'dms_site_id' => $req->dms_site_id
            );

            $where = array(
                'id' => $id
            );
            if (validateIsNumeric($id)) {
                if (recordExists($table_name, $where)) {

                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    //dms function call with validation 
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                }
            } else {
                $sql = DB::table($table_name)
                    ->where(array('dms_site_id' => $site_id, 'name' => $req->name))
                    ->get();
                if (!count($sql) > 0) {
                    $site_node_ref = getSiteNodeRef($site_id);

                    $node_name = $req->name . ' Documents';


                    $node_details = array(
                        'name' => $node_name,
                        'nodeType' => 'cm:folder'
                    );

                    $response = dmsCreateAppRootNodesChildren($site_node_ref, $node_details);

                    if ($response['success']) {
                        $node_id = $response['node_details']->id;
                        $table_data['node_ref'] = $node_id;

                        $table_data['created_on'] = Carbon::now();
                        $table_data['created_by'] = $user_id;

                        $table_data['node_name'] = $node_name;

                        $table_data['is_enabled'] = true;
                        $res = insertRecord($table_name, $table_data, $user_id);
                        if ($res['success']) {
                            $res['message'] = $node_name . ' has been created successfully';

                        }

                    } else {
                        $res = $response;
                    }
                } else {

                    $res = array(
                        'success' => false,
                        'message' => "Node Repository has already been defined"
                    );
                }
            }

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
        return response()->json($res);

    }

    function getTableDataName($record_id, $table_name)
    {
        $sql = DB::table($table_name)
            ->where(array('id' => $record_id))
            ->first();
        $record_name = '';
        if ($sql) {
            $record_name = $sql->name;

        }
        return $record_name;

    }
    public function saveDMSNoStructuredDocDefinationDetails(Request $req)
    {

        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = 'tra_nonstructured_docdefination';
            $id = $post_data['id'];
            $site_id = $post_data['dms_site_id'];

            $document_type_id = $post_data['document_type_id'];
            $unsetData = $req->input('unset_data');

            $post_data = $this->funcReturnResetPostData($post_data);

            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $table_data = $post_data;
            //add extra params

            $where = array(
                'id' => $id
            );
            if (validateIsNumeric($id)) {
                if (recordExists($table_name, $where)) {

                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    //dms function call with validation 
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                }
            } else {
                $sql = DB::table($table_name)
                    ->where(array('dms_site_id' => $site_id, 'document_type_id' => $document_type_id))
                    ->get();
                if (!count($sql) > 0) {
                    $site_node_ref = getSiteNodeRef($site_id);
                    $section_name = $this->getTableDataName($document_type_id, 'par_document_types');
                    //create a node in the site data

                    $node_name = $section_name . ' Documents';

                    $section_name = strtolower(str_replace(' ', '', $section_name));

                    $node_details = array(
                        'name' => $node_name,
                        'nodeType' => 'cm:folder'
                    );
                    $response = dmsCreateAppRootNodesChildren($site_node_ref, $node_details);

                    if ($response['success']) {
                        $node_id = $response['node_details']->id;
                        $table_data['node_ref'] = $node_id;

                        $table_data['created_on'] = Carbon::now();
                        $table_data['created_by'] = $user_id;

                        $table_data['node_name'] = $node_name;

                        $res = insertRecord($table_name, $table_data, $user_id);
                        if ($res['success']) {
                            $res['message'] = $node_name . ' has been created successfully';

                        }

                    } else {
                        $res = $response;
                    }

                } else {

                    $res = array(
                        'success' => false,
                        'message' => "Node Repository has already been defined"
                    );
                }
            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }

    function funcReturnResetPostData($post_data)
    {
        //unset unnecessary values
        unset($post_data['_token']);
        unset($post_data['table_name']);
        unset($post_data['model']);
        unset($post_data['id']);
        unset($post_data['unset_data']);
        unset($post_data['user_id']);
        return $post_data;
    }
    public function onaplicationDocumentUpload(Request $req)
    {
        try {

            ini_set('upload_max_filesize', '500M');
            ini_set('post_max_size', '500M');
            ini_set('max_input_time', 300000000000);
            ini_set('max_execution_time', 3000000000);
            $user_id = $req->user_id;
            //get the documetn definations 
            $application_code = $req->application_code;
            $workallocations_assignment_id  = $req->workallocations_assignment_id;
            $document_requirement_id = $req->document_requirement_id;
            $process_id = $req->process_id;
            $node_ref = $req->node_ref;
            if(!validateIsNumeric($workallocations_assignment_id)){
                $workallocations_assignment_id =0;
            }
            $file = $req->file('file');
            $apptable_name = getSingleRecordColValue('wf_processes', array('id' => $process_id), 'table_name');

            $app_record = Db::table($apptable_name)->where('application_code', $application_code)->first();
            if ($app_record) {

                $process_id = $app_record->process_id;
                //section_id
                $doc_record = DB::table('dms_application_documentsdefination')->where('application_code', $application_code)->first();
                if (!$doc_record) {
                    initializeApplicationDMS($process_id, $application_code, $user_id);
                }
            }

            $app_rootnode = getApplicationRootNode($application_code);

            $table_name = 'tra_application_uploadeddocuments';

            if ($app_rootnode) {
                if ($req->hasFile('file')) {
                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();

                    $fileSize = '';
                    $file_path = $file->getPathName();
                    $document_rootupload = Config('constants.dms.doc_rootupload');

                    $destination = getcwd() . $document_rootupload;
                    $savedName = rand(15, 1000) . time() . '.' . $extension;


                    $doc_req = getSingleRecord('dms_document_requirements', array('id' => $document_requirement_id));
                    $document_requirement = $doc_req->name;
                    $document_type_id = $doc_req->document_type_id;

                    $uploadfile_name = $document_requirement . rand(15, 1000) . '.' . $extension;
                    $destination_node = $app_rootnode->node_ref;


                    $response = dmsUploadNodeDocument($destination_node, $file_path, $uploadfile_name, '');

                    $node_ref = $response['nodeRef'];
                    $document_data = array(
                        'application_code' => $application_code,
                        'document_requirement_id' => $document_requirement_id,
                        'document_type_id' => $document_type_id,
                        'uploaded_on' => Carbon::now(),
                        'uploaded_by' => $user_id,
                        'workallocations_assignment_id'=>$workallocations_assignment_id,
                        'file_name' => $uploadfile_name,
                        'initial_file_name' => $origFileName,
                        'filetype' => $extension,
                        'node_ref' => $node_ref,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                    $res = insertRecord('dms_uploaded_applicationdocs', $document_data, $user_id);

                    if ($res['success']) {
                        $res['message'] = 'Document Uploaded Successfully, proceed with submission';
                    } else {
                        //$res['message'] = 'Document Upload failed, try again or contact the system admin';

                    }



                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'No document attachement'
                    );
                }

            } else {
                $res = array(
                    'success' => false,
                    'message' => 'DMS Document Type Node not configured, contact the system Admin'
                );

            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    public function OnSaveDocumentRequirementsDef(Request $req)
    {

        try {
            $user_id = $req->user_id;
            $post_data = $req->all();
            $table_name = 'dms_document_requirements';
            $id = $post_data['id'];
            $has_document_template = $req->has_document_template;
            $uploaded_nonstructureddocument_id = 0;
            $nonstructured_docrequirement_id = $req->nonstructured_docrequirement_id;
            $is_mandatory = false;
            if ($req->is_mandatory) {
                $is_mandatory = true;
            }
            $table_data = array(
                'name' => $req->name,
                'document_type_id' => $req->document_type_id,
                'is_mandatory' => $is_mandatory,
                'has_document_template' => $req->has_document_template
            );

            $where = array(
                'id' => $id
            );
            if (validateIsNumeric($id)) {
                if (recordExists($table_name, $where)) {

                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    //dms function call with validation 
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);

                }
            } else {
                //
                $sql = DB::table($table_name)
                    ->where(array(
                        'name' => $req->name,
                        'document_type_id' => $req->document_type_id
                    ))
                    ->get();
                if (!count($sql) > 0) {

                    if (validateIsNumeric($nonstructured_docrequirement_id)) {
                        //upload the document dms_site_id
                        $document_ref = $this->uploadDocumentTemplatesFile($req);

                        if (!$document_ref['success']) {
                            return response()->json($document_ref);

                        }

                        $uploaded_nonstructureddocument_id = $document_ref['record_id'];
                        $table_data['uploaded_nonstructureddocument_id'] = $uploaded_nonstructureddocument_id;



                    }
                    $node_name = '';

                    $table_data['created_on'] = Carbon::now();
                    $table_data['created_by'] = $user_id;

                    // $table_data['is_enabled'] = true;
                    $res = insertRecord($table_name, $table_data, $user_id);
                    if ($res['success']) {
                        $res['message'] = ' Saved successfully';

                    }
                } else {

                    $res = array(
                        'success' => false,
                        'message' => "Document Requirement defination already saved"
                    );
                }
            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }


    private function uploadDocumentTemplatesFile($req)
    {

        try {

            $user_id = $req->user_id;
            $nonstructured_docrequirement_id = $req->nonstructured_docrequirement_id;

            $node_ref = $req->node_ref;

            $table_name = 'dms_uploaded_nonstructureddocuments';

            $file = $req->file('file');
            //tra_nonstructured_docdefination
            $doc_data = getSingleRecord('dms_nonstructured_docrequirement', array('id' => $nonstructured_docrequirement_id));

            if ($doc_data) {
                $node_ref = $doc_data->node_ref;
                $document_reqname = $doc_data->name;

                if ($req->hasFile('file')) {

                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $fileSize = 0;// $file->getClientSize();
                    $document_rootupload = env('doc_rootupload');

                    $destination = getcwd() . $document_rootupload;

                    $savedName = date('H:m:s') . '.' . $extension;

                    // $file->move($destination, $savedName);
                    $document_path = $destination . $savedName;

                    $uploadfile_name = $document_reqname . '.' . $extension;

                    $destination_node = $node_ref;

                    $response = dmsUploadNodeDocument($destination_node, $file, $uploadfile_name, '');

                    $node_ref = $response['nodeRef'];

                    $document_data = array(
                        'nonstructured_docrequirement_id' => $nonstructured_docrequirement_id,
                        'uploaded_on' => Carbon::now(),
                        'uploaded_by' => $user_id,
                        'file_name' => $uploadfile_name,
                        'initial_file_name' => $origFileName,
                        'filetype' => $extension,
                        'node_ref' => $node_ref,
                        'file_size' => $fileSize,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id,
                    );

                    $res = insertRecord($table_name, $document_data, $user_id);
                    if ($res['success']) {
                        $res['node_ref'] = $node_ref;
                        $res['message'] = 'Document Uploaded Successfully';
                    }


                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'No document attachement for upload'
                    );
                }

            } else {
                $res = array(
                    'success' => false,
                    'message' => 'DMS Document Type Node not configured, contact the system Admin'
                );

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }


        return $res;

    }
    public function uploadApplicationDocumentFile(Request $req)
    {
        try {
            ini_set('upload_max_filesize', '500M');
            ini_set('post_max_size', '500M');
            ini_set('max_input_time', 300000000000);
            ini_set('max_execution_time', 3000000000);
            $user_id = $this->user_id;
            //get the documetn definations 
            $application_code = $req->application_code;

            $module_id = $req->module_id;
            $record_id = $req->id;
            $node_ref = $req->node_ref;
            $sub_module_id = $req->sub_module_id;
            $document_type_id = $req->document_type_id;
            $document_requirement_id = $req->document_requirement_id;
            $assessment_start_date = $req->assessment_start_date;
            $assessment_end_date = $req->assessment_end_date;
            $assessment_by = $req->assessment_by;
            $query_ref_id = $req->query_ref_id;
            $file = $req->file('file');
            $apptable_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');

            $app_record = Db::table($apptable_name)->where('application_code', $application_code)->first();
            if ($app_record) {
                $section_id = $app_record->section_id;
                $ref_number = $app_record->reference_no;
                if (!validateIsNumeric($section_id)) {
                    $section_id = 7;
                }
                $doc_record = Db::table('tra_application_documentsdefination')->where('application_code', $application_code)->first();

                if (!$doc_record) {

                    $res = initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number . rand(0, 100), $user_id);
                }
            }

            $app_rootnode = getApplicationRootNode($application_code);

            $app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id, $application_code, $document_type_id, $user_id);

            $table_name = 'tra_application_uploadeddocuments';

            if ($app_rootnode) {
                if ($req->hasFile('uploaded_doc')) {
                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $docextension_check = $this->validateDocumentExtension($extension, $document_requirement_id);
                    $is_allowedextension = $docextension_check['is_allowedextension'];

                    if (!$is_allowedextension) {
                        $allowed_filetypes = $docextension_check['allowed_filetypes'];
                        $res = array('success' => false, 'message' => 'Upload the allowed file types or contact the authority for further guidelines. Allowed File Types extensions:.' . $allowed_filetypes);

                    } else {

                        $fileSize = $file->getClientSize();
                        $file_path = $file->getPathName();
                        $document_rootupload = Config('constants.dms.doc_rootupload');

                        $destination = getcwd() . $document_rootupload;
                        $savedName = rand(15, 1000) . time() . '.' . $extension;

                        //$file->move($destination, $savedName);
                        $document_path = $destination . $savedName;
                        //check if tje dpcument type has been mapped and not autoCreate the folder
                        $document_requirement = getParameterItem('tra_documentupload_requirements', $document_requirement_id);

                        //get the application root folder str_random

                        $uploadfile_name = $document_requirement . rand(15, 1000) . '.' . $extension;
                        $destination_node = $app_rootnode->node_ref;

                        if (validateIsNumeric($record_id)) {

                            $response = dmsUploadNodeDocument($destination_node, $file_path, $uploadfile_name, $node_ref);
                            $node_ref = $response['nodeRef'];
                            $document_data = array(
                                'application_code' => $application_code,
                                'document_requirement_id' => $document_requirement_id,
                                'uploaded_on' => Carbon::now(),
                                'uploaded_by' => $user_id,
                                'file_name' => $uploadfile_name,
                                'initial_file_name' => $origFileName,
                                'file_type' => $extension,
                                'node_ref' => $node_ref,
                                'query_ref_id' => $query_ref_id,
                                'dola' => Carbon::now(),
                                'altered_by' => $user_id,
                                'assessment_start_date' => $assessment_start_date,
                                'assessment_end_date' => $assessment_end_date,
                                'assessment_by' => $assessment_by
                            );

                            $where = array('id' => $record_id);

                            if (recordExists($table_name, $where)) {

                                $previous_data = getPreviousRecords('tra_application_uploadeddocuments', $where);
                                $previous_data = $previous_data['results'];
                                $res = updateRecord('tra_application_uploadeddocuments', $previous_data, $where, $document_data, $user_id);

                                $previous_data = $previous_data[0];
                                $document_upload_id = $previous_data['id'];
                                unset($previous_data['id']);
                                $previous_data['document_upload_id'] = $document_upload_id;
                                $res = insertRecord('tra_documents_prevversions', $previous_data, $user_id);
                                if ($res['success'] == false) {
                                    return $res;
                                }

                            }
                        } else {
                            $response = dmsUploadNodeDocument($destination_node, $file_path, $uploadfile_name, '');

                            $node_ref = $response['nodeRef'];
                            $document_data = array(
                                'application_code' => $application_code,
                                'document_requirement_id' => $document_requirement_id,
                                'document_type_id' => $document_type_id,
                                'uploaded_on' => Carbon::now(),
                                'uploaded_by' => $user_id,
                                'file_name' => $uploadfile_name,
                                'initial_file_name' => $origFileName,
                                'file_type' => $extension,
                                'node_ref' => $node_ref,
                                'query_ref_id' => $query_ref_id,
                                'created_on' => Carbon::now(),
                                'created_by' => $user_id,
                                'assessment_start_date' => $assessment_start_date,
                                'assessment_end_date' => $assessment_end_date,
                                'assessment_by' => $assessment_by
                            );
                            $res = insertRecord('tra_application_uploadeddocuments', $document_data, $user_id);

                            if ($res['success']) {

                                $res['message'] = 'Document Uploaded Successfully';
                            } else {
                                $res['message'] = 'Document Upload failed, try again or contact the system admin';

                            }


                        }

                    }

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'No document attachement for upload'
                    );
                }

            } else {
                $res = array(
                    'success' => false,
                    'message' => 'DMS Document Type Node not configured, contact the system Admin'
                );

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);

    }
    //onLoadApplicationUploadeddocument
    public function onDeleteUploadedDocumentDetails(Request $req)
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
    //  
    public function onLoaddocumentPreviewUploadedData(Request $req)
    {
        try {

            $application_code = $req->application_code;
            $workallocations_assignment_id = $req->workallocations_assignment_id;

            
            $process_id = $req->process_id;
            $uploaded_by = $req->uploaded_by;
            $document_type_id = $req->document_type_id;
            $workflow_stage_id = $req->workflow_stage_id;
            $appworkflow_status_id = $req->appworkflow_status_id;

            if (!validateIsNumeric($appworkflow_status_id)) {
                // $appworkflow_status_id = 1;
            }

            $doc_data = array();
            $i = 1;
            DB::enableQueryLog();

            $sql = DB::table('dms_document_requirements as t1')
                ->leftJoin('dms_document_types as t2', 't1.document_type_id', '=', 't2.id')
                ->leftJoin('dms_docrequirements_appstatus as t4', 't1.id', '=', 't4.document_requirement_id')
                ->join('dms_uploaded_applicationdocs as t5', 't1.id', '=', 't5.document_requirement_id')
                ->select(DB::raw("t1.*,t5.id as uploadeddocuments_id, t5.*,t1.name as document_requirement, t2.name as document_type, '' as allowed_extensions"));

            if (validateIsNumeric($application_code)) {
                $sql->where(array('application_code' => $application_code));
            }
            if (validateIsNumeric($uploaded_by)) {
                $sql->where(array('uploaded_by' => $uploaded_by));
            }if (validateIsNumeric($workallocations_assignment_id)) {
                $sql->where(array('workallocations_assignment_id' => $workallocations_assignment_id));
            }
            
            $document_records = $sql->get();

            foreach ($document_records as $rec) {
                //
                $doc_data[] = array(
                    'document_type' => $rec->document_type,
                    'document_requirement' => $rec->document_requirement,
                    'document_requirement_id' => $rec->document_requirement_id,
                    'uploaded_on' => $rec->uploaded_on,
                    'uploaded_by' => $rec->uploaded_by,
                    'initial_file_name' => $rec->initial_file_name,
                    'file_name' => $rec->file_name,
                    'file_type' => $rec->filetype,
                    'id' => $rec->uploadeddocuments_id,
                    'uploadeddocuments_id' => $rec->uploadeddocuments_id,
                    'sn' => $i,
                    'is_mandatory' => $rec->is_mandatory,
                    'node_ref' => $rec->node_ref
                );

                $i++;
            }

            $res = array('success' => true, 'data' => $doc_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }
    public function onLoadApplicationUploadedDocument(Request $req)
    {

        try {

            $application_code = $req->application_code;

            $process_id = $req->process_id;
            $uploaded_by = $req->uploaded_by;
            $document_type_id = $req->document_type_id;
            $workflow_stage_id = $req->workflow_stage_id;
            $appworkflow_status_id = $req->appworkflow_status_id;
            $workallocations_assignment_id = $req->workallocations_assignment_id;


            if (!validateIsNumeric($appworkflow_status_id)) {
                // $appworkflow_status_id = 1;
            }

            $doc_data = array();
            $i = 1;
            DB::enableQueryLog();
            $sql = DB::table('dms_document_requirements as t1')
                ->leftJoin('dms_document_types as t2', 't1.document_type_id', '=', 't2.id')
                ->leftJoin('dms_docrequirements_appstatus as t4', 't1.id', '=', 't4.document_requirement_id')
                ->select(DB::raw("t1.*, t2.name as document_type, '' as allowed_extensions"));
            if (validateIsNumeric($process_id)) {
                $sql->where('process_id', $process_id);
            }
            if (validateIsNumeric($appworkflow_status_id)) {
                $sql->where('t4.appworkflow_status_id', $appworkflow_status_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {
                $sql->where('t4.workflow_stage_id', $workflow_stage_id);
            }
            if (validateIsNumeric($document_type_id)) {
                //   $sql->where('t4.document_type_id', $document_type_id);
            }
            $doc_req = $sql->get();

            foreach ($doc_req as $rec) {

                //load the uploaded documents 
                $document_requirement_id = $rec->id;
                $document_type_id = $rec->document_type_id;
                $document_type = $rec->document_type;
                $document_requirement = $rec->name;
                $is_mandatory = $rec->is_mandatory;
                $allowed_extensions = $rec->allowed_extensions;
                if ($is_mandatory == 1) {
                    $is_mandatory = 'Mandatory';
                } else {
                    $is_mandatory = 'Not Mandatory';
                }
                // wb_uploaded_documents
                $where_queryref = array();
                if (validateIsNumeric($uploaded_by)) {
                    $where_queryref = array('uploaded_by' => $uploaded_by);

                }
                $document_records = DB::table('dms_uploaded_applicationdocs')
                    ->where(array('document_requirement_id' => $document_requirement_id))
                    ->where($where_queryref);
                if (validateIsNumeric($application_code)) {
                    $document_records->where('application_code', $application_code);

                }
                if (validateIsNumeric($workallocations_assignment_id)) {
                    $document_records->where('workallocations_assignment_id', $workallocations_assignment_id);

                }



                $document_records = $document_records->get();
                if ($document_records->count() > 0 && validateIsNumeric($application_code)) {

                    foreach ($document_records as $doc_rec) {

                        $doc_data[] = array(
                            'document_type' => $document_type,
                            'document_requirement' => $document_requirement,
                            'document_requirement_id' => $document_requirement_id,
                            'uploaded_on' => $doc_rec->uploaded_on,
                            'uploaded_by' => $doc_rec->uploaded_by,
                            'initial_file_name' => $doc_rec->initial_file_name,
                            'file_name' => $doc_rec->file_name,
                            'file_type' => $doc_rec->filetype,
                            'id' => $doc_rec->id,
                            'uploadeddocuments_id' => $doc_rec->id,
                            'sn' => $i,
                            'is_mandatory' => $is_mandatory,
                            'allowed_extensions' => $allowed_extensions,
                            'node_ref' => $doc_rec->node_ref
                        );
                    }
                } else {
                    $doc_data[] = array(
                        'document_type' => $document_type,
                        'document_requirement' => $document_requirement,
                        'document_requirement_id' => $document_requirement_id,
                        'uploaded_on' => 'Not-Uploaded',
                        'file_name' => 'Not-Uploaded',
                        'uploaded_by' => '',
                        'uploadeddocuments_id' => '',
                        'sn' => $i,
                        'id' => $document_requirement_id,
                        'is_mandatory' => $is_mandatory,
                        'initial_file_name' => '',
                        'initial_file_name1' => '',
                        'file_type' => '',
                        'dms_node_id' => '',
                        'allowed_extensions' => $allowed_extensions,
                        'version_no' => '',
                    );
                }
                $i++;
            }

            $res = array('success' => true, 'data' => $doc_data);
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);
    }

    public function getApplicationDocumentDownloadurl(Request $req)
    {
        try {

            $node_ref = $req->node_ref;
            $uploadeddocuments_id = $req->uploadeddocuments_id;
            $table_name = 'dms_uploaded_applicationdocs';
            $application_code = $req->application_code;
            $where_state = array('application_code' => $application_code, 'id' => $uploadeddocuments_id);
            $records = DB::table($table_name)
                ->where($where_state)
                ->first();
            if ($records) {

                $node_ref = $records->node_ref;
                $initial_file_name = $records->initial_file_name;

                $url = downloadDocumentUrl($node_ref, '');

                set_time_limit(0);

                $public_dir = public_path() . '/resources/upload_folder';
                $file = file_get_contents($url);
                $filetopath = $public_dir . '/' . $initial_file_name;

                file_put_contents($filetopath, $file);

                ini_set('memory_limit', '-1');

                if (file_exists($filetopath)) {
                    $path = $req->root();
                    $path = str_replace('index.php', '', $path);

                    $filetopath = $path . '/resources/upload_folder/' . $initial_file_name;

                    $res = array(
                        'success' => true,
                        'document_url' => $filetopath
                    );

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Document Not Uploaded'
                    );
                }

            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Document Not Uploaded'
                );
            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }
        return response()->json($res);
    }

}
