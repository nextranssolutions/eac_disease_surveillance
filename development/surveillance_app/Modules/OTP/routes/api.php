<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\OTP\App\Http\Controllers\OTPController;

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
    Route::get('otp', fn (Request $request) => $request->user())->name('otp');
});

Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('otp')->group(function () {
    Route::post('requestOtp', [OTPController::class, 'requestOtp']);
    
    Route::post('requestLoginOtp', [OTPController::class, 'requestLoginOtp']);
    
});