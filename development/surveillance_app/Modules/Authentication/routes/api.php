<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Authentication\App\Http\Controllers\AuthenticationController;


// Route::middleware(['auth:sanctum'])->prefix('v1')->name('api.')->group(function () {
//     Route::get('authentication', fn (Request $request) => $request->user())->name('authentication');
// });
Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('authentication')->group(function () {
    Route::post('onUserLogin', [AuthenticationController::class, 'onUserLogin']);
    
    Route::post('funcUserLogOut', [AuthenticationController::class, 'funcUserLogOut']);
    Route::post('request-password-reset', [AuthenticationController::class, 'requestParPasswordReset']);
    Route::post('reset-password', [AuthenticationController::class, 'resetPassword']);

    Route::get('onLoadUserCountryOfOriginCountData', [AuthenticationController::class, 'onLoadUserCountryOfOriginCountData']);
    
});

