import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from 'src/app/core-modules/public/views/layout/public-layout/public-layout.component';
import { AppsignInComponent } from 'src/app/core-modules/public/views/appsign-in/appsign-in.component';
import { AppsignUpComponent } from 'src/app/core-modules/public/views/appsign-up/appsign-up.component';

import { HomePageComponent } from 'src/app/core-modules/public/views/home-page/home-page.component';
import { SystemmanualPageComponent } from 'src/app/shared-views/utilitiescomponents/systemmanual-page/systemmanual-page.component';
const routes: Routes = [{
    path: '',
    component: PublicLayoutComponent,
    children: [{
      path: '',
      component: HomePageComponent
    }, {
      path: 'index',
      component: HomePageComponent
    }, {
      path: 'system-manual',
      component: SystemmanualPageComponent
    },{
      path: 'sign-up',
      component: AppsignUpComponent
    }, {
      path: 'sign-in',
      component: AppsignInComponent
    }, {
      path: 'sign-up',
      component: AppsignUpComponent
    }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }

