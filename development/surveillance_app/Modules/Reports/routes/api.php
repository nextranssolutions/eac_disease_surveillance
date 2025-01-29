<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Reports\App\Http\Controllers\ReportsController;

/*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
*/

Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('reports')->group(function () {
    Route::get('onPrintPerformanceEvaluationetails', [ReportsController::class, 'onPrintPerformanceEvaluationetails']);
	
    Route::get('onPrintEOIExpertsLetterOfAppointment', [ReportsController::class, 'onPrintEOIExpertsLetterOfAppointment']);
	
    
});
