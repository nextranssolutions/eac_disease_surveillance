import { Component, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { TranslateService } from '@ngx-translate/core';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
@Component({
  selector: 'app-ecred-resourcedashboard',
  templateUrl: './ecred-resourcedashboard.component.html',
  styleUrl: './ecred-resourcedashboard.component.css'
})
export class EcredResourcedashboardComponent {
  dashboard_type_id: number = 2;
  systems_functionality_id: number;
  process_id = 14;
  dashboard_title: string = 'e-cres_resources_management';

  rejected_archived:number =0;
  publishedResources:number =0;
  queried_request:number =0;
  pending_submissions:number =0;
  released_published:number =0;
  pending_approval:number =0;
  resource_id: number;
  parameter_name: string;
  table_name: string;
  spinnerMessage: string;
  data_resp: any;
  data_record: any;
  statuseData: any;
  loadingVisible: boolean;
  show_advancesearch: boolean;
  hasReadpermissions: boolean;
  resourceManagementData: any[] = [];
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
    this.table_name = 'tra_resources_managementrepository';
    this.parameter_name = "e-cres_resources";
  }

  ngOnInit() {
    this.onLoadResourceManagementData();
    this.funcFetchResourcesCounter();
    this.onLoadEoiStatuseData()
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  funcFetchResourcesCounter() {

    this.infoService.funcFetchResourcesCounter()
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

  funcRedirectToResourcesManagement() {
    this.data_resp = {
      process_id: 14,
      app_refence_no: ''
    }
    this.infoService.setApplicationDetail(this.data_resp);
    this.router.navigate(['/admin-ecres/app-ecred-resources']);
    this.scrollToTop();
  }

  onLoadResourceManagementData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onLoadExpertsResourceManagement')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.resourceManagementData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
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
      this.funcEditResource(data.data);
    }
  }

  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }

  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit_preview') {
      // this.is_readonly = true;
      this.funcEditResource(data);
    }
  }

  funcEditResource(data) {
    this.infoService.setApplicationDetail(data);
    this.router.navigate(['./admin-ecres/app-ecred-resources']);
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
