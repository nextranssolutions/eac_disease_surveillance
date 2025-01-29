<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 7/26/2017
 * Time: 1:46 PM
 */

namespace App\Helpers;

use Carbon\Carbon;
use PDF;
use Illuminate\Support\Facades\DB;
use App\Modules\Workflow\Entities\SerialTracker;
use App\Modules\Workflow\Entities\TrackingNoSerialTracker;

class UtilityHelper
{

    public static function getTimeDiffHrs($time1, $time2)
    {
        $t1 = StrToTime($time1);
        $t2 = StrToTime($time2);
        $diff = $t1 - $t2;
        $hours = $diff / (60 * 60);
        return $hours;
    }
    public static function returnTableNamefromModule($table_name, $process_id)
    {
        if ($table_name == '') {
            $table_name = getSingleRecordColValue('wf_processes', array('id' => $process_id), 'table_name');

        }
        return $table_name;
    }
    public static function is_connected()
    {
        $connected = @fsockopen("www.google.com", 80);
        //website, port  (try 80 or 443)
        if ($connected) {
            $is_conn = true; //action when connected
            // fclose($connected);
        } else {
            $is_conn = false; //action in connection failure
        }
        return $is_conn;
    }
    public static function toUpperCase($flat_array)
    {
        $ucase = array();
        foreach ($flat_array as $item) {
            $item = strtolower($item);
            $ucase[] = str_replace('_', ' ', ucwords($item));
        }
        return $ucase;
    }
    public static function number_to_alpha($num, $code)
    {
        $alphabets = array('', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

        $division = floor($num / 26);
        $remainder = $num % 26;

        if ($remainder == 0) {
            $division = $division - 1;
            $code .= 'Z';
        } else
            $code .= $alphabets[$remainder];

        if ($division > 26)
            return number_to_alpha($division, $code);
        else
            $code .= $alphabets[$division];

        return strrev($code);
    }
    public static function getfile_extension($fileName)
    {
        $fileName_arr = explode('.', $fileName);
        //count taken (if more than one . exist; files like abc.fff.2013.pdf
        $file_ext_count = count($fileName_arr);
        //minus 1 to make the offset correct
        $cnt = $file_ext_count - 1;
        // the variable will have a value pdf as per the sample file name mentioned above.
        $ext = $fileName_arr[$cnt];
        return $ext;
    }

    public static function formatMoney($money)
    {
        if ($money == '' || $money == 0) {
            $money = '00';
        }
        return is_numeric($money) ? number_format((round($money)), 2, '.', ',') : round($money);
    }

    public static function converter1($date)
    {
        $date = str_replace('/', '-', $date);
        $dateConverted = date('Y-m-d H:i:s', strtotime($date));
        return $dateConverted;
    }

    public static function converter2($date)
    {
        $date = date_create($date);
        $dateConverted = date_format($date, "d/m/Y H:i:s");
        return $dateConverted;
    }

    public static function converter11($date)
    {
        $date = str_replace('/', '-', $date);
        $dateConverted = date('Y-m-d', strtotime($date));
        return $dateConverted;
    }

    public static function converter22($date)
    {
        $date = date_create($date);
        $dateConverted = date_format($date, "d/m/Y");
        return $dateConverted;
    }

    public static function json_output($data = array(), $content_type = 'json')
    {

        if ($content_type == 'html') {
            header('Content-Type: text/html; charset=utf-8');
        } else {
            header('Content-type: text/plain');
        }

        $data = utf8ize($data);
        echo json_encode($data);

    }

    public static function utf8ize($d)
    {
        if (is_array($d))
            foreach ($d as $k => $v)
                $d[$k] = utf8ize($v);
        else if (is_object($d))
            foreach ($d as $k => $v)
                $d->$k = utf8ize($v);
        else
            return utf8_encode($d);

        return $d;
    }

    public static function formatDate($date)
    {
        if ($date == '0000-00-00 00:00:00' || $date == '0000-00-00' || strstr($date, '1970-00') != false || strstr($date, '1970') != false) {
            return '';
        } else {
            return ($date == '' or $date == null) ? '0000-00-00' : date('Y-m-d', strtotime($date));
        }
    }

    public static function formatDaterpt($date)
    {
        if ($date == '0000-00-00 00:00:00' || $date == '0000-00-00' || strstr($date, '1970-00') != false || strstr($date, '1970') != false) {
            return '';
        } else {
            return ($date == '' or $date == null) ? '' : date('d-m-Y', strtotime($date));
        }
    }

    public static function returnUniqueArray($arr, $key)
    {
        $uniquekeys = array();
        $output = array();
        foreach ($arr as $item) {
            if (!in_array($item[$key], $uniquekeys)) {
                $uniquekeys[] = $item[$key];
                $output[] = $item;
            }
        }
        return $output;
    }

    public static function convert_number_to_words($number)
    {

        $hyphen = '-';
        $conjunction = ' and ';
        $separator = ', ';
        $negative = 'negative ';
        $decimal = ' point ';
        $dictionary = array(
            0 => 'zero',
            1 => 'one',
            2 => 'two',
            3 => 'three',
            4 => 'four',
            5 => 'five',
            6 => 'six',
            7 => 'seven',
            8 => 'eight',
            9 => 'nine',
            10 => 'ten',
            11 => 'eleven',
            12 => 'twelve',
            13 => 'thirteen',
            14 => 'fourteen',
            15 => 'fifteen',
            16 => 'sixteen',
            17 => 'seventeen',
            18 => 'eighteen',
            19 => 'nineteen',
            20 => 'twenty',
            30 => 'thirty',
            40 => 'fourty',
            50 => 'fifty',
            60 => 'sixty',
            70 => 'seventy',
            80 => 'eighty',
            90 => 'ninety',
            100 => 'hundred',
            1000 => 'thousand',
            1000000 => 'million',
            1000000000 => 'billion',
            1000000000000 => 'trillion',
            1000000000000000 => 'quadrillion',
            1000000000000000000 => 'quintillion'
        );

        if (!is_numeric($number)) {
            return false;
        }

        if (($number >= 0 && (int) $number < 0) || (int) $number < 0 - PHP_INT_MAX) {
            // overflow
            trigger_error(
                'convert_number_to_words only accepts numbers between -' . PHP_INT_MAX . ' and ' . PHP_INT_MAX,
                E_USER_WARNING
            );
            return false;
        }

        if ($number < 0) {
            return $negative . self::convert_number_to_words(abs($number));
        }

        $string = $fraction = null;

        if (strpos($number, '.') !== false) {
            list($number, $fraction) = explode('.', $number);
        }

        switch (true) {
            case $number < 21:
                $string = $dictionary[$number];
                break;
            case $number < 100:
                $tens = ((int) ($number / 10)) * 10;
                $units = $number % 10;
                $string = $dictionary[$tens];
                if ($units) {
                    $string .= $hyphen . $dictionary[$units];
                }
                break;
            case $number < 1000:
                $hundreds = (int) ($number / 100);
                $remainder = $number % 100;
                $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
                if ($remainder) {
                    $rem = self::convert_number_to_words($remainder);
                    $string .= $conjunction . $rem;
                }
                break;
            default:
                $baseUnit = pow(1000, floor(log($number, 1000)));
                $numBaseUnits = (int) ($number / $baseUnit);
                $remainder = $number % $baseUnit;
                $num = self::convert_number_to_words($numBaseUnits);
                $string = $num . ' ' . $dictionary[$baseUnit];
                if ($remainder) {
                    $string .= $remainder < 100 ? $conjunction : $separator;
                    $rem = self::convert_number_to_words($remainder);
                    $string .= $rem;
                }
                break;
        }

        if (null !== $fraction && is_numeric($fraction)) {
            $string .= $decimal;
            $words = array();
            foreach (str_split((string) $fraction) as $number) {
                $words[] = $dictionary[$number];
            }
            $string .= implode(' ', $words);
        }

        return $string;
    }

    public static function generateRefNumber($codes_array, $ref_id)
    {
        $serial_format = DB::table('refnumbers_formats')
            ->where('id', $ref_id)
            ->value('ref_format');
        $arr = explode("|", $serial_format);
        $serial_variables = $serial_format = DB::table('refnumbers_variables')
            ->select('identifier')
            ->get();
        $serial_variables = convertStdClassObjToArray($serial_variables);
        $serial_variables = convertAssArrayToSimpleArray($serial_variables, 'identifier');
        $ref = '';
        foreach ($arr as $code) {
            if (in_array($code, $serial_variables)) {
                isset($codes_array[$code]) ? $code = $codes_array[$code] : '';
            }
            $ref = $ref . $code;
        }
        return $ref;
    }

    public static function unsetArrayData($postData, $unsetData)
    {
        foreach ($unsetData as $unsetDatum) {
            unset($postData[$unsetDatum]);
        }
        return $postData;
    }

    public static function formatBytes($size, $precision)
    {
        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');
            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        } else {
            return $size;
        }
    }
    public static function getPermitSignatory()
    {
        $qry = DB::table('authority_directors')
            ->where('is_active', 1);
        $signatory = $qry->value('director_id');
        return $signatory;
    }

