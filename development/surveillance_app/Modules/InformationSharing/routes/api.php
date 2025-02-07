<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\InformationSharing\App\Http\Controllers\InformationSharingController;

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

Route::middleware(['XssSanitizer', 'clear_cache_config', 'firewall.all'])->prefix('informationsharing')->group(function () {
   
    Route::post('onSaveResourceManagement', [InformationSharingController::class, 'onSaveResourceManagement']);
    Route::post('onFuncSaveKnowledgeCenterData', [InformationSharingController::class, 'onFuncSaveKnowledgeCenterData']);
    Route::post('onDeleteInfoSharingData', [InformationSharingController::class, 'onDeleteInfoSharingData']);
   
    Route::get('onloadapplicationWorkflowSubmissionCommetns', [InformationSharingController::class, 'onloadapplicationWorkflowSubmissionCommetns']);
    
    Route::post('onSavePandemicReportingInformation', [InformationSharingController::class, 'onSavePandemicReportingInformation']);
   
    Route::get('onGetdiseaseOutbreakReportingInfo', [InformationSharingController::class, 'onGetdiseaseOutbreakReportingInfo']);
    Route::get('onGetreportedDiseasesPandemicDetails', [InformationSharingController::class, 'onGetreportedDiseasesPandemicDetails']);
    Route::get('onGetreportingDiseasesPandemicDetails', [InformationSharingController::class, 'onGetreportingDiseasesPandemicDetails']);
    Route::get('onloadmyPreviousDataReportingReports', [InformationSharingController::class, 'onloadmyPreviousDataReportingReports']);
    Route::post('onFuncSaveDiseasePandemicDetails', [InformationSharingController::class, 'onFuncSaveDiseasePandemicDetails']);
    //graphs
    Route::get('onGetdiseasepandemicGraphInformation', [InformationSharingController::class, 'onGetdiseasepandemicGraphInformation']);
   
    
});


