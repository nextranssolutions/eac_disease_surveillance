import { Component, HostListener, Input, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ExpertsprofileserviceService } from 'src/app/core-services/expertprofile/expertsprofileservice.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-knowledge-centerinfomanagement',
  templateUrl: './knowledge-centerinfomanagement.component.html',
  styleUrl: './knowledge-centerinfomanagement.component.css'
})
export class KnowledgeCenterinfomanagementComponent {
  dashboard_title:string ='E-CRES Knowledge Center Management';

  @Input() application_code: number;
  @Input() process_id: number;
  @Input() document_type_id: number;
  @Input() appworkflow_status_id: number;
  @Input() is_readonly: boolean;
  iconPosition: any = "top";
  data_record: any;
  response: any;
  knowledgecenter_data: any;
  app_reference_no: string;
  knowledgeCenterData: any[] = [];
  loadingVisible: boolean;
  spinnerMessage: string;
  knowledgecenter_id: number;
  table_name: string;
  selectedTabIndex = 0;
  isShowAppProcessSubmission:boolean;
  knowledgeCenterForm: FormGroup;
  dashboard_url:string ="/admin-ecres/app-knowledgecenter-dashboard";

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
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'tra_knowledgecenter_management';

     this.knowledgeCenterForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      knowledgecenter_id: new FormControl('', Validators.compose([])),
      title: new FormControl('', Validators.compose([])),
      knowledge_link: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      category: new FormControl('', Validators.compose([])),

      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
    });

    if (this.infoService.getApplicationDetail()) {
      this.knowledgecenter_data = this.infoService.getApplicationDetail();
      this.app_reference_no = this.knowledgecenter_data.app_reference_no;
      this.application_code = this.knowledgecenter_data.application_code;
      this.knowledgecenter_id = this.knowledgecenter_data.knowledgecenter_id;
      this.appworkflow_status_id = this.knowledgecenter_data.appworkflow_status_id;
      this.process_id = this.knowledgecenter_data.process_id;
      
      this.knowledgeCenterForm.patchValue(this.knowledgecenter_data);
      
      this.onLoadKnowledgeCenterManagementData(this.knowledgecenter_id);
    }
    else {

      this.router.navigate([this.dashboard_url]);
      this.scrollToTop();
    }


    this.checkScreenSize();
    
  }

  ngOnInit() {
    
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

  
  funcInfoTabClick(e) {
    let tab_index = e.itemIndex;

    if (tab_index > 0) {
      this.knowledgecenter_id = this.knowledgeCenterForm.get('id')?.value;
      if (this.knowledgecenter_id < 1) {
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      }
    }
  }

  onNextNavigationItems(nextStep) {
    // this.selectedTabIndex = nextStep;
    if (nextStep > 0) {
      this.knowledgecenter_id = this.knowledgeCenterForm.get('id')?.value;

      if (this.knowledgecenter_id < 1) {
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
    this.router.navigate(['./admin-ecres/app-knowledgecenter-dashboard']);
    this.scrollToTop();
  }

  onLoadKnowledgeCenterManagementData(appworkflow_status_id = 0) {
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

  onFuncSaveKnowledgeCenterData() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.knowledgeCenterForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.knowledgeCenterForm.invalid) {
      this.toastr.error('Please fill in all mandatory fields.', 'Alert');
      return;
    }

    this.spinnerShow('Saving publication information .........');
    this.spinner.show();
    this.infoService.onSaveInformationSharingDetails(this.table_name, this.knowledgeCenterForm.value, 'onFuncSaveKnowledgeCenterData')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.knowledgecenter_id = this.response.knowledgecenter_id;
            this.application_code = this.response.application_code;
            this.app_reference_no = this.response.app_reference_no;
            this.knowledgeCenterForm.get('id')?.setValue(this.knowledgecenter_id);
            this.onLoadKnowledgeCenterManagementData();
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

  onFuncSubmitKnowledgeCenterData() {
    this.isShowAppProcessSubmission= true;
  }
}
