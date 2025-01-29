<?php

use App\Helpers\SecurityHelper;
use App\Helpers\AuthHelper;
use App\Helpers\UtilityHelper;
use App\Helpers\DbHelper;
use App\Helpers\DMSHelper;
use App\Helpers\ReportsHelper;
use App\Helpers\EmailHelper;
use App\Helpers\EncryptionHelper;

if (!function_exists('aes_encrypt')) {
    function aes_encrypt($value)
    {
        return SecurityHelper::aes_encrypt($value);
    }
}
if (!function_exists('authenticateApiUser')) {
    function authenticateApiUser($username,$password,$request)
    {
        return SecurityHelper::authenticateApiUser($username,$password,$request);
    }
}

if (!function_exists('getAssignedProcessStages')) {
    function getAssignedProcessStages($user_group_id)
    {
        return DbHelper::getAssignedProcessStages($user_group_id);
    }
}
if (!function_exists('returnContextMenuActions')) {
    function returnContextMenuActions($process_id)
    {
        return UtilityHelper::returnContextMenuActions($process_id);
    }
}
if (!function_exists('funcUpdateCurrentSubmission')) {
    function funcUpdateCurrentSubmission($application_code, $prevworkflow_stage_id, $user_id)
    {
        return UtilityHelper::funcUpdateCurrentSubmission($application_code, $prevworkflow_stage_id, $user_id);
    }
}

if (!function_exists('getDateDifference')) {
    function getDateDifference($date1, $date2)
    {
        return UtilityHelper::getDateDifference($date1, $date2);
    }
}



if (!function_exists('getInitialWorkflowStatusId')) {
    function getInitialWorkflowStatusId($process_id)
    {
        return UtilityHelper::getInitialWorkflowStatusId($process_id);
    }
}

if (!function_exists('returnContxtMenuActions')) {
    function returnContxtMenuActions()
    {
        return UtilityHelper::returnContxtMenuActions();
    }
}
if (!function_exists('returnActionColumn')) {
    function returnActionColumn($status_id, $actionColumnData)
    {
        return UtilityHelper::returnActionColumn($status_id, $actionColumnData);
    }
}
if (!function_exists('aes_decrypt')) {
    function aes_decrypt($value)
    {
        return SecurityHelper::aes_decrypt($value);
    }
}

if (!function_exists('returnTableNamefromModule')) {
    function returnTableNamefromModule($table_name, $module_id)
    {
        return UtilityHelper::returnTableNamefromModule($table_name, $module_id);
    }
}

if (!function_exists('getParameterItgenems')) {
    function getParameterItems($table_name, $filter, $con = 'pgsql')
    {
        return DbHelper::getParameterItems($table_name, $filter, $con);
    }
}

if (!function_exists('validateEmail')) {
    function validateEmail($email_address)
    {
        return UtilityHelper::validateEmail($email_address);
    }
}
if (!function_exists('validatePhoneNo')) {
    function validatePhoneNo($telephone_no)
    {
        return UtilityHelper::validatePhoneNo($telephone_no);
    }
}


if (!function_exists('encryptArray')) {
    function encryptArray($array, $skipArray)
    {
        return SecurityHelper::encryptArray($array, $skipArray);
    }
}

if (!function_exists('decryptArray')) {
    function decryptArray($array)
    {
        return SecurityHelper::decryptArray($array);
    }
}
//Auth Helpers
if (!function_exists('generateUniqID')) {
    function generateUniqID()
    {
        return AuthHelper::generateUniqID();
    }
}

if (!function_exists('generatePwdSaltOnRegister')) {
    function generatePwdSaltOnRegister($username)
    {
        return AuthHelper::generatePwdSaltOnRegister($username);
    }
}

if (!function_exists('generatePwdSaltOnLogin')) {
    function generatePwdSaltOnLogin($username, $uuid)
    {
        return AuthHelper::generatePwdSaltOnLogin($username, $uuid);
    }
}

