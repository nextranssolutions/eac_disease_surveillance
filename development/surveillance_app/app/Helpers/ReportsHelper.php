<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 7/24/2018
 * Time: 12:38 PM
 */

namespace App\Helpers;


use Illuminate\Support\Facades\DB;
use Jaspersoft\Client\Client;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Illuminate\Support\Carbon;

class ReportsHelper
{
    public $client = '';
    public $jasper_server_url = '';
    public $jasper_server_username = '';
    public $jasper_server_password = '';
  
    public function __construct()
    {
        
    }

   static function exportDatatoExcel($data, $heading, $filename){
        
  //data capture
        // $function=$req->function;
        // $response=$this->$function($req,1);
        // $data=$response['results'];
        // $heading=$response['heading'];
        $data_array = json_decode(json_encode($data), true);

//product application details
        $dataSpreadsheet = new Spreadsheet();
        $sheet = $dataSpreadsheet->getActiveSheet();
       // $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
        $cell=0;


        
//Main heading style
        $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];
          $styleHeaderArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ]
            ];

      if(isset($data_array[0])){
          $header=array_keys($data_array[0]);
          $length=count($header);
       }
       else{
          $data_array=array();
          $header=array();
          $length=1;
          $sheet->getCell('A2')->setValue("No data");
       }

       $size=count($data_array)+7;
    $header = str_replace("_"," ", $header);
               $header = array_map('ucwords', $header);
  //add sn column
       $sheet->insertNewColumnBefore('A', 1);

  //adding formats to header
       array_unshift($header,"S/N");
       $sheet->fromArray($header, null, "A7");

  //loop data while writting
       $sheet->fromArray( $data_array, null,  "B8");

  //add S/N counter 
       for($i=8; $i <= $size; $i++){
          $sheet->getCell('A'.$i)->setValue($i-7);
       }
        $length = $length+1; //add one for the new column added 
        $letter=self::number_to_alpha($length,"");
      
  //set cell text wrap true for all columns
        $cellRange = 'A7:'.$letter.''.$size;
        $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
        $sheet->getColumnDimension('A')->setAutoSize(true);

  //add heading title
        $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
			->setValue("uRIMS".$heading."\t\t printed on ".Carbon::now());
			

        $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
        $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);

      //format row headers 
       $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);

      //create file
       $writer = new Xlsx($dataSpreadsheet);
         

      $response =  new StreamedResponse(
          function () use ($writer) {
              $writer->save('php://output');
          }
      );
      $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->headers->set('Content-Disposition', 'attachment;filename='.$filename.'.xlsx');
      $response->headers->set('Cache-Control','max-age=0');


     return $response;
            }
   static function number_to_alpha($num,$code)
        {   
            $alphabets = array('', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

            $division = floor($num / 26);
            $remainder = $num % 26; 

            if($remainder == 0)
            {
                $division = $division - 1;
                $code .= 'Z';
            }
            else
                $code .= $alphabets[$remainder];

            if($division > 26)
                return number_to_alpha($division, $code);   
            else
                $code .= $alphabets[$division];     

            return strrev($code);
        }
}