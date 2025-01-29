import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxToolbarComponent } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ExpressionOfInterestManagementService } from 'src/app/core-services/expresion-of-interest-management/expression-of-interest-management.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-sharedpreviewexpressionofinterests',
  templateUrl: './sharedpreviewexpressionofinterests.component.html',
  styleUrl: './sharedpreviewexpressionofinterests.component.css'
})
export class SharedpreviewexpressionofinterestsComponent{
  @ViewChild('openFileInput') openFileInput: ElementRef;
  @ViewChild('toolbar') toolbar!: DxToolbarComponent;
  @Input() appworkflow_status_id: number;
  @Input() process_id: number;
  @Input() application_code: number;
  @Input() eoi_id:number
  @Input() eoiGeneralInformationForm: FormGroup;
  @Input() eoiPublishingInformationForm: FormGroup;
  @Input() expertEoiApplicationForm: FormGroup;
  
  regulatoryFunctionCompetenceData: any;
  isShowAppProcessSubmission:boolean;
  is_expressionof_interest_application:boolean;
  //eoiGeneralInformationForm: FormGroup;
  regulatory_function_id:number;
  eoiScopeofWorkRegulatoryFunctionForm: FormGroup;
  eoiEligibilityCriteriaForm: FormGroup;
  eoiQualificationsForm: FormGroup;
  eoiSupportingDocumentsForm: FormGroup;
  //eoiPublishingInformationForm: FormGroup;
  eoiLanguageProficiencyForm: FormGroup;
  dashboard_url:string;
  postingInstitutionData: any;
  allInstitutionsdata: any;
  regulatoryFunctionData: any;
  genderData: any;
  CountriesData: any;
  userTitles: any;
  show_advancesearch: boolean;
  eoiLevelsOfStudyData: any;
  eoiProficiencyLevelsData: any;
  eoiCategoryData: any;
  eoiSubmissionMethodData: any;
  eoiLanguagesData: any;
  eoiGeneralInfoData: any[] = [];
  expressionOfInterestDetailsData: any[] = [];
  scopeOfWorkData: any[] = [];
  eligibilityCriteriaData: any[] = [];
  qualificationsData: any[] = [];
  supportingDocumentsData: any[] = [];
  publishingInformationData: any[] = [];
  languageProficiencyData: any[] = [];
  countriesData: any;
  memberStatesData: any;
  documentCategoryData: any;
  eoiEngagementTypesata: any;
  cityAllData: any;
  eoiQualificationCategoryData: any;
  cityData: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  periodSpanData:any;
  eoiPostingTargetsData: any;

  selectedTabIndex = 0;
  isTabSelected: boolean = true;
  table_name: string;
  isEoiDetailsVisible = false;
  isEoiVisible: boolean;
  isEligibilityVisible: boolean;
  isQualificationsVisible: boolean;
  isDocumentsVisible: boolean;
  isPublishingVisible: boolean;
  isLanguageProficiencyVisible: boolean;
  member_state_id: number;
  workflow_status_id = 1;
  config_record: string;
  // appworkflow_status_id: number;
  deleteDetailsPopupVisible: boolean;
  deletePopupVisible = false;
  approvalPopupVisible: boolean;
  is_readonly:boolean = true;
  decision_description: string;
  response: any;
  pending_approval = 0;
  queried_request = 0;
  pending_submissions = 0;
  pending_awaiting_approval = 0;
  released_published = 0;
  rejected_archived = 0;
  data_record: any;
  loading: boolean;
  eoiStatuseData: any;
  iconPosition: any = "top";
  document_type_id = 2;
  hasReadpermissions: boolean;
  has_memberstate_defination: boolean;
  public isFormCollapsed: boolean = true;
  parameter_name = "eoi_general_information";
  public formType: string;
  app_reference_no: string;
  languageProficiencyRequired: boolean = true;
  regulatoryExpertiseRequired: boolean = true;
  isDetailsFormOpen: boolean = false;
  expression_of_interestdata:any;

