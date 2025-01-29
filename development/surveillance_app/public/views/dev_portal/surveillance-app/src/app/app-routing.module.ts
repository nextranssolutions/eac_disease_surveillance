
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: 'public', loadChildren: () => import('./core-modules/public/public.module').then(m => m.PublicModule) },
  { path: 'unified-dashboard', loadChildren: () => import('./core-modules/unifiedapp-module/unifiedapp-module.module').then(m => m.UnifiedappModuleModule) },
  { path: 'admin-mis', loadChildren: () => import('./core-modules/urimsmis-admin/urimsmis-admin.module').then(m => m.UrimsmisAdminModule) },
  { path: 'admin-mis/app-dashboard', loadChildren: () => import('./core-modules/urimsmis-admin/urimsmis-admin.module').then(m => m.UrimsmisAdminModule) },
  { path: 'reports-analytics', loadChildren: () => import('./regulatory_modules/reports-analytics/reports-analytics.module').then(m => m.ReportsAnalyticsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
