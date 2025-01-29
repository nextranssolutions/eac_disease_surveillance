import { Component, HostListener, Input, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DashbordManagementService } from 'src/app/core-services/dashboard-management/dashbord-management.service';
import { ExpertsprofileserviceService } from 'src/app/core-services/expertprofile/expertsprofileservice.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-experts-publicationsmanagament',
  templateUrl: './experts-publicationsmanagament.component.html',
  styleUrl: './experts-publicationsmanagament.component.css'
})
export class ExpertsPublicationsmanagamentComponent {

  @Input() application_code: number;
  @Input() process_id: number;
  @Input() document_type_id: number;
  @Input() appworkflow_status_id: number;
  @Input() is_readonly: boolean;
  dashboard_title:string ='expert_publication';
  rejectedExpertsPublications:number =0;
  publishedExpertsPublications:number =0;
  requestforAdditionInfoPublications:number =0;
  openPublications:number =0;
  iconPosition: any = "top";
  data_record: any;
  show_advancesearch: boolean;
  response: any;
  publication_data: any;
  app_reference_no: string;
  publicationManagementData: any[] = [];
  loadingVisible: boolean;
  spinnerMessage: string;
  publication_management_id: number;
  table_name: string;
  selectedTabIndex = 0;
  isShowAppProcessSubmission:boolean;
  is_expert_publication: boolean;
  isExpertsSelectionWin: boolean;
  isExpertsprofileInforamtionWin: boolean;
  expertsprofileInformatioData: any;
  confirmationData:any;
  registeredExpertsAccountsData: any;
  publicationManagementForm: FormGroup;
  dashboard_url:string ="/admin-ecres/app-publication-dashboard";

  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: number;
  decryptedPayload:any;

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private infoService: InformationSharingService,
    private expertsProfileService: ExpertsprofileserviceService,
    private reportingAnalytics: ReportsService,
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'tra_publication_management';

     this.publicationManagementForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      publication_management_id: new FormControl('', Validators.compose([])),
      title: new FormControl('', Validators.compose([])),
      authors: new FormControl('', Validators.compose([])),
      abstract: new FormControl('', Validators.compose([])),
      keywords: new FormControl('', Validators.compose([])),
      journal_conference: new FormControl('', Validators.compose([])),
      doi: new FormControl('', Validators.compose([])),
      publication_date: new FormControl('', Validators.compose([])),
      publication_type: new FormControl('', Validators.compose([])),
      peer_reviewed: new FormControl('', Validators.compose([])),
      publication_link: new FormControl('', Validators.compose([])),
      repository_info: new FormControl('', Validators.compose([])),
      research_area: new FormControl('', Validators.compose([])),
      is_expert_publication: new FormControl(false, Validators.compose([])),

      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
    });

    if (this.infoService.getApplicationDetail()) {
      this.publication_data = this.infoService.getApplicationDetail();
      this.app_reference_no = this.publication_data.app_reference_no;
      this.application_code = this.publication_data.application_code;
      this.publication_management_id = this.publication_data.publication_management_id;
      this.appworkflow_status_id = this.publication_data.appworkflow_status_id;
      this.process_id = this.publication_data.process_id;
      
      this.publicationManagementForm.patchValue(this.publication_data);
      
      this.onLoadExpertsPublicationManagementData(this.publication_management_id);
    }
    else {

      this.router.navigate([this.dashboard_url]);
      this.scrollToTop();
    }

    this.checkScreenSize();
    
  }

  ngOnInit() {
    this.onLoadconfirmationData();
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void{
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize(): void{
    if(this.screenWidth < 768){
      this.tabsPosition = 'top';
    }else{
      this.tabsPosition = 'left';
    }
  }

  onLoadconfirmationData() {
    let data_submit = {
      'table_name': 'par_confirmations'
    }
    this.infoService.onLoadInformationSharingConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.confirmationData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  singleApplicationActionColClick(data){
    this.publicationManagementForm.get('publication_management_id')?.setValue(data.publication_management_id);
    this.publicationManagementForm.get('first_name')?.setValue(data.name);
    this.isExpertsprofileInforamtionWin = false;
  }

  onSearchExpertsProfileDetails() {
    this.spinnerShow('Loading Experts Profile Information ...........');

    var data_submit = {
      'table_name': 'exp_expertsprofile_information',
      'appworkflow_status_id': 2
    }
    this.expertsProfileService.onGetExpertsProfileInformation(data_submit, 'onGetExpertsRegistationInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.registeredExpertsAccountsData = this.data_record.data;
            this.isExpertsprofileInforamtionWin = true;
          }
          this.spinnerHide();
        },
        error => {
          
        });

  } 
  
  funcInfoTabClick(e) {
    let tab_index = e.itemIndex;

    if (tab_index > 0) {
      this.publication_management_id = this.publicationManagementForm.get('id')?.value;
      if (this.publication_management_id < 1) {
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      }
    }
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

  onNextNavigationItems(nextStep) {
    // this.selectedTabIndex = nextStep;
    if (nextStep > 0) {
      this.publication_management_id = this.publicationManagementForm.get('id')?.value;

      if (this.publication_management_id < 1) {
        //validate the form based on saving 
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      } else {

        this.selectedTabIndex = nextStep;
      }
    } else {
      this.selectedTabIndex = nextStep;
    }
  }

  onFuncReturntoDashboard() {
    this.router.navigate(['./admin-ecres/app-publication-dashboard']);
    this.scrollToTop();
  }

  onLoadExpertsPublicationManagementData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onLoadExpertsPublicationManagement')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.publicationManagementData = this.decryptedPayload;
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

  onFuncSaveExpertPublicationManagement() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.publicationManagementForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.publicationManagementForm.invalid) {
      this.toastr.error('Please fill in all mandatory fields.', 'Alert');
      return;
    }

    this.spinnerShow('Saving publication information .........');
    this.spinner.show();
    this.infoService.onSaveInformationSharingDetails(this.table_name, this.publicationManagementForm.value, 'onSaveExpertsPublicationManagement')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.publication_management_id = this.response.publication_management_id;
            this.application_code = this.response.application_code;
            this.app_reference_no = this.response.app_reference_no;
            this.publicationManagementForm.get('id')?.setValue(this.publication_management_id);
            this.onLoadExpertsPublicationManagementData();
            this.selectedTabIndex = 1;
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        });
  }

  onFuncSubmitPublication() {
    this.isShowAppProcessSubmission= true;
  }

  onExpertsChange($event) {

    if ($event.selectedItem) {

      let resp = $event.selectedItem,
        confirmation_resp = resp.id;
      if(confirmation_resp ==1){
        this.is_expert_publication = true;
      }
      else{
        this.is_expert_publication = false;
        this.publicationManagementForm.get('publication_management_id')?.setValue('');
        this.publicationManagementForm.get('name')?.setValue('');
      }
    }
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