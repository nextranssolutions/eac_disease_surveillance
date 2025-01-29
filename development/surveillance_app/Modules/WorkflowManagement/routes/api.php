<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\WorkflowManagement\App\Http\Controllers\WorkflowManagementController;

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

Route::middleware(['auth:sanctum'])->prefix('v1')->name('api.')->group(function () {
    Route::get('workflowmanagement', fn (Request $request) => $request->user())->name('workflowmanagement');
});




Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('workflow')->group(function () {
    Route::get('getUserNavigationItems', [WorkflowManagementController::class, 'getUserNavigationItems']);
    Route::get('getAllNavigationItems', [WorkflowManagementController::class, 'getAllNavigationItems']);
   
    Route::get('getWorkflowConfigs', [WorkflowManagementController::class, 'getWorkflowConfigs']);
    Route::get('getAppNavigationMenus', [WorkflowManagementController::class, 'getAppNavigationMenus']);
    Route::post('onsaveWorkflowConfigData', [WorkflowManagementController::class, 'onsaveWorkflowConfigData']);
    Route::post('onsaveNavigationItemsConfigData', [WorkflowManagementController::class, 'onsaveNavigationItemsConfigData']);
    Route::post('onDeleteWorkflowsDetails', [WorkflowManagementController::class, 'onDeleteWorkflowsDetails']);
    Route::get('onLoadworkflowStageData', [WorkflowManagementController::class, 'onLoadworkflowStageData']);
    Route::get('onLoadWorkflowData', [WorkflowManagementController::class, 'onLoadWorkflowData']);
    Route::get('onLoadWorkflowTransitionData', [WorkflowManagementController::class, 'onLoadWorkflowTransitionData']);
    Route::get('onLoadWorkflowStatusActions', [WorkflowManagementController::class, 'onLoadWorkflowStatusActions']);
    Route::post('onApplicationProcessSubmission', [WorkflowManagementController::class, 'onApplicationProcessSubmission']);
    Route::post('onSaveImageInformation', [WorkflowManagementController::class, 'onSaveImageInformation']);
     
    Route::get('getRegultoryFunctionUserAccess', [WorkflowManagementController::class, 'getRegultoryFunctionUserAccess']);
    Route::get('getAppWorkflowStages', [WorkflowManagementController::class, 'getAppWorkflowStages']);
    Route::get('getAppWorkflowTransitions', [WorkflowManagementController::class, 'getAppWorkflowTransitions']);
    Route::get('getPortalWorkflowConfigs', [WorkflowManagementController::class, 'getPortalWorkflowConfigs']);
    Route::get('getAppPortalWorkflowStages', [WorkflowManagementController::class, 'getAppPortalWorkflowStages']);
    Route::get('getAppProtalWorkflowTransitions', [WorkflowManagementController::class, 'getAppProtalWorkflowTransitions']);
    Route::post('onsavePortalWorkflowConfigData', [WorkflowManagementController::class, 'onsavePortalWorkflowConfigData']);
    Route::post('onDeletePortalWorkflowsDetails', [WorkflowManagementController::class, 'onDeletePortalWorkflowsDetails']);
    Route::post('onEnablePortalWorkflowDetails', [WorkflowManagementController::class, 'onEnablePortalWorkflowDetails']);

});
