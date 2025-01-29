import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-subscription-dash',
  templateUrl: './subscription-dash.component.html',
  styleUrl: './subscription-dash.component.css'
})
export class SubscriptionDashComponent {
  subscriptionItemData: any;
  publicationData: any;
  data_record: any;
  data_resp: any;
  config_record:any;
  subscriptionDashData: any[] = [];
  loadingVisible: boolean;
  hasReadpermissions: boolean;
  deletePopupVisible: boolean;
  show_advancesearch: boolean;
  spinnerMessage: string;
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
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'tra_subscription_registration';
    this.parameter_name = "subscriptions";
  }

  ngOnInit() {
    // this.onLoadExpertsPublicationManagementData()
    this.onloadSubscriptionFields();
    this.onloadPublicationInformation();
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  // funcFetchExpertPublicationsCounter() {

  //   this.infoService.funcFetchExpertPublicationsCounter()
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           let records = this.data_record.data;
  //           // this.dtPremisesApplicationData = data.data;
  //           for (let rec of records) {
  //             if (rec.appworkflow_status_id == 1) {
  //               this.openPublications = rec.statuses_counter;
  //             } if (rec.appworkflow_status_id == 2) {
  //               this.queriedPublications = rec.statuses_counter;
  //             } if (rec.appworkflow_status_id == 3) {
  //               this.requestforAdditionInfoPublications = rec.statuses_counter;
  //             } if (rec.appworkflow_status_id == 4) {
  //               this.publishedExpertsPublications = rec.statuses_counter;
  //             } if (rec.appworkflow_status_id == 5) {
  //               this.rejectedExpertsPublications = rec.statuses_counter;
  //             }
  //           }
  //         }

  //       },
  //       error => {
          
  //       });

  // }

  onloadSubscriptionFields() {

    var data_submit = {
      'table_name': 'par_publications_types'
    }
    this.infoService.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {
          
          this.data_record = data;
         
          if (this.data_record.success) {
            this.subscriptionItemData = this.data_record.data;
          }

        },
        error => {
          
        });

  }

  onloadPublicationInformation() {

    var data_submit = {
      'table_name': 'tra_publications_informations'
    }
    this.infoService.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {
          
          this.data_record = data;
         
          if (this.data_record.success) {
            this.publicationData = this.data_record.data;
          }

        },
        error => {
          
        });

  }
  // funcRedirectToPublicationManagement() {
  //   this.data_resp = {
  //     process_id: 17,
  //     app_refence_no: ''
  //   }
  //   this.infoService.setApplicationDetail(this.data_resp);
  //   this.router.navigate(['/admin-ecres/app-publicationrepo-management']);
  //   this.scrollToTop();
  // }

  onLoadSubscriptionData(appworkflow_status_id = 0) {
    // NEED TO ADD THE CONTROLLER FOR onLoadSubscriptionData IN THE BACKEND
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onLoadSubscriptionData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.subscriptionDashData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
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
        e.cellElement.style.backgroundColor = '#0000FF';

      } else if (appworkflow_status_id == 3) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else if (appworkflow_status_id == 2) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';
      } else if (appworkflow_status_id == 5) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FFFF8F';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#D3D3D3';
      }
    }
  }

  funcInfActionClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPreviewExpertCredentials(data.data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data.data);
    }
  }

  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }
  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit_record') {
      // this.is_readonly = true;

      this.funcPreviewExpertCredentials(data);
    } 
  }

  funcPreviewExpertCredentials(data) {
    this.infoService.setApplicationDetail(data);
    this.router.navigate(['./admin-ecres/app-publicationrepo-management']);
    this.scrollToTop();
  }


  funcDeleteDetails(data) {
    this.infoService.setApplicationDetail(data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
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


