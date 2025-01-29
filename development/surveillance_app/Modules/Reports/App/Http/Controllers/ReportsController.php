<?php

namespace Modules\Reports\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PDF;
use Carbon\Carbon;
use GrahamCampbell\ResultType\Success;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('reports::index');
    }

    /**
     * Show the form for creating a new resource.
     */

    public function onPrintEOIExpertsLetterOfAppointment(Request $req)
    {
        try {
            $expressionofinterests_application_id = $req->expressionofinterests_application_id;
            $expertsprofile_information_id = $req->expertsprofile_information_id;
            $expressionofint_evaluation_id = $req->expressionofint_evaluation_id;
            $logo = getcwd() . '/resources/images/org-logo.jpg';
            $table_name = 'tra_expressionofinterests_applications';
            $where_state = array(
                't4.expressionofinterests_application_id' => $expressionofinterests_application_id,
                't2.id' => $expertsprofile_information_id,
                't4.expressionofint_evaluation_id' => $expressionofint_evaluation_id
            );
            $sql = DB::table($table_name . ' as t1')
                ->join('exp_expertsprofile_information as t2', 't1.expertsprofile_information_id', 't2.id')
                ->join('eoi_general_information as t3', 't1.expressionofinterest_posting_id', 't3.id')
                ->select(
                    't6.*',
                    't3.*',
                    't2.*',
                    't1.*',
                    't4.evaluation_recommendation_id',
                    't4.evaluation_remarks',
                    't5.name as evaluation_recommendation',
                    't4.expressionofinterests_application_id',
                    't4.expressionofint_evaluation_id',
                    't4.evaluation_completion_date',
                    't2.id as expertsprofile_information_id',
                    't1.id as expressionofinterests_application_id',
                    't1.application_code',
                    't7.name as appointment_recommendation',
                    't1.expressionofinterest_posting_id',
                    't1.appworkflow_status_id',
                )
                ->leftJoin('tra_expertsexpressionapp_evaluationrecommendations as t4', 't1.id', 't4.expressionofinterests_application_id')
                ->leftJoin('par_evaluation_recommendations as t5', 't4.evaluation_recommendation_id', 't5.id')

                ->join('tra_expertappointment_recommendations as t6', 't1.id', 't6.expressionofinterests_application_id')
                ->leftJoin('par_appointments_recommendation as t7', 't6.appointment_recommendation_id', 't7.id')

            ;

            $rec = $sql->where($where_state)->first();
            if ($rec) {
                PDF::SetTitle('AFRICAN MEDICINES REGULATORY HARMONISATION (AMRH)');
                PDF::AddPage();
                PDF::setCellHeightRatio(1.8);
                PDF::SetFont('times', 'B', 13);
                PDF::Image($logo, 65, 12, 65, 15);
                PDF::MultiCell(0, 20, '', 0, '', '', 1);
                PDF::MultiCell(0, 8, 'AFRICAN MEDICINES REGULATORY HARMONISATION (AMRH)', 0, 'C', '', 1);
                PDF::MultiCell(0, 8, '.........................', 0, 'C', '', 1);

                PDF::MultiCell(0, 8, 'APPOINTMENT LETTER', 0, 'C', '', 1);
                PDF::SetFont('times', '', 11);
                PDF::MultiCell(0, 7, 'Date of Appoitment: ' . formatDaterpt($rec->date_of_appointment), 0, 'R', '', 1);
                PDF::SetFont('times', '', 11);

                PDF::Cell(0, 6, $rec->first_name . ' ' . $rec->other_names . ' ' . $rec->surname, 0, 1);
                PDF::Cell(0, 8, $rec->email_address, 0, 1);
                PDF::SetFont('times', 'B', 11);
                PDF::MultiCell(0, 7, strtoupper('RE: Appointment for the ' . $rec->eoi_title), 0, '', '', 1);
                PDF::SetFont('times', '', 11);
                PDF::Cell(0, 8, 'Dear ' . $rec->first_name . ' ' . $rec->other_names, 0, 1);
           
                PDF::MultiCell(0, 7, "Following the successful evaluation of your expression of interest in the assessment of medicinal products under the Continental Regulatory Experts Solution (E-CRES), we are pleased to formally appoint you as an expert for the assessment of medicinal products within the E-CRES framework.", 0, '', '', 1);
               
                PDF::SetFont('times', 'B', 11);
              
                PDF::Cell(0, 8, 'Terms of Appointment:', 0, 1);
                PDF::SetFont('times', '', 11);
               
                PDF::MultiCell(0, 7, "1. Role: You will serve as an Expert Evaluator for the assessment of the Evaluation of Medicinal Products submitted to the E-CRES system.", 0, '', '', 1);
                PDF::MultiCell(0, 7, "2. Responsibilities: Your responsibilities will include, but are not limited to, evaluating the quality, safety, and efficacy of medicinal products submitted for regulatory approval, providing detailed reports, and participating in any related discussions or meetings as required.", 0, '', '', 1);
                PDF::MultiCell(0, 7, "3. Remuneration: Compensation for your services will be as per the agreed terms in your contract. All payments will be processed through the Claims System.", 0, '', '', 1);
                PDF::MultiCell(0, 7, "4. Confidentiality: You are required to maintain the confidentiality of all information accessed through the E-CRES platform and adhere to the code of conduct as outlined in your terms of engagement.", 0, '', '', 1);
               
                PDF::SetFont('times', 'B', 11);

                PDF::Cell(0, 8, 'Next Steps:', 0, 1);
                PDF::SetFont('times', '', 11);
                PDF::MultiCell(0, 7, "Please confirm your acceptance of this appointment by logging into the E-CRES system and acknowledging this letter. We look forward to your valuable contribution to the evaluation process.", 0, '', '', 1);
                PDF::MultiCell(0, 7, "If you have any questions or require further information, please do not hesitate to contact us at................................", 0, '', '', 1);
               
                PDF::Cell(0, 8, 'We congratulate you on your appointment and wish you success in your role.', 0, 1);
                PDF::ln();
                PDF::Cell(0, 8, 'Sincerely,', 0, 1);
                PDF::Cell(0, 8, 'Secretariate,', 0, 1);

            }


            PDF::Output('Letter Of Appoitment.pdf');
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);



    }
    public function onPrintPerformanceEvaluationetails(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $expertsperformance_evaluation_id = $req->expertsperformance_evaluation_id;
            $process_id = $req->process_id;
            $logo = getcwd() . '/resources/images/org-logo.jpg';


            $table_name = 'tra_expertsperformance_evaluation';

            $sql = DB::table($table_name . ' as t1')
                ->join('exp_expertsprofile_information as t2', 't1.expertsprofile_information_id', 't2.id')
                ->leftJoin('par_experts_categories as t3', 't1.category_ofexpertise_id', 't3.id')
                ->leftJoin('par_timespan_definations as t4', 't1.period_serveddefination_id', 't4.id')

                ->select('t1.*', 't3.name as experts_category', 't4.name as period_serveddefination', 't2.country_of_origin_id', 't2.present_address', 't2.area_of_expertise_id', 't1.id as expertsperformance_evaluation_id', 't2.permanent_address', 't2.email_address', 't2.first_name', 't2.surname', 't2.other_names', 't2.nationality_id', 't2.experts_profile_no', 't2.coreregulatory_function_id', 't2.area_of_expertise_id', 't1.id as expertprofile_information_id');

            $sql->where(array('t1.id' => $expertsperformance_evaluation_id, 't1.application_code' => $application_code));

            $data = $sql->first();

            if ($data) {
                PDF::SetTitle('Regulatory Expert Performance Evaluation Form');
                PDF::AddPage('L');
                PDF::SetFont('times', 'B', 16);
                PDF::Image($logo, 12, 12, 65, 20);
                PDF::MultiCell(90, 25, '', 1, '', '', 0);
                PDF::MultiCell(90, 25, 'Regulatory Expert Performance Evaluation Form', 1, '', '', 0);
                PDF::MultiCell(0, 25, $data->app_reference_no, 1, '', '', 1);
                PDF::SetFont('times', 'B', 12);
                PDF::MultiCell(0, 10, 'Name of Expert: ' . aes_decrypt($data->surname) . ' ' . aes_decrypt($data->first_name) . ' ' . aes_decrypt($data->other_names), 1, '', '', 1);
                PDF::MultiCell(0, 10, 'Credentials:', 1, '', '', 1);

                PDF::MultiCell(90, 12, 'Category of Expertise: ' . $data->experts_category, 1, '', '', 0);
                PDF::MultiCell(90, 12, 'Date of Appointment ' . ($data->date_of_appointement), 1, '', '', 0);
                PDF::MultiCell(0, 12, 'Period served. ' . $data->period_served . ' ' . $data->period_serveddefination, 1, '', '', 1);

                PDF::Cell(0, 15, 'Date of Evaluation: ' . formatDaterpt($data->date_of_evaluation), 1, 1);

                PDF::SetFont('times', '', 12);
                PDF::MultiCell(15, 10, 'Note:', 1, '', '', 0);
                PDF::MultiCell(0, 10, 'The highest marks attained is 100% which will be calculated based on the average of the marks from each appraisor.', 1, '', '', 1);


                PDF::MultiCell(15, 10, '', 1, '', '', 0);
                PDF::MultiCell(0, 10, 'Each Appraiser should grade performance based on the marks allocated for each performance attribute.', 1, '', '', 1);

                PDF::MultiCell(15, 10, '', 1, '', '', 0);
                PDF::MultiCell(0, 10, 'An external expert is only eligible for eangagement if he/she scores higher than 80 %.', 1, '', '', 1);
                PDF::ln();
                PDF::SetFont('times', 'B', 12);
                PDF::MultiCell(10, 12, 'Sn', 1, '', '', 0);
                PDF::MultiCell(65, 12, 'Main Factor', 1, '', '', 0);
                PDF::MultiCell(65, 12, 'Performance Attribute', 1, '', '', 0);
                PDF::MultiCell(22, 12, 'Marks Allocated', 1, '', '', 0);
                PDF::MultiCell(22, 12, "Supervisor's Marks", 1, '', '', 0);
                PDF::MultiCell(22, 12, "2nd Appraisor ", 1, '', '', 0);
                PDF::MultiCell(22, 12, "3rd Appraisor ", 1, '', '', 0);
                PDF::MultiCell(22, 12, "Total Marks ", 1, '', '', 0);
                PDF::MultiCell(0, 12, "Avg. Score (%)", 1, '', '', 1);
                $sql = DB::table('chk_checklist_types as t1')
                    ->join('chk_checklist_definations as t2', 't1.id', 't2.checklist_type_id')
                    ->leftJoin('tra_performanceevaluation_details as t3', function ($join) use ($application_code, $expertsperformance_evaluation_id) {
                        $join->on('t3.checklist_defination_id', '=', 't2.id');
                        if (validateIsNumeric($application_code)) {
                            $join->on('t3.application_code', '=', DB::raw($application_code));
                        }
                        if (validateIsNumeric($expertsperformance_evaluation_id)) {
                            $join->on('t3.expertsperformance_evaluation_id', '=', DB::raw($expertsperformance_evaluation_id));
                        }
                    })
                    ->select(DB::raw("t3.*,t1.name as main_factor,t2.checklist_type_id, t2.id as checklist_defination_id, t2.name as performance_attribute, t2.marks_allocated,(supervisors_marks+second_appraisor_marks+third_appraisor_marks) as total_marks,(100* (supervisors_marks+second_appraisor_marks+third_appraisor_marks)/3)/t2.marks_allocated as percentage_average_score"));
                if (validateIsNumeric($process_id)) {
                    $sql->where('t1.process_id', $process_id);
                }
                $expertperformance_data = $sql->orderBy('t1.order_no', 'desc')->orderBy('t2.order_no', 'desc')->get();
                PDF::SetFont('times', '', 12);
                if ($expertperformance_data->count() > 0) {
                    $i = 1;
                    $main_factor_id = '';

                    foreach ($expertperformance_data as $rec) {
                        $rowcount = max(PDF::getNumLines($rec->main_factor, 55), PDF::getNumLines($rec->performance_attribute, 55));

                        if ($main_factor_id != $rec->checklist_type_id) {
                            PDF::MultiCell(10, 7 * $rowcount, $i, 1, '', '', 0);
                            PDF::MultiCell(65, 7 * $rowcount, $rec->main_factor, 1, '', '', 0);

                            $i++;
                        } else {
                            PDF::MultiCell(10, 7 * $rowcount, '', 1, '', '', 0);
                            PDF::MultiCell(65, 7 * $rowcount, '', 1, '', '', 0);
                        }

                        PDF::MultiCell(65, 7 * $rowcount, $rec->performance_attribute, 1, '', '', 0);
                        PDF::MultiCell(22, 7 * $rowcount, $rec->marks_allocated, 1, '', '', 0);
                        PDF::MultiCell(22, 7 * $rowcount, $rec->supervisors_marks, 1, '', '', 0);
                        PDF::MultiCell(22, 7 * $rowcount, $rec->second_appraisor_marks, 1, '', '', 0);
                        PDF::MultiCell(22, 7 * $rowcount, $rec->third_appraisor_marks, 1, '', '', 0);
                        PDF::MultiCell(22, 7 * $rowcount, $rec->total_marks, 1, '', '', 0);
                        if ($rec->percentage_average_score < 1) {
                            $percentage_average_score = $rec->percentage_average_score;

                        } else {
                            $percentage_average_score = round($rec->percentage_average_score, 2) . ' %';

                        }
                        PDF::MultiCell(0, 7 * $rowcount, $percentage_average_score, 1, '', '', 1);
                        $main_factor_id = $rec->checklist_type_id;

                    }

                }
                PDF::ln();
                PDF::SetFont('times', 'B', 12);
                PDF::MultiCell(0, 10, 'Name of Appraisors:', 1, '', '', 1);
                PDF::MultiCell(100, 10, 'Relevant TC leadership:', 1, '', '', 0);
                PDF::MultiCell(0, 10, 'Title:', 1, '', '', 1);

                PDF::MultiCell(100, 10, 'Appraisor 1:', 1, '', '', 0);
                PDF::MultiCell(0, 10, 'Title:', 1, '', '', 1);

                PDF::MultiCell(100, 10, 'Appraisor 2:', 1, '', '', 0);
                PDF::MultiCell(0, 10, 'Title:', 1, '', '', 1);

                PDF::SetFont('times', 'B', 10);

            }

            PDF::Output('Experts Performance Evaluation.pdf');
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1), explode('\\', __CLASS__));
        }

        return response()->json($res);



    }

}
