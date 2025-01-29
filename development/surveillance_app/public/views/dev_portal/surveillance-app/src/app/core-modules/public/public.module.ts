import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './views/layout/public-layout/public-layout.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { NavigationComponent } from './views/layout/navigation/navigation.component';
import { CenterPageComponent } from './views/layout/center-page/center-page.component';
import { TopSectionComponent } from './views/layout/top-section/top-section.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DxActionSheetModule, DxGalleryModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxProgressBarModule, DxLoadPanelModule, DxValidatorModule, DxToolbarModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AppsignInComponent } from './views/appsign-in/appsign-in.component';
import { AppsignUpComponent } from './views/appsign-up/appsign-up.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './views/home-page/home-page.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg'
import { SystemguudelinesDetailsComponent } from 'src/app/shared-views/utilitiescomponents/systemguudelines-details/systemguudelines-details.component';
import { SystemmanualPageComponent } from 'src/app/shared-views/utilitiescomponents/systemmanual-page/systemmanual-page.component';
import { PublicRoutingModule } from './publicrouting.module';

@NgModule({
  declarations: [TopSectionComponent,
    PublicLayoutComponent, AppsignInComponent,
    FooterComponent, SystemguudelinesDetailsComponent,
    NavigationComponent, HomePageComponent,
    CenterPageComponent,

    SystemmanualPageComponent, 
    AppsignUpComponent,
  ],
  imports: [
    CommonModule, NgHttpLoaderModule, PublicRoutingModule, DxButtonModule, DxProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule,
    DxTextBoxModule,
    DxDateBoxModule, DxDataGridModule,
    HttpClientModule, DxValidatorModule,
    NgxIntlTelInputModule,DxToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DxDataGridModule,
    DxPopupModule, DxGalleryModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxScrollViewModule, DxTabPanelModule,
    DxHtmlEditorModule,
    DxDropDownBoxModule, DxTagBoxModule,
    DxRadioGroupModule
  ],
  exports: [
    PublicRoutingModule,
    PublicLayoutComponent, FormsModule,
    ReactiveFormsModule,
    TopSectionComponent,
    FooterComponent,
    NavigationComponent
  ]
})
export class PublicModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
