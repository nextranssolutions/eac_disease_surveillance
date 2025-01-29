<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\PublicInfoManagement\App\Http\Controllers\PublicInfoManagementController;

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
    Route::get('publicinfomanagement', fn (Request $request) => $request->user())->name('publicinfomanagement');
});


Route::middleware(['XssSanitizer','clear_cache_config','firewall.all'])->prefix('publicinfomanagement')->group(function () {
    Route::post('onSearchExpertsProfileInformation', [PublicInfoManagementController::class, 'onSearchExpertsProfileInformation']);
	Route::get('getSystemNavigationItems', [PublicInfoManagementController::class, 'getSystemNavigationItems']);
    Route::get('getOrganisationServices', [PublicInfoManagementController::class, 'getOrganisationServices']);

    Route::get('onLoadExpertsPublicationManagement', [PublicInfoManagementController::class, 'onLoadExpertsPublicationManagement']);
    Route::get('onLoadExpertsResourceManagement', [PublicInfoManagementController::class, 'onLoadExpertsResourceManagement']);
    Route::get('onLoadKnowledgeCenterManagementData', [PublicInfoManagementController::class, 'onLoadKnowledgeCenterManagementData']);
    Route::get('onLoadPublicInfoConfig', [PublicInfoManagementController::class, 'onLoadPublicInfoConfig']);
    Route::get('onLoadPublicApprovedExpressionofInterests', [PublicInfoManagementController::class, 'onLoadPublicApprovedExpressionofInterests']);
    Route::get('onLoadApprovedEOISummaryData', [PublicInfoManagementController::class, 'onLoadApprovedEOISummaryData']);
});
