<?php

namespace Modules\LanguageManagement\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Localization\DatabaseLoader;
use Illuminate\Support\Facades\DB;
use Illuminate\Translation\Translator;

class LanguageManagementController extends Controller
{

    // public function getTranslations(Request $request, $locale)
    // {
    //     // Fetch translations from the database
    //     $translations = DB::table('tra_translation_management')
    //         ->join('cfg_system_labels', 'tra_translation_management.system_label_id', '=', 'cfg_system_labels.id')
    //         ->join('cfg_system_languages', 'tra_translation_management.system_language_id', '=', 'cfg_system_languages.id')
    //         ->where('cfg_system_languages.name', $locale)
    //         ->select('cfg_system_labels.name as key', 'tra_translation_management.translation as value')
    //         ->get();

    //     // Convert translations to associative array
    //     $translatedData = [];
    //     foreach ($translations as $translation) {
    //         $translatedData[$translation->key] = $translation->value;
    //     }

    //     return response()->json($translatedData);
    // }

    public function getTranslations(Request $request, $locale)
{
    // Fetch translations from the database
    $translations = DB::table('tra_translation_management')
        ->join('cfg_system_labels', 'tra_translation_management.system_label_id', '=', 'cfg_system_labels.id')
        ->join('cfg_system_languages', 'tra_translation_management.system_language_id', '=', 'cfg_system_languages.id')
        ->where('cfg_system_languages.name', $locale)
        ->select('cfg_system_labels.name as key', 'tra_translation_management.translation as value')
        ->get()
        ->pluck('value', 'key');

    return response()->json($translations);
}

}
