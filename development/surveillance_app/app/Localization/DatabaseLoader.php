<?php
namespace App\Localization;

use Illuminate\Contracts\Translation\Loader;
use Illuminate\Support\Facades\DB;

class DatabaseLoader implements Loader
{
    public function load($locale, $group, $namespace = null)
    {
        
        $translations = DB::table('tra_translation_management')
            ->join('cfg_system_labels', 'tra_translation_management.system_label_id', '=', 'cfg_system_labels.id')
            ->join('cfg_system_languages', 'tra_translation_management.system_language_id', '=', 'cfg_system_languages.id')
            ->where('cfg_system_languages.code', $locale)
            ->where('cfg_system_labels.name', $group) // Assuming 'name' is the column for translation keys
            ->select('tra_translation_management.translation')
            ->get()
            ->pluck('translation')
            ->toArray();

        return $translations;
    }

    public function addJsonPath($path)
    {
        // Implement a basic version of addJsonPath() that does nothing
        // This method is not needed for database-driven localization
    }

    public function addNamespace($namespace, $hint)
    {
        // Not required for database-driven localization
    }

    public function namespaces()
    {
        // Not required for database-driven localization
        return [];
    }
}
