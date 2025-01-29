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
    Route::get('onLoadExpertsPublicationManagement', [InformationSharingController::class, 'onLoadExpertsPublicationManagement']);
    Route::get('onLoadExpertsResourceManagement', [InformationSharingController::class, 'onLoadExpertsResourceManagement']);
    Route::get('onLoadInformationSharingConfig', [InformationSharingController::class, 'onLoadInformationSharingConfig']);
    Route::get('onLoadKnowledgeCenterManagementData', [InformationSharingController::class, 'onLoadKnowledgeCenterManagementData']);
    Route::get('funcFetchKnowledgeCenterCounter', [InformationSharingController::class, 'funcFetchKnowledgeCenterCounter']);
    Route::get('funcFetchExpertPublicationsCounter', [InformationSharingController::class, 'funcFetchExpertPublicationsCounter']);
    Route::get('funcFetchResourcesCounter', [InformationSharingController::class, 'funcFetchResourcesCounter']);

    Route::post('onSaveExpertsPublicationManagement', [InformationSharingController::class, 'onSaveExpertsPublicationManagement']);
    Route::post('onSaveResourceManagement', [InformationSharingController::class, 'onSaveResourceManagement']);
    Route::post('onFuncSaveKnowledgeCenterData', [InformationSharingController::class, 'onFuncSaveKnowledgeCenterData']);
    Route::post('onDeleteInfoSharingData', [InformationSharingController::class, 'onDeleteInfoSharingData']);
   
    Route::get('onloadapplicationWorkflowSubmissionCommetns', [InformationSharingController::class, 'onloadapplicationWorkflowSubmissionCommetns']);
    
});

