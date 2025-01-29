<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
use GuzzleHttp\Client as Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\RequestOptions;
use GuzzleHttp\Exception\RequestException;
use \CurlFile;
use App\User;
use Illuminate\Http\Request;

class PaymentIntHelper
{

  
   static function funccheckPaymentREmittances(){
		$payment_remittance = 0;	
	   
	   
   }
   static function funccheckBatchPaymentRemittances(){
		
	   $payment_remittance = 0;
	   
   }
}