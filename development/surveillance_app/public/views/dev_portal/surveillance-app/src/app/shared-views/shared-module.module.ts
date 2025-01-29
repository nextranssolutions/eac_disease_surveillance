import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompositeTranslateLoader } from '../composite-translate-loader';
import { DxActionSheetModule, DxButtonModule, DxChartModule, DxCheckBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxFormModule, DxMenuModule, DxNumberBoxModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxTabsModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxTreeListModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedFooterComponent } from './shared-footer/shared-footer.component';
import { SharedNavigationComponent } from './shared-navigation/shared-navigation.component';
import { SharedToppanelComponent } from './shared-toppanel/shared-toppanel.component';

@NgModule({
  declarations: [SharedFooterComponent, SharedNavigationComponent, SharedToppanelComponent],
  imports: [
    CommonModule,
        DxCheckBoxModule,
        DxFormModule,
        DxTabsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DxActionSheetModule,
        DxFileUploaderModule,
        DxNumberBoxModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxContextMenuModule,
        DxMenuModule,
        DxTextBoxModule,
        DxTreeListModule,
        DxDataGridModule,
        DxPopupModule,
        DxChartModule,
        DxButtonModule,
        DxDateBoxModule,
        DxRadioGroupModule,
        DxTagBoxModule,
        DxScrollViewModule,
        DxProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CompositeTranslateLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  exports:[SharedFooterComponent, SharedNavigationComponent, SharedToppanelComponent]
})
export class SharedModuleModule { }