if (!function_exists('hashPwdOnRegister')) {
    function hashPwdOnRegister($username, $pwd)
    {
        return AuthHelper::hashPwdOnRegister($username, $pwd);
    }
}

if (!function_exists('hashPwd')) {
    function hashPwd($username, $uuid, $pwd)
    {
        return AuthHelper::hashPwd($username, $uuid, $pwd);
    }
}

if (!function_exists('hashPwdOnLogin')) {
    function hashPwdOnLogin($username, $uuid, $pwd)
    {
        return AuthHelper::hashPwdOnLogin($username, $uuid, $pwd);
    }
}

if (!function_exists('getTimeDiffHrs')) {
    function getTimeDiffHrs($time1, $time2)
    {
        return UtilityHelper::getTimeDiffHrs($time1, $time2);
    }
}

if (!function_exists('is_connected')) {
    function is_connected()
    {
        return UtilityHelper::is_connected();
    }
}
if (!function_exists('getfile_extension')) {
    function getfile_extension($fileName)
    {
        return UtilityHelper::getfile_extension($fileName);
    }
}

if (!function_exists('convertStdClassObjToArray')) {
    function convertStdClassObjToArray($stdObjArray)
    {
        return DbHelper::convertStdClassObjToArray($stdObjArray);
    }
}
if (!function_exists('funcForeignexistValidation')) {
    function funcForeignexistValidation($foreign_key, $record_id, $check_foreigntable)
    {
       // return DbHelper::funcForeignexistValidation($foreign_key, $record_id, $check_foreigntable);

    }
}

if (!function_exists('insertRecordNoTransaction')) {
    function insertRecordNoTransaction($table_name, $table_data, $user_id)
    {
        return DbHelper::insertRecordNoTransaction($table_name, $table_data, $user_id);
    }
}

if (!function_exists('insertRecord')) {
    function insertRecord($table_name, $table_data, $user_id= 0, $con = 'pgsql')
    {

        return DbHelper::insertRecord($table_name, $table_data, $user_id, $con);
    }
}

if (!function_exists('insertPortalRecord')) {
    function insertPortalRecord($table_name, $table_data, $user_id= 0, $con = 'portal')
    {

        return DbHelper::insertRecord($table_name, $table_data, $user_id, $con);
    }
}

if(!function_exists('sendMailNotification')){
	function sendMailNotification($to,$subject,$message,$cc=null,$bcc=null,$attachement=null,$attachement_name = null,$template_id =null, $vars=null) {
		 return EmailHelper::sendMailNotification( $to,$subject,$message,$cc,$bcc,$attachement,$attachement_name,$template_id, $vars);
	
	}
}

if(!function_exists('sendMailFromNotification')){
    function sendMailFromNotification($trader_name, $to,$subject,$message,$cc=null,$from=''){
         return EmailHelper::sendMailFromNotification($trader_name, $to,$subject,$message,$cc,$from);
    
    }
}

if (!function_exists('updateRecord')) {
    function updateRecord($table_name, $previous_data, $where, $table_data, $user_id, $con = 'pgsql')
    {
        return DbHelper::updateRecord($table_name, $previous_data, $where, $table_data, $user_id, $con);
    }
}

if (!function_exists('updatePortalRecord')) {
    function updatePortalRecord($table_name, $previous_data, $where, $table_data, $user_id, $con = 'portal')
    {
        return DbHelper::updateRecord($table_name, $previous_data, $where, $table_data, $user_id, $con);
    }
}

if (!function_exists('getPreviousPortalRecords')) {
    function getPreviousPortalRecords($table_name, $where, $con = 'portal')
    {
        return DbHelper::getPreviousRecords($table_name, $where, $con);
    }
}


if (!function_exists('deleteRecord')) {
    function deleteRecord($table_name, $previous_data, $where_data, $user_id, $con = 'pgsql')
    {
        return DbHelper::deleteRecord($table_name, $previous_data, $where_data, $user_id, $con);
    }
}

if (!function_exists('deleteRecordNoTransaction')) {
    function deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con = 'pgsql')
    {
        return DbHelper::deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con);
    }
}

