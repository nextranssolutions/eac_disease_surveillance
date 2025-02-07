import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-submitted-diseaseoutbreak-rptdash',
  templateUrl: './submitted-diseaseoutbreak-rptdash.component.html',
  styleUrl: './submitted-diseaseoutbreak-rptdash.component.css'
})
export class SubmittedDiseaseoutbreakRptdashComponent {
  loadingVisible: boolean;
  show_advancesearch:boolean =false;
  spinnerMessage: string;
  diseaseOutbreakInfoData: any;
  data_record: any;
  diseasesPandemicInfoData: any;
  ReportingInfoForm: FormGroup;
  reportingStatuseData:any;
  diseaseOutbreakReportingInfo:any;
  table_name:string = 'txn_pandemic_reportinginformation';
  appworkflowstatus_category_id:number;
  pandemicDiseasesInformationData:any;
  constructor(
    private router: Router,
    public toastr: ToastrService,
    public configService: ConfigurationsService,
    private formBuilder: FormBuilder,
    private infoService: InformationSharingService,
    private reportingAnalytics: ReportsService,
    public translate: TranslateService,
  ) {

    this.onGetdiseaseOutbreakReportingInfo();
  }
  selectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    let pandemic_reportinginformation_id = e.currentSelectedRowKeys[0];

    this.onLoaddiseasesPandemicInfoData(pandemic_reportinginformation_id);
  }
  onLoaddiseasesPandemicInfoData(pandemic_reportinginformation_id = 0) {

    this.diseaseOutbreakInfoData = {};
    var data_submit = {
      'table_name': 'tra_diseasespandemics_information',
      'pandemic_reportinginformation_id': pandemic_reportinginformation_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onGetDiseasesPandemicInfoData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.diseasesPandemicInfoData = this.data_record.data;
            this.spinnerHide();
          }
        },
        error => {
          console.error('Error fetching stock levels products information data:', error);
          this.spinnerHide();
        });
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onExporting(e: DxDataGridTypes.ExportingEvent) {
    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }

  onCellPrepared(e) {

    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let appworkflow_status_id = e.data.appworkflow_status_id;

      if (appworkflow_status_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#57504d';

      } else if (appworkflow_status_id == 3) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#8bbd78';

      } else if (appworkflow_status_id == 2) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#78a5a3';
      } else if (appworkflow_status_id == 5) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#fdb100';
      } else if (appworkflow_status_id == 7) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#78a5a3';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#ce5a57';
      }
    }
    if (e.rowType === "data" && e.column.dataField === "publishing_status_id") {
      let publishing_status_id = e.data.publishing_status_id;

      if (publishing_status_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#57504d';

      } else if (publishing_status_id == 2) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#8bbd78';

      }
      else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#ce5a57';
      }
    }
  }

  onErrorCellPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "has_error") {
      let has_error = e.data.has_error;

      if (has_error) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#f54029';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#aad688';
      }
    }
    else if (e.rowType === "data" && e.column.dataField === "error_description") {
      let error_description = e.data.error_description;

      if (error_description) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#f54029';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#aad688';
      }
    }
  }

  singleActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }

  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }
  is_readonly:boolean;

  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit_record') {
    //  this.is_readonly = true;
     // this.funcEditData(data);
    } else if (action_btn === 'approve_record') {
     // this.is_readonly = true;
      //this.funcOnApprovaStockData(data, 2);
    } else if (action_btn === 'preview_record') {
      //this.is_readonly = true;
     // this.funcPreviewData(data);
    } else {
     // this.is_readonly = true;
    }
  }

onGetdiseaseOutbreakReportingInfo(appworkflow_status_id = 0) {
    this.spinnerShow('Loading...........');
    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id,
      'appworkflowstatus_category_id': this.appworkflowstatus_category_id
    };

    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onGetdiseaseOutbreakReportingInfo')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.diseaseOutbreakReportingInfo = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          console.error('Error fetching reporting information data:', error); // Log the error
          this.spinnerHide();
        }
      );
  }
onAdvancePandemicRegistrySearch(e){
  e.toolbarOptions.items.unshift({
    location: 'after',
    widget: 'dxCheckBox',
    options: {
      icon: 'select',
      text: 'Show Advanced Search',
      value: this.show_advancesearch,
      onValueChanged: this.onActivatetheAdvanceSearch.bind(this)
    }
  });
}

onActivatetheAdvanceSearch(e){

  this.show_advancesearch =  e.value;

} getTranslation(key: string): string {
  let translation: string = '';
  this.translate.get(key).subscribe((res: string) => {
    translation = res;
  });
  return translation;
}

is_onviewreported_diseases:boolean; 
onviewReportedpandemics(pandemic_reportinginformation_id = 0) {
    this.spinnerShow('Loading...........');
    this.pandemicDiseasesInformationData = {};
    var data_submit = {
      'table_name': 'txn_diseasespandemics_information',
      'pandemic_reportinginformation_id': pandemic_reportinginformation_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onGetreportedDiseasesPandemicDetails')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.pandemicDiseasesInformationData = this.data_record.data;
            this.is_onviewreported_diseases = true;
            this.spinnerHide();
          }
        },
        error => {
          console.error('Error fetching stock levels products information data:', error);
          this.spinnerHide();
        });
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  
}
