<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 2/19/2019
 * Time: 2:43 PM
 */

namespace App\Helpers;

use App\Jobs\GenericSendEmailJob;
use App\Jobs\GenericAttachmentSendEmailJob;
use App\Jobs\GenericMultipleAttachmentsSendEmailJob;
use App\Mail\AccountActivation;
use App\Mail\GenericPlainMail;
use App\Mail\GenericAttachmentMail;
use App\Mail\GenericMultipleAttachmentsMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPassword;
use Illuminate\Support\Carbon;

class EmailHelper
{

    static function getEmailTemplateInfo($template_id, $vars)
    {
       
        $template_info = DB::table('ntf_email_templates')
            ->where('id', $template_id)
            ->first();
            
        if (is_null($template_info)) {
            $template_info = (object)array(
                'subject' => 'Error',
                'body' => 'Sorry this email was delivered wrongly, kindly ignore.'
            );
        }
        $template_info->subject = strtr($template_info->subject, $vars);
        $template_info->body = strtr($template_info->email_template, $vars);
        return $template_info;
    }

    static function sendMailNotification($to,$subject,$email_content,$cc,$bcc,$attachement,$attachement_name,$template_id, $vars){
		$from_email = env('MAIL_FROM_ADDRESS');
        if(validateIsNumeric($template_id)){
            $template_info = self::getEmailTemplateInfo($template_id, $vars);
            $subject = $template_info->subject;
            $email_content = $template_info->body;  
        }
        $trader_name = 'Dear Sir/Ms';
        
		$data = array(
			'subject' => $subject,
			'email_content' => $email_content,
			'from_email'=>$from_email,
			'to'=>$to,
			'title'=>$subject
		);
        //cleaning address
        $to = str_replace(' ', '', $to);
        $bcc = str_replace(' ', '', $bcc);
        $cc = str_replace(' ', '', $cc);
        //expode
		if($to != ''){
			$to = explode(';',$to);
		}
        if($bcc != ''){
			$bcc = explode(';',$bcc);
		}
        if($cc != ''){
			 $cc = explode(';',$cc);
		}

        //send mail
        try{
            Mail::send('emailnotification', $data, function($message)use ($to,$trader_name,$subject,$cc,$bcc,$attachement,$attachement_name) {
                if($bcc != ''){
                   $message->bcc($bcc, $trader_name)
                            ->subject($subject);
                }
               else if($cc){
                   $message->to($to, $trader_name)
                            ->cc($cc)
                           ->subject($subject);
                }
                else{
                    $message->to($to, $trader_name)
                            ->subject($subject);
                }
                if($attachement != ''){
                    $message->attach($attachement, [
                        'as'=> $attachement_name.'.pdf',
                        'mime' => 'application/pdf',
                   ]);
                }
              
   
            });
          $data = ['success' => true, 'message' => 'Email Sent successfully'];
       } catch (\Exception $e) {
         $data = ['success' => false, 'message' => 'Email submission failed: ' . $e->getMessage()];
       }
     
       return $data;
    }
 
    static function sendMailFromNotification($trader_name, $to,$subject,$email_content,$cc,$from){
        
        $from_email = $from;
        
        $data = array(
            'subject' => $subject,
            'email_content' => $email_content,
            'trader_name' => $trader_name,
            'from_email'=>$from_email,
            'to'=>$to,
            'title'=>$subject
        );
        //cleaning address
        if($cc!=''){
            $cc = str_replace(' ', '', $cc);
            //expode
            $cc = explode(',',$cc);
        }else{
            $cc = '';
        }
        //send mail
        try{
        Mail::send('emailnotification', $data, function($message)use ($to,$trader_name,$subject,$cc,$from_email) {
            if($cc!=''){
                $message->to($to, $trader_name)
                        ->cc($cc)
                        ->subject($subject);
            }
            else{
                $message->to($to, $trader_name)
                        ->subject($subject);
            }

        });

        $data = ['success' => true, 'message' => 'Email Sent successfully'];
    } catch (\Exception $e) {
      $data = ['success' => false, 'message' => 'Email submission failed: ' . $e->getMessage()];
    }
  
    return $data;
    }
}