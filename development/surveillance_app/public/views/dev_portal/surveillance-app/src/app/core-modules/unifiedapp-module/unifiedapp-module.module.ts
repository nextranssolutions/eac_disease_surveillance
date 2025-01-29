import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnifiedappLayoutComponent } from './views/unifiedapp-layout/unifiedapp-layout.component';
import { UnifiedappDashboardComponent } from './views/unifiedapp-dashboard/unifiedapp-dashboard.component';
import { TopUnisectionComponent } from './views/unifiedapp-layout/top-unisection/top-unisection.component';
import { FooterUnisectionComponent } from './views/unifiedapp-layout/footer-unisection/footer-unisection.component';
import { UnifiedappNavigationComponent } from './views/unifiedapp-layout/unifiedapp-navigation/unifiedapp-navigation.component';
import { DxActionSheetModule, DxBulletModule, DxButtonModule, DxCalendarModule, DxChartModule, DxCheckBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxDiagramModule, DxDrawerModule, DxDropDownBoxModule, DxDropDownButtonModule, DxFileUploaderModule, DxFormModule, DxHtmlEditorModule, DxLoadPanelModule, DxMenuModule, DxNumberBoxModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxResponsiveBoxModule, DxScrollViewModule, DxSelectBoxModule, DxSwitchModule, DxTabPanelModule, DxTabsModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxTreeListModule, DxValidatorModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxoExportModule } from 'devextreme-angular/ui/nested';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { httpTranslateLoader } from '../public/public.module';
import { UnifiedappCalenderdetailsComponent } from './views/unifiedapp-layout/unifiedapp-calenderdetails/unifiedapp-calenderdetails.component';
import { UnifiedappUserprofileComponent } from './views/unifiedapp-layout/unifiedapp-userprofile/unifiedapp-userprofile.component';
import { UnifiedappRoutingModule } from './unifiedapp-routing.module';
@NgModule({
  declarations: [UnifiedappLayoutComponent,
      UnifiedappDashboardComponent,
        TopUnisectionComponent,UnifiedappCalenderdetailsComponent,
        FooterUnisectionComponent,UnifiedappNavigationComponent,UnifiedappUserprofileComponent],
 
  imports: [
      CommonModule, DxButtonModule, DxProgressBarModule,
      UnifiedappRoutingModule,
      FormsModule, DxToolbarModule, DxLoadPanelModule, DxValidatorModule,
      ReactiveFormsModule, DxDropDownButtonModule,
      NgHttpLoaderModule, DxTreeListModule, 
      DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
      DxTabPanelModule, DxFormModule, DxScrollViewModule, DxChartModule,
      DxSelectBoxModule, DxoExportModule, NgxSmartModalModule.forRoot(),
      DxValidatorModule, DxDrawerModule,
      DxCalendarModule, DxPopupModule, DxFileUploaderModule, DxNumberBoxModule, DxMenuModule, DxTagBoxModule,
      DxTabPanelModule, DxFileUploaderModule, DxNumberBoxModule,
      DxTextAreaModule, DxMenuModule, DxTagBoxModule, DxTabsModule,
      DxTabPanelModule, HttpClientModule, DxSwitchModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      }), DxDiagramModule,
      DxTextBoxModule, DxDateBoxModule, DxDropDownButtonModule, DxPopupModule, DxFileUploaderModule,
      DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule,
      DxContextMenuModule, DxMenuModule, DxScrollViewModule, DxTabPanelModule, DxHtmlEditorModule,
      DxDropDownBoxModule, DxTagBoxModule, DxRadioGroupModule, DxBulletModule, NgxIntlTelInputModule,
      DxActionSheetModule,
      DxResponsiveBoxModule],
})
export class UnifiedappModuleModule { }