  levelsofExperienceData: any;
  languagesData: any;
  langproficiencyLevelsData: any;
  educationQualificationData:any;
  levelOfstudyData: any;
  employmentRecordData: any;
  employerBusinessTypeData: any;
  fieldIndustryData: any;
  publishingInvolvementData: any;
  publicationTypesData: any;

  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];

  areasOfExpertiseData:any;
  uploadOptions: any[] = [
    { text: 'Download template', value: 'download', icon: 'download' },
    { text: 'Upload data', value: 'upload', icon: 'upload' }
  ];
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  priorities = [
    'Yes',
    'No',
  ];

  text: any;
  formToDelete: any;
  decryptedPayload:any;


  constructor(
    public spinner: SpinnerVisibilityService,
    public router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    public eoiService: ExpressionOfInterestManagementService,
    private formBuilder: FormBuilder,
    private reportingAnalytics: ReportsService,
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'eoi_general_information';
    
    this.eoiGeneralInformationForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_category_id: new FormControl('', Validators.compose([])),
      engagement_type_id: new FormControl('', Validators.compose([])),
      eoi_title: new FormControl('', Validators.compose([])),
      background_information: new FormControl('', Validators.compose([])),
      objectives: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      eoiarea_of_expertise_id: new FormControl('', Validators.compose([])),
      eoiregulatory_function_id: new FormControl('', Validators.compose([])),
      eoi_regulatoryfunc_expertise: new FormControl('', Validators.compose([])),

    });

    this.eoiScopeofWorkRegulatoryFunctionForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      deliverables: new FormControl('', Validators.compose([])),
    });

    this.eoiEligibilityCriteriaForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      is_minimum: new FormControl('', Validators.compose([])),
      no_of_years: new FormControl('', Validators.compose([])),
    });

    this.eoiQualificationsForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      levelsof_study_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      is_minimum: new FormControl('', Validators.compose([])),
    });

    this.eoiLanguageProficiencyForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      language_id: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      is_requirement: new FormControl('', Validators.compose([])),
      readproficiency_level_id: new FormControl('', Validators.compose([])),
      writeproficiency_level_id: new FormControl('', Validators.compose([])),
      understandproficiency_level_id: new FormControl('', Validators.compose([])),
    });

    this.eoiSupportingDocumentsForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      document_category_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      document_type_id: new FormControl('', Validators.compose([])),
    });

    this.eoiPublishingInformationForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_publishing_id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      last_enquiry_date: new FormControl('', Validators.compose([])),
      period_spandefination_id: new FormControl('', Validators.compose([])),
      enquiries_submissions_to: new FormControl('', Validators.compose([])),
      submission_method_id: new FormControl('', Validators.compose([])),
      period_of_work: new FormControl('', Validators.compose([])),
      eoi_postingtargets_id: new FormControl('', Validators.compose([])),
      closing_date: new FormControl('', Validators.compose([])),
      publishing_remarks: new FormControl('', Validators.compose([])),
    });

    this.onLoadEoiStatuseData();
    this.onLoadPeriodSpanData();
  
    this.onloadRegulatoryFunctionData();
    this.onloadEoiCategoryData();
    this.onLoadEoiScopeOfWorkConfig();
    this.onLoadEoiEligibilityCriteriaConfig();
    this.onLoadEoiSupportingDocumentsConfig();
    this.onLoadEoiLanguageProficiencyConfig();
    this.onloadDocumentCategoryData();
    this.onloadeoiEngagementTypesata();
    this.onloadLevelOfStudyData();
    this.onloadeoiProficiencyLevelsData();
    this.onloadEoiSubmissionMethodData();
    this.onloadEoiLanguagesData();
    this.onloadEoiPostingTargetsData()

    
  }
  
  
  onLoadExpertsRegulatoryCompetence(expertsprofile_information_id = 0) {
    this.spinnerShow('Loading expert regulatory function competence ...........');

    var data_submit = {
      'table_name': 'tra_eoiapplication_regulatory_competiencies',
      'expertsprofile_information_id': expertsprofile_information_id
    };
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadApplicationExpertsRegulatoryCompetencies')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.regulatoryFunctionCompetenceData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  toggleForm() {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  toggleDetailsForm() {
    this.isDetailsFormOpen = !this.isDetailsFormOpen;
  }
  funcInfoTabClick(e) {
    let tab_index = e.itemIndex;

    if (tab_index > 0) {
      this.eoi_id = this.eoiGeneralInformationForm.get('id')?.value;
      if (this.eoi_id < 1) {
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      }
    }
  }


  
  onLoadPeriodSpanData() {

    var data_submit = {
      'table_name': 'par_timespan_definations'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.periodSpanData = this.data_record.data;
          }
        },
        error => {
          
        });

  }
  onLoadEoiStatuseData() {

    var data_submit = {
      'table_name': 'wf_workflow_statuses'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eoiStatuseData = this.data_record.data;
          }
        },
        error => {
          
        });

  }

  onLoadpostingInstitutionData(member_state_id) {

    var data_submit = {
      'table_name': 'par_institutions',
      'member_state_id': member_state_id
    }
    
  }
  
  onloadRegulatoryFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_functions'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatoryFunctionData = this.data_record.data;
          }
        },
        error => {
          
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

  onloadDocumentCategoryData() {

    var data_submit = {
      'table_name': 'eoi_document_category'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentCategoryData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onloadEoiCategoryData() {

    var data_submit = {
      'table_name': 'eoi_category'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiCategoryData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  onloadeoiEngagementTypesata() {

    var data_submit = {
      'table_name': 'par_engagement_types'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiEngagementTypesata = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onloadLevelOfStudyData() {

    var data_submit = {
      'table_name': 'par_levelsof_study'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiLevelsOfStudyData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onloadeoiProficiencyLevelsData() {

    var data_submit = {
      'table_name': 'par_langproficiency_levels'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiProficiencyLevelsData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onloadEoiSubmissionMethodData() {

    var data_submit = {
      'table_name': 'par_submission_methods'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eoiSubmissionMethodData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onloadEoiLanguagesData() {

    var data_submit = {
      'table_name': 'par_languages'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eoiLanguagesData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onloadEoiPostingTargetsData() {

    var data_submit = {
      'table_name': 'par_eoiposting_targets'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eoiPostingTargetsData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onLoadEoiScopeOfWorkConfig(eoi_id = 0) {
    this.spinnerShow('Loading scope of work regulatory and function ...........');
    var data_submit = {
      'table_name': 'eoi_scope_of_work_regulatory_function',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.scopeOfWorkData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  onLoadEoiEligibilityCriteriaConfig(eoi_id = 0) {
    this.spinnerShow('Loading eligibility criteria ...........');
    var data_submit = {
      'table_name': 'eoi_eligibility_criteria',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.eligibilityCriteriaData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  onLoadEoiQualificationsConfig(eoi_id = 0) {
    this.spinnerShow('Loading EOI qualification...........');
    var data_submit = {
      'table_name': 'eoi_qualifications',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.qualificationsData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  onLoadEoiLanguageProficiencyConfig(eoi_id = 0) {
    this.spinnerShow('Loading language proficiency qualification...........');
    var data_submit = {
      'table_name': 'eoi_language_proficiency',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.languageProficiencyData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  onLoadEoiSupportingDocumentsConfig(eoi_id = 0) {
    this.spinnerShow('Loading EOI documents...........');
    var data_submit = {
      'table_name': 'eoi_documents_tosubmit',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.supportingDocumentsData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  onLoadEoiPublishingInformationConfig(eoi_id = 0) {
    this.spinnerShow('Loading EOI publishing information...........');
    var data_submit = {
      'table_name': 'eoi_publishing_information',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.publishingInformationData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  onAddNewGeneralInfo() {
    this.eoiGeneralInformationForm.reset();
    this.isEoiDetailsVisible = true;
  }

  onAddNewScopeofWorkRegulatoryFunctionInfo() {
    if (this.eoi_id > 0) {
      this.eoiScopeofWorkRegulatoryFunctionForm.reset();
      this.isEoiVisible = true;
    }
    else {
      this.toastr.error('Information has not been saved, save the details to continue', 'Alert');
    }
  }

  onAddNewEligibilityCriteriaInfo() {
    if (this.eoi_id > 0) {
      this.eoiEligibilityCriteriaForm.reset();
      this.isEligibilityVisible = true;
    }
    else {
      this.toastr.error('Information has not been saved, save the details to continue', 'Alert');
    }
  }

  onAddNewQualificationsInfo() {
    if (this.eoi_id > 0) {
      this.eoiQualificationsForm.reset();
      this.isQualificationsVisible = true;
    }
    else {
      this.toastr.error('Information has not been saved, save the details to continue', 'Alert');
    }
  }

  onAddNewLanguageProficiencyInfo() {
    if (this.eoi_id > 0) {
      this.eoiLanguageProficiencyForm.reset();
      this.isLanguageProficiencyVisible = true;
    }
    else {
      this.toastr.error('Language proficiency has not been saved, save the details to continue', 'Alert');
    }
  }
  onAddNewSupportingDocumentsInfo() {
    if (this.eoi_id > 0) {
      this.eoiSupportingDocumentsForm.reset();
      this.isDocumentsVisible = true;
    }
    else {
      this.toastr.error('Information has not been saved, save the details to continue', 'Alert');
    }
  }

  onAddNewPublishingInfo() {
    if (this.eoi_id > 0) {
      this.eoiPublishingInformationForm.reset();
      this.isPublishingVisible = true;
    }
    else {
      this.toastr.error('Information has not been saved, save the details to continue', 'Alert');
    }
  }


  onNextNavigationItems(nextStep) {
    // this.selectedTabIndex = nextStep;
    if (nextStep > 0) {
      this.eoi_id = this.eoiGeneralInformationForm.get('id')?.value;

      if (this.eoi_id < 1) {
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

  funcEditInfo(data, formType) {
    switch (formType) {
      case 'scopeOfWorkRegulatoryFunction':
        this.eoiScopeofWorkRegulatoryFunctionForm.patchValue(data);
        this.isEoiVisible = true;
        break;
      case 'eligibilityCriteria':
        this.eoiEligibilityCriteriaForm.patchValue(data);
        this.isEligibilityVisible = true;
        break;
      case 'qualifications':
        this.eoiQualificationsForm.patchValue(data);
        this.isQualificationsVisible = true;
        break;
      case 'languageProficiency':
        this.eoiLanguageProficiencyForm.patchValue(data);
        this.isLanguageProficiencyVisible = true;
        break;
      case 'supportingDocuments':
        this.eoiSupportingDocumentsForm.patchValue(data);
        this.isDocumentsVisible = true;
        break;
      case 'publishingInformation':
        this.eoiPublishingInformationForm.patchValue(data);
        this.isPublishingVisible = true;
        break;
      default:
        break;
    }
  }

  // Delete functionality
  funcDeleteInfo(data, formType) {
    this.config_record = data.name;
    this.formToDelete = data;
    this.deleteDetailsPopupVisible = true;
  }

  onDeleteDetailsData(formType) {
    this.spinnerShow('Deleting Details');
    let form, table_name;
    switch (formType) {
      case 'scopeOfWorkRegulatoryFunction':
        form = this.formToDelete;
        table_name = 'eoi_scope_of_work_regulatory_function';
        break;
      case 'eligibilityCriteria':
        form = this.formToDelete;
        table_name = 'eoi_eligibility_criteria';
        break;
      case 'qualifications':
        form = this.formToDelete;
        table_name = 'eoi_qualifications';
        break;
      case 'supportingDocuments':
        form = this.formToDelete;
        table_name = 'eoi_documents_tosubmit';
        break;
      case 'publishingInformation':
        form = this.formToDelete;
        table_name = 'eoi_publishing_information';
        break;
      default:
        break;
    }

    this.eoiService.onDeleteExpressionOfInterestDetails(form, table_name, formType)
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Success');
            this.deleteDetailsPopupVisible = false;
          } else {
            this.toastr.error(this.response.message, 'Error');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Error');
          this.spinnerHide();
        });
  }
  onRegulatoryfunctioSelect($event) {
 
    if($event.selectedItem){
  
        let account_type = $event.selectedItem;
        this.regulatory_function_id = account_type.id;
        this.onLoadareasOfExpertiseData(this.regulatory_function_id);
    }
  }
 
  onLoadareasOfExpertiseData(regulatory_function_id) {
    let data_submit = {
      'table_name': 'par_areasof_expertises'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.areasOfExpertiseData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onFuncSubmitApplication() {
    this.isShowAppProcessSubmission= true;
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