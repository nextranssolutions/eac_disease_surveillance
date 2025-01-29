<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\AuditTrailManagement\App\Http\Controllers\AuditTrailManagementController;

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
    Route::get('audittrailmanagement', fn (Request $request) => $request->user())->name('audittrailmanagement');
});

Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('audittrailmanagement')->group(function () {
    Route::post('onsaveAuditTrailData', [AuditTrailManagementController::class, 'onsaveAuditTrailData']);
    Route::get('getAuditTrailInfo', [AuditTrailManagementController::class, 'getAuditTrailInfo']);
	Route::post('onDeleteAuditTrailInfo', [AuditTrailManagementController::class, 'onDeleteAuditTrailInfo']);
    
    Route::get('getAuditUserLogoutInfo', [AuditTrailManagementController::class, 'getAuditUserLogoutInfo']);
    Route::get('getUserPasswordChangeInfo', [AuditTrailManagementController::class, 'getUserPasswordChangeInfo']);
    Route::get('getAuditFailedLoginsInfo', [AuditTrailManagementController::class, 'getAuditFailedLoginsInfo']);
    Route::get('getUserMaliciousLoginsInfo', [AuditTrailManagementController::class, 'getUserMaliciousLoginsInfo']);
    Route::get('getUserAccessLogsInfo', [AuditTrailManagementController::class, 'getUserAccessLogsInfo']);
    Route::get('getUserPasswordRequestInfo', [AuditTrailManagementController::class, 'getUserPasswordRequestInfo']);

    Route::get('onGetAuditTrailPrevCurrentData', [AuditTrailManagementController::class, 'onGetAuditTrailPrevCurrentData']);
});
