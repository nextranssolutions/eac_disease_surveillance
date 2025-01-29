<?php
use Modules\DashboardManagement\App\Http\Controllers\DashboardManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    Route::get('dashboardmanagement', fn (Request $request) => $request->user())->name('dashboardmanagement');
});


Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('dashboardmanagement')->group(function () {
    
    Route::get('funcFetchPublicDetailsCounter', [DashboardManagementController::class, 'funcFetchPublicDetailsCounter']);
    Route::get('onLoadDashboardData', [DashboardManagementController::class, 'onLoadDashboardData']);
    Route::post('onsaveDashboardData', [DashboardManagementController::class, 'onsaveDashboardData']);
   
	Route::post('onDeleteDashboardData', [DashboardManagementController::class, 'onDeleteDashboardData']);
   
    Route::get('onGetAdminactiveTasksAsignmentsData', [DashboardManagementController::class, 'onGetAdminactiveTasksAsignmentsData']);
    Route::get('onGetAdminFinalisedTasksAsignmentsData', [DashboardManagementController::class, 'onGetAdminFinalisedTasksAsignmentsData']);
    Route::get('onLoadUserCompletedTasksDetails', [DashboardManagementController::class, 'onLoadUserCompletedTasksDetails']);
   
    
    Route::get('onLoadWorkflowData', [DashboardManagementController::class, 'onLoadWorkflowData']);
    
});
