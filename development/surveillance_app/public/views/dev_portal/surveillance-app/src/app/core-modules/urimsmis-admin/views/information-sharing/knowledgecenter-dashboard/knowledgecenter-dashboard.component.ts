import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { TranslateService } from '@ngx-translate/core';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-knowledgecenter-dashboard',
  templateUrl: './knowledgecenter-dashboard.component.html',
  styleUrl: './knowledgecenter-dashboard.component.css'
})
export class KnowledgecenterDashboardComponent {
  dashboard_title:string ='E-CRES Knowledge Center Management';
  dashboard_type_id: number = 2;
  systems_functionality_id: number;
  process_id = 15;
  ecredResourceCounter:number;
  knowledgeCenterCounter:number;
  openExpertsPublications:number;
  show_advancesearch: boolean;
  rejected_archived: number = 0;
  released_published: number = 0;
  pending_approval: number = 0;
  pending_submissions: number = 0;
  queried_request: number = 0;
  statuseData: any;
  data_record: any;
  data_resp: any;
  knowledgeCenterData: any[] = [];
  loadingVisible: boolean;
  hasReadpermissions: boolean;
  spinnerMessage: string;
  publication_management_id: number;
  table_name: string;
  parameter_name: string;
  decryptedPayload:any;

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private infoService: InformationSharingService,
    private reportingAnalytics: ReportsService,
    public translate: TranslateService,
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'tra_knowledgecenter_management';
    this.parameter_name = "knowledge_center";
  }
  
  ngOnInit() {
    this.onLoadKnowledgeCenterData();
    this.funcFetchKnowledgeCenterCounter();
    this.onLoadEoiStatuseData()
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  funcFetchKnowledgeCenterCounter() {

    this.infoService.funcFetchKnowledgeCenterCounter()
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            let records = this.data_record.data;
            // this.dtPremisesApplicationData = data.data;
            for (let rec of records) {
              if (rec.appworkflow_status_id == 1) {
                this.pending_submissions = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 2) {
                this.pending_approval = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 3) {
                this.released_published = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 4) {
                this.rejected_archived = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 5) {
                this.queried_request = rec.statuses_counter;
              }
            }
          }

        },
        error => {
          
        });

  }
 getTranslation(key: string): string {
    let translation: string = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }

  onAdvanceProductRegistrySearch(e){
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

}

  onLoadEoiStatuseData() {

    var data_submit = {
      'table_name': 'wf_workflow_statuses'
    }
    this.infoService.onLoadInformationSharingConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.statuseData = this.data_record.data;
          }
        },
        error => {
          
        });

  }

  onLoadKnowledgeCenterData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onLoadKnowledgeCenterManagementData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.knowledgeCenterData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }


  funcRedirectToKnowledgeCenterManagement() {
    this.data_resp = {
      process_id: 15,
      app_refence_no: ''
    }
    this.infoService.setApplicationDetail(this.data_resp);
    this.router.navigate(['/admin-ecres/app-knowledge-centerinfo']);
    this.scrollToTop();
  }


  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
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
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#ce5a57';
      }
    }
  }

  funcInfActionClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_preview') {
      this.funcPreviewKnowledgeCenterInfo(data.data);
    }
  }

  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }
  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit_preview') {
      // this.is_readonly = true;

      this.funcPreviewKnowledgeCenterInfo(data);
    }
  }

  funcPreviewKnowledgeCenterInfo(data) {
    this.infoService.setApplicationDetail(data);
    this.router.navigate(['/admin-ecres/app-knowledge-centerinfo']);
    this.scrollToTop();
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }

  }
}



