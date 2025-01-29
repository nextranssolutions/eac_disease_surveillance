<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\NotificationsManagement\App\Http\Controllers\NotificationsManagementController;

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
    Route::get('notificationsmanagement', fn (Request $request) => $request->user())->name('notificationsmanagement');
});

Route::middleware(['XssSanitizer', 'clear_cache_config', 'firewall.all'])->prefix('notificationmanagement')->group(function () {
    
    Route::post('onsaveNotificationProcesses', [NotificationsManagementController::class, 'onsaveNotificationProcesses']);
    Route::get('onLoadNotificationProcesses', [NotificationsManagementController::class, 'onLoadNotificationProcesses']);
});