    public static function getPermitSignatorySignature()
    {
        $signatory = self::getPermitSignatory();
        $signature = DB::table('tra_users_signature_uploads')
            ->where('user_id', $signatory)
            ->value('savedname');
        return $signature;
    }

    public static function funcReportGenerationLog($table_data, $user_id)
    {

        insertRecord('registration_certificate_logs', $table_data, $user_id);
    }


    public static function updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id)
    {
        try {

            $update = array(
                'isread' => 1,
                'isdone' => 1,
                'date_released' => Carbon::now(),
                'altered_by' => $user_id,
                'released_by' => $user_id,
                'isComplete' => 1
            );
            DB::table('tra_submissions')
                ->where('application_code', $application_code)
                ->where('current_stage', $from_stage)
                ->where('isdone', 0)
                ->update($update);
            $res = array(
                'success' => true,
                'message' => 'Update successful!!'
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


    public static function updateInTrayReading($application_id, $application_code, $current_stage, $user_id)
    {
        try {
            DB::table('tra_submissions')
                //->where('application_id', $application_id)
                ->where('application_code', $application_code)
                ->where('current_stage', $current_stage)
                //->where('usr_to', $user_id)
                ->update(array('isread' => 1));
            $res = array(
                'success' => true,
                'message' => 'Update successful!!'
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

    public static function uploadFile($req, $params, $table_name, $folder, $user_id)
    {
        try {
            $res = array();
            if ($req->hasFile('uploaded_doc')) {
                $file = $req->file('uploaded_doc');
                $origFileName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileSize = $file->getClientSize();
                //$folder = '\resources\uploads';
                $destination = getcwd() . $folder;
                $savedName = str_random(5) . time() . '.' . $extension;
                $file->move($destination, $savedName);
                $params['initial_filename'] = $origFileName;
                $params['savedname'] = $savedName;
                $params['filesize'] = formatBytes($fileSize);
                $params['filetype'] = $extension;
                $params['server_filepath'] = $destination;
                $params['server_folder'] = $folder;
                $params['created_on'] = Carbon::now();
                $params['created_by'] = $user_id;
                $res = insertRecord($table_name, $params, $user_id);
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
        return $res;
    }


    public static function validateIsNumeric($value)
    {
        if (is_numeric($value) && $value > 0) {
            return true;
        } else {
            return false;
        }

    }


    public static function getTableName($module, $portal_db = 0)
    {

        $qry = DB::table('modules')
            ->where('id', $module)->first();

        if ($portal_db) {
            $table = $qry->portaltable_name;
        } else {
            $table = $qry->table_name;
        }

        return $table;
    }



    public static function returnMessage($results)
    {
        return count(convertStdClassObjToArray($results)) . ' records fetched!!';
    }

    public static function returnParamFromArray($dataArray, $dataValue)
    {
        $dataPrint = array_filter($dataArray, function ($var) use ($dataValue) {
            return ($var['id'] == $dataValue);
        });
        $data = array();
        foreach ($dataPrint as $rec) {
            $data = array(
                'name' => $rec['name'],
                'id' => $rec['id']
            );
        }
        if (!empty($data)) {
            return $data['name'];
        } else {
            return '';
        }

    }


    public static function generateApplicationViewID()
    {
        $view_id = 'tfda' . str_random(10) . date('s');
        return $view_id;
    }

    public static function getFinancial_year()
    {
        $current_year = date('y');
        //returns year in four digits 2015
        $current_month = date('m');
        //returns year in four digits 15
        $financial_year = '';
        if ($current_month > 6) {
            $financial_year = $current_year . '' . ($current_year + 1);
        } else if ($current_month <= 6) {
            $financial_year = ($current_year - 1) . '' . $current_year;
        }
        return $financial_year;
    }

    public static function validateEmail($email_address){
		$email_address = preg_replace('/\s+/', '', $email_address);
		// Check the formatting is correct
		if(filter_var($email_address, FILTER_VALIDATE_EMAIL) === false){
			$email_address = '';
		}
		return $email_address;
		
    }

    public static function validatePhoneNo($telephone)
    {
        //remove white spaces
        $telephone = preg_replace('/\s+/', '', $telephone);
        $tel_value = '';
        $telephone = trim($telephone);
        //echo $telephone;
        $firstCharacter = substr($telephone, 0, 1);
        $tel_value = '';
        if ($firstCharacter == '0') {
            //check the string size
            if (strlen($telephone) == 10) {

                $tel_value = $telephone;
            }

        } else if ($firstCharacter == '+') {

            $telephone = ltrim($telephone, '+');
            if (strlen($telephone) == 12) {

                $tel_value = $telephone;
            }

        }

        return $tel_value;

    }
    public static function returnContextMenuActions($process_id)
    {
        //return records
        $records = DB::table('wf_workflowstatuses_actions as t1')
            ->select('t2.*', 't1.workflow_status_id as appworkflow_status_id', 't2.name as text', 't2.iconCls as icon')
            ->join('wf_statuses_actions as t2', 't1.statuses_action_id', '=', 't2.id')
            ->where('t1.process_id', $process_id)
            ->get();
        return convertStdClassObjToArray($records);
    }
    public static function returnContxtMenuActions()
    {
        //return records
        $records = DB::table('wf_workflowstatuses_actions as t1')
            ->select('t2.*', 't1.workflow_status_id as appworkflow_status_id', 't2.name as text', 't2.iconCls as icon')
            ->join('wf_statuses_actions as t2', 't1.statuses_action_id', '=', 't2.id')
            ->get();
        return convertStdClassObjToArray($records);
    }
    public static function returnActionColumn($appworkflow_status_id, $actionColumnData)
    {
        $data = array();

        $filterBy = $appworkflow_status_id; // or Finance etc.

        $dataPrint = array_filter($actionColumnData, function ($var) use ($filterBy) {
            return ($var['appworkflow_status_id'] == $filterBy);
        });

        foreach ($dataPrint as $rec) {
            $data[] = array(
                'text' => $rec['text'],
                'icon' => $rec['icon'],
                'action' => $rec['action'],
                'appworkflow_status_id' => $rec['appworkflow_status_id']
            );
        }

        $action_data = array(
            'items' => array(
                "text" => 'Action',
                "icon" => "menu",
                "items" => $data,
                "items2" => $dataPrint
            )
        );

        return $action_data;
    }
    public static function generateUserRegistrationNo($table_name)
    {
        $identification_no = mt_rand(1000, 99999);

        $where = array('identification_no' => $identification_no);
        $check = recordExists($table_name, $where);
        if ($check) {
            return generateUserRegistrationNo($table_name);
        } else {
            return $identification_no;
        }
    }

    public static function generateAppReferenceNo($process_id, $table_name, $user_id)
    {
        $app_reference_no = '';
        //generate the reference no 
        $process_data = getSingleRecord('wf_processes', array('id'=>$process_id));
        $process_code = $process_data->code;
        $system_code = env('SYS_ACRONYM', 'ECRES');

        $year_code = date('Y');
        $where = array('process_id' => $process_id, 'year_code' => $year_code);

        $rec = DB::table('sys_refnumbers_serials')->where($where)->first();
        if ($rec) {
            $serial_number = $rec->serial_number + 1;
            $data_update = array(
                'process_id' => $process_id,
                'year_code' => $year_code,
                'serial_number' => $serial_number,
                'altered_by' => $user_id,
                'dola' => Carbon::now()
            );

            DB::table('sys_refnumbers_serials')
                ->where($where)
                ->update($data_update);
        } else {
            $serial_number = 1;
            $data_insert = array(
                'process_id' => $process_id,
                'year_code' => $year_code,
                'serial_number' => $serial_number,
                'created_by' => $user_id,
                'created_on' => Carbon::now()
            );
            DB::table('sys_refnumbers_serials')->insert($data_insert);

        }
        //format the Reference no 
        $serial_no = str_pad($serial_number, 4, 0, STR_PAD_LEFT);
        $app_reference_no = $system_code.'-00'.$year_code.'/'.$process_code.'/'.$serial_no;

        $where = array('app_reference_no' => $app_reference_no);
        $check = recordExists($table_name, $where);
        if ($check) {
            return self::generateAppReferenceNo($process_id, $table_name,$user_id);
        } else {
            return $app_reference_no;
        }
        
    }

    public static function generateReferenceNo($table_name)
    {
        $eoi_reference_no = mt_rand(1000, 99999);

        $where = array('eoi_reference_no' => $eoi_reference_no);
        $check = recordExists($table_name, $where);
        if ($check) {
            return generateUserRegistrationNo($table_name);
        } else {
            return $eoi_reference_no;
        }
    }
    public  static function generateApplicationCode($process_id, $table_name)
    {
        $last_id = 01;
        $max_details = DB::table($table_name)
            ->select(DB::raw("MAX(id) as last_id"))
            ->first();
        if (!is_null($max_details)) {
            $last_id = $max_details->last_id + 1;
        }
        $application_code = '103' . $process_id . $last_id;
        return $application_code;
    }
   

    public static function getGenericResponsewithRercId($resp)
    {
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

        return $res;

    }
    public static function getInitialWorkflowStatusId($process_id){
        $record = null;
        if(validateIsNumeric($process_id)){
                $record = DB::table('wf_workflow_transitions as t1')
                            ->join('wf_workflow_stages as t2', 't1.prevworkflow_stage_id', 't2.id')
                            ->leftJoin('wf_workflow_definition as t3', 't1.workflow_id', '=', 't3.id')
                            ->select('t1.*', 't1.workflow_status_id as appworkflow_status_id')
                            ->where(array('t3.process_id'=>$process_id, 't2.stage_status_id'=>1))
                            ->first();
                
        }
        return $record;

    }
    public  static function initiateInitialProcessSubmission($table_name, $application_code, $process_id, $user_id)
    {
        $res = '';
        $rec = DB::table('wf_workflow_transitions as t1')
            ->leftJoin('wf_workflow_stages as t2', 't1.prevworkflow_stage_id', '=', 't2.id')
            ->leftJoin('wf_workflow_definition as t3', 't1.workflow_id', '=', 't3.id')
            ->select('t3.process_id', 't1.prevworkflow_stage_id', 'nextworkflow_stage_id', 'workflow_status_id')
            ->where(array('t3.process_id' => $process_id, 't2.stage_status_id' => 1))
            ->first();

        if ($rec) {

            $submission_data = array(
                'application_code' => $application_code,
                'current_stage_id' => $rec->prevworkflow_stage_id,
                'previous_stage_id' => $rec->prevworkflow_stage_id,
                'appworkflow_status_id' => $rec->workflow_status_id,
                'process_id' => $rec->process_id,
                'previous_user_id' => 0,
                'current_user_id' => $user_id,
                'isdone' => 0,
                'isread' => 0,
                'date_received' => Carbon::now()
            );
            $submission_data['created_on'] = Carbon::now();
            $res = insertRecord('tra_applicationprocess_submissions', $submission_data);

        }

        return $res;
    }
    public  static function getDateDifference($date1, $date2) {
        $carbonDate1 = Carbon::parse($date1);
        $carbonDate2 = Carbon::parse($date2);
    
        // Calculate the difference
        $diff = $carbonDate1->diff($carbonDate2);
        return $diff->d;
    }
    public  static function funcUpdateCurrentSubmission($application_code, $prevworkflow_stage_id, $user_id)
    {
        //check f the record exists 
        $where = array('application_code' => $application_code, 'previous_stage_id' => $prevworkflow_stage_id, 'isdone' => 0);
        $record = DB::table('tra_applicationprocess_submissions')
            ->where(array('application_code' => $application_code, 'previous_stage_id' => $prevworkflow_stage_id, 'isdone' => 0))
            ->first();
        if ($record) {
            $data_update = array(
                'current_user_id' => $user_id,
                'released_by' => $user_id,
                'isdone' => 1,
                'isread' => 1,
                'dola' => Carbon::now(),
                'date_released' => Carbon::now()
            );
            DB::table('tra_applicationprocess_submissions')
                ->where($where)
                ->update($data_update);
        }


    }
}