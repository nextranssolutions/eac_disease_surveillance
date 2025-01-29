<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\ReportsAndAnalytics\App\Http\Controllers\ReportsAndAnalyticsController;

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
    Route::get('reportsandanalytics', fn (Request $request) => $request->user())->name('reportsandanalytics');
});

Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('reportsanalytics')->group(function () {
   

});
