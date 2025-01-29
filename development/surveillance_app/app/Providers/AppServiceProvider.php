<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use app\Localization\DatabaseLoader;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function boot()
    {
        $this->app->singleton('translation.loader', function ($app) {
            return new DatabaseLoader();
        });
    }

    /**
     * Bootstrap any application services.
     */

}