if (!function_exists('deletePortalRecordNoTransaction')) {
    function deletePortalRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con = 'portal')
    {
        return DbHelper::deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id, $con);
    }
}

if (!function_exists('softDeleteRecord')) {
    function softDeleteRecord($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::softDeleteRecord($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('softDeleteRecordNoTransaction')) {
    function softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('undoSoftDeletes')) {
    function undoSoftDeletes($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::undoSoftDeletes($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('undoSoftDeletesNoTransaction')) {
    function undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('deleteRecordNoAudit')) {
    function deleteRecordNoAudit($table_name, $where_data)
    {
        return DbHelper::deleteRecordNoAudit($table_name, $where_data);
    }
}

if (!function_exists('decryptSimpleArray')) {
    function decryptSimpleArray($array)
    {
        return SecurityHelper::decryptSimpleArray($array);
    }
}

if (!function_exists('recordExists')) {
    function recordExists($table_name, $where, $con = 'pgsql')
    {
        return DbHelper::recordExists($table_name, $where, $con);
    }
}

if (!function_exists('getPreviousRecords')) {
    function getPreviousRecords($table_name, $where, $con = 'pgsql')
    {
        return DbHelper::getPreviousRecords($table_name, $where, $con);
    }
}

if (!function_exists('getRecordValFromWhere')) {
    function getRecordValFromWhere($table_name, $where, $col)
    {
        return DbHelper::getRecordValFromWhere($table_name, $where, $col);
    }
}

if (!function_exists('convertAssArrayToSimpleArray')) {
    function convertAssArrayToSimpleArray($assArray, $targetField)
    {
        return DbHelper::convertAssArrayToSimpleArray($assArray, $targetField);
    }
}



if (!function_exists('insertReturnID')) {
    function insertReturnID($table_name, $table_data)
    {
        return DbHelper::insertReturnID($table_name, $table_data);
    }
}

if (!function_exists('insertRecordNoAudit')) {
    function insertRecordNoAudit($table_name, $table_data)
    {
        return DbHelper::insertRecordNoAudit($table_name, $table_data);
    }
}

if (!function_exists('converter1')) {
    function converter1($date)
    {
        return UtilityHelper::converter1($date);
    }
}

if (!function_exists('converter2')) {
    function converter2($date)
    {
        return UtilityHelper::converter2($date);
    }
}

if (!function_exists('converter11')) {
    function converter11($date)
    {
        return UtilityHelper::converter11($date);
    }
}


if (!function_exists('converter22')) {
    function converter22($date)
    {
        return UtilityHelper::converter22($date);
    }
}

if (!function_exists('getSingleRecord')) {
    function getSingleRecord($table, $where,$col='pgsql')
    {
        return DbHelper::getSingleRecord($table, $where,$col);
    }
}

if (!function_exists('getSingleRecordColValue')) {
    function getSingleRecordColValue($table, $where, $col, $con = 'pgsql')
    {
        return DbHelper::getSingleRecordColValue($table, $where, $col, $con);
    }
}

if (!function_exists('formatMoney')) {
    function formatMoney($value)
    {
        return UtilityHelper::formatMoney($value);
    }
}


if (!function_exists('utf8ize')) {
    function utf8ize($d)
    {
        return UtilityHelper::utf8ize($d);
    }

}

if (!function_exists('formatDate')) {
    function formatDate($date)
    {
        return UtilityHelper::formatDate($date);
    }
}

if (!function_exists('formatDaterpt')) {
    function formatDaterpt($date)
    {
        return UtilityHelper::formatDaterpt($date);
    }
}


if (!function_exists('returnUniqueArray')) {
    function returnUniqueArray($array, $key)
    {
        return UtilityHelper::returnUniqueArray($array, $key);
    }
}


if (!function_exists('unsetArrayData')) {
    function unsetArrayData($postData, $unsetData)
    {
        return UtilityHelper::unsetArrayData($postData, $unsetData);
    }
}

if (!function_exists('formatBytes')) {
    function formatBytes($size, $precision = 2)
    {
        return UtilityHelper::formatBytes($size, $precision);
    }
}
if (!function_exists('convert_number_to_words')) {
    function convert_number_to_words($number)
    {
        return UtilityHelper::convert_number_to_words($number);
    }
}

if (!function_exists('initiateInitialProcessSubmission')) {
    function initiateInitialProcessSubmission($table_name,$application_code,$process_id,$user_id=0)
    {
        return UtilityHelper::initiateInitialProcessSubmission($table_name,$application_code,$process_id,$user_id);
    }
}

if (!function_exists('getTableData')) {
    function getTableData($table_name, $where,$col='pgsql')
    {
        return DbHelper::getTableData($table_name, $where,$col);
    }
}


//
if (!function_exists('updateInTrayReading')) {
    function updateInTrayReading($application_id, $application_code, $current_stage, $user_id)
    {
        return UtilityHelper::updateInTrayReading($application_id, $application_code, $current_stage, $user_id);
    }
}

if (!function_exists('updateInTraySubmissions')) {
    function updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id)
    {
        return UtilityHelper::updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);
    }
}



if (!function_exists('getIPAddress')) {
    function getIPAddress()
    {
        return DbHelper::getIPAddress();
    }
}

if (!function_exists('generateRefNumber')) {
    function generateRefNumber($codes_array, $ref_id)
    {
        return UtilityHelper::generateRefNumber($codes_array, $ref_id);
    }
}

if (!function_exists('uploadFile')) {
    function uploadFile($req, $params, $table_name, $folder, $user_id)
    {
        return UtilityHelper::uploadFile($req, $params, $table_name, $folder, $user_id);
    }
}
if (!function_exists('validateIsNumeric')) {
    function validateIsNumeric($value)
    {
        return UtilityHelper::validateIsNumeric($value);
    }
}
//start of DMS 
if (!function_exists('initializeApplicationDMS')) {
    function initializeApplicationDMS($process_id,  $application_code,  $user_id)
    {
        DMSHelper::initializeApplicationDMS($process_id,  $application_code,  $user_id);
    }
}
if (!function_exists('getApplicationRootNode')) {
    function getApplicationRootNode($application_code)
    {
        return DMSHelper::getApplicationRootNode($application_code);

    }
}
if (!function_exists('dmsCreateAppSiteRoot')) {
    function dmsCreateAppSiteRoot($site_details)
    {
        return DMSHelper::dmsCreateAppSiteRoot($site_details);

    }
}
if (!function_exists('getSiteNodeRef')) {
    function getSiteNodeRef($site_id)
    {
        return DMSHelper::getSiteNodeRef($site_id);

    }
}
if (!function_exists('downloadDocumentUrl')) {
    function downloadDocumentUrl($node_ref, $version_id = null)
    {
        return DMSHelper::downloadDocumentUrl($node_ref, $version_id);

    }
}
if (!function_exists('dmsUploadNodeDocument')) {
    function dmsUploadNodeDocument($destination_node, $document_path, $origFileName, $update_noderef = null, $description = null)
    {
        return DMSHelper::dmsUploadNodeDocument($destination_node, $document_path, $origFileName, $update_noderef, $description);
    }
}
//getSiteNodeRef()
if (!function_exists('dmsCreateAppRootNodesChildren')) {
    function dmsCreateAppRootNodesChildren($parent_node, $node_details)
    {
        return DMSHelper::dmsCreateAppRootNodesChildren($parent_node, $node_details);

    }
}
//end of the dms function call
if (!function_exists('utf8ize')) {
    function utf8ize($d)
    {
        return UtilityHelper::utf8ize($d);
    }

}

if (!function_exists('formatDate')) {
    function formatDate($date)
    {
        return UtilityHelper::formatDate($date);
    }
}

if (!function_exists('formatDaterpt')) {
    function formatDaterpt($date)
    {
        return UtilityHelper::formatDaterpt($date);
    }
}

if (!function_exists('getParameterItem')) {
    function getParameterItem($table_name, $record_id, $con = 'pgsql')
    {
        return DbHelper::getParameterItem($table_name, $record_id, $con);
    }
}

if (!function_exists('unsetPrimaryIDsInArray')) {
    function unsetPrimaryIDsInArray($array)
    {
        return DbHelper::unsetPrimaryIDsInArray($array);
    }
}

if (!function_exists('createInitialRegistrationRecord')) {
    function createInitialRegistrationRecord($reg_table, $application_table, $reg_params, $application_id, $reg_column)
    {
        return DbHelper::createInitialRegistrationRecord($reg_table, $application_table, $reg_params, $application_id, $reg_column);
    }
}

if (!function_exists('convertArrayToString')) {
    function convertArrayToString($array)
    {
        return DbHelper::convertArrayToString($array);
    }
}

if (!function_exists('generateUserRegistrationNo')) {
    function generateUserRegistrationNo($table_name)
    {
        return UtilityHelper::generateUserRegistrationNo($table_name);
    }
}

if (!function_exists('generateReferenceNo')) {
    function generateReferenceNo($table_name)
    {
        return UtilityHelper::generateReferenceNo($table_name);
    }
}

if (!function_exists('getExchangeRate')) {
    function getExchangeRate($currency_id)
    {
        return DbHelper::getExchangeRate($currency_id);
    }
}


if (!function_exists('returnParamFromArray')) {
    function returnParamFromArray($dataArray, $dataValue)
    {
        return UtilityHelper::returnParamFromArray($dataArray, $dataValue);
    }
}


if (!function_exists('returnMessage')) {
    function returnMessage($results)
    {
        return UtilityHelper::returnMessage($results);
    }
}


if (!function_exists('generateApplicationViewID')) {
    function generateApplicationViewID()
    {
        return UtilityHelper::generateApplicationViewID();
    }
}
//errror handler
if (!function_exists('sys_error_handler')) {
    function sys_error_handler($error='', $level=1, $me=[], $class_array=[],$user_id=0)
    {
        return DbHelper::sys_error_handler($error, $level, $me, $class_array,$user_id);
    }
}

if (!function_exists('number_to_alpha')) {
    function number_to_alpha($num,$code)
    {
        return UtilityHelper::number_to_alpha($num,$code);
    }
}
if (!function_exists('toUpperCase')) {
    function toUpperCase($flat_array)
    {
        return UtilityHelper::toUpperCase($flat_array);
    }
}

if (!function_exists('generateApplicationCode')) {
    function generateApplicationCode($process_id, $table_name)
    {
        return UtilityHelper::generateApplicationCode($process_id, $table_name);
    }
}
if (!function_exists('exportDatatoExcel')) {
    function exportDatatoExcel($data, $heading, $filename)
    {
        return ReportsHelper::exportDatatoExcel($data, $heading, $filename);
    }
}
if (!function_exists('getTableName')) {
    function getTableName($module_id, $is_portal = 0)
    {
        return UtilityHelper::getTableName($module_id, $is_portal = 0);
    }
}


if (!function_exists('getPermitSignatorySignature')) {
    function getPermitSignatorySignature()
    {
        return UtilityHelper::getPermitSignatorySignature();
    }
}

if (!function_exists('getGenericResponsewithRercId')) {
    function getGenericResponsewithRercId($resp)
    {
        return UtilityHelper::getGenericResponsewithRercId($resp);
    }
}
if (!function_exists('generateAppReferenceNo')) {
    function generateAppReferenceNo($process_id, $table_name, $user_id)
    {
        return UtilityHelper::generateAppReferenceNo($process_id, $table_name, $user_id);
    }
}
if (!function_exists('encrypt_data')) {
    function encrypt_data($data)
    {
        return EncryptionHelper::encrypt_data($data);
    }
}
if (!function_exists('decrypt_data')) {
    function decrypt_data($data)
    {
        return EncryptionHelper::decrypt_data($data);
    }
}

