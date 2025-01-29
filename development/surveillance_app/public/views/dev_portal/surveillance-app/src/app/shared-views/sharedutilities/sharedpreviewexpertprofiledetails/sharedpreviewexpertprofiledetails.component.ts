import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ExpertsprofileserviceService } from 'src/app/core-services/expertprofile/expertsprofileservice.service';

@Component({
  selector: 'app-sharedpreviewexpertprofiledetails',
  templateUrl: './sharedpreviewexpertprofiledetails.component.html',
  styleUrl: './sharedpreviewexpertprofiledetails.component.css'
})
export class SharedpreviewexpertprofiledetailsComponent {

  parameter_name: string= 'expert_profile_information';
  table_name:string = 'exp_expertsprofile_information';

  is_expressionof_interest_application: boolean;
  expertsprofile_information_id:number;
  isShowAppProcessSubmission:boolean;
  regulatory_function_id: number;
  expert_profiledata: any;
  expertsRegulatoryCompetenceForm: FormGroup;
  expertsLanguageProficiencyForm: FormGroup;
  expertsEducationQualificationForm: FormGroup;
  expertsEmploymentRecordForm: FormGroup;
  expertsPublicationInvolvementForm: FormGroup;
  expertsDocumentUploadsForm: FormGroup;
  is_disclaimer_visible: boolean;
  disclaimerStatementData:any;
  expertProfileFrm:FormGroup;
  userTitles: any;
  dashboard_url:string ='./experts-operations/app-expertsprofile-dash';
  appworkflow_status_id:number =1;

  spinnerMessage: string;
  loadingVisible: boolean;
  is_visiblewin: boolean;
  config_record: any;
  deletePopupVisible: boolean;
  response: any;
  genderData: any;
  languagesData: any;
  CountriesData: any;
  langproficiencyLevelsData: any;
  regulatoryFunctionData: any;
  levelOfstudyData: any;
  regulatoryFunctionCompetenceData: any;
  educationQualificationData: any;
  employmentRecordData: any;
  languageProficiencyData: any;
  levelsofExperienceData: any;
  areasOfExpertiseData: any;
  expertsProfileData: any;
  IdentificationType: any;
  employerBusinessTypeData: any;
  fieldIndustryData: any;
  publishingInvolvementData: any;
  publicationTypesData: any;
  documentTypeData: any;
  documentUploadsData: any;
  data_record: any;
  confirmationData: any;
  createNewDataFrm: FormGroup;
  isRegulatoryCompetenceVisible: boolean;
  isEducationInformationVisible: boolean;
  isLanguageProficiencyVisible: boolean;
  isEmploymentRecordVisible: boolean;
  isPublishingInformationVisible: boolean;
  isDocumentUploadVisible: boolean;
  experts_profile_no:string;
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
  selectedTabIndex: number;
  stylingMode: any = 'primary';
  process_id = 2;
  application_code: number;
  iconPosition: any = 'top';
  document_type_id:number;

  tabNames = ["PersonaInformation", "LanguageProficiency", "EducationQualification", "EmploymentRecord", "ProffessionalEngagement", "Publications", "References"]
  
  constructor(
    public translate: TranslateService,
    public router: Router,
    public toastr: ToastrService,
    public expertsProfileService:ExpertsprofileserviceService,
    public utilityService: UtilityService,
    public spinner: SpinnerVisibilityService,
    public reportingAnalytics: ReportsService,
  ) {
    this.expertProfileFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([Validators.required])),
      experts_profile_no: new FormControl('', Validators.compose([])),
      user_information_id: new FormControl('', Validators.compose([])),
      date_of_birth: new FormControl('', Validators.compose([Validators.required])),
      nationality_id: new FormControl(false, Validators.compose([Validators.required])),
      gender_id: new FormControl(false, Validators.compose([Validators.required])),
      permanent_address: new FormControl(false, Validators.compose([Validators.required])),
      email_address: new FormControl(false, Validators.compose([Validators.required])),
      first_name: new FormControl(false, Validators.compose([Validators.required])),
      surname: new FormControl(false, Validators.compose([Validators.required])),
      other_names: new FormControl(false, Validators.compose([Validators.required])),
      place_of_birth: new FormControl(false, Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl(false, Validators.compose([Validators.required])),
      present_address: new FormControl(false, Validators.compose([Validators.required])),
      permanent_telephone_no: new FormControl(false, Validators.compose([Validators.required])),
      present_telephone_no: new FormControl(false, Validators.compose([Validators.required])),
      allow_public_visibility: new FormControl(false, Validators.compose([Validators.required])),
      user_title_id: new FormControl(false, Validators.compose([Validators.required])),
      identification_type_id: new FormControl(false, Validators.compose([Validators.required])),
      identification_number: new FormControl(false, Validators.compose([Validators.required])),
      coreregulatory_function_id: new FormControl(false, Validators.compose([Validators.required])),
      area_of_expertise_id: new FormControl(false, Validators.compose([])),
      other_regulatoryfunc_expertise: new FormControl(false, Validators.compose([Validators.required]))
    }); 
    
    this.expertProfileFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([Validators.required])),
      experts_profile_no: new FormControl('', Validators.compose([])),
      user_information_id: new FormControl('', Validators.compose([])),
      date_of_birth: new FormControl('', Validators.compose([Validators.required])),
      nationality_id: new FormControl(false, Validators.compose([Validators.required])),
      gender_id: new FormControl(false, Validators.compose([Validators.required])),
      permanent_address: new FormControl(false, Validators.compose([Validators.required])),
      email_address: new FormControl(false, Validators.compose([Validators.required])),
      first_name: new FormControl(false, Validators.compose([Validators.required])),
      surname: new FormControl(false, Validators.compose([Validators.required])),
      other_names: new FormControl(false, Validators.compose([Validators.required])),
      place_of_birth: new FormControl(false, Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl(false, Validators.compose([Validators.required])),
      present_address: new FormControl(false, Validators.compose([Validators.required])),
      permanent_telephone_no: new FormControl(false, Validators.compose([Validators.required])),
      present_telephone_no: new FormControl(false, Validators.compose([Validators.required])),
      allow_public_visibility: new FormControl(false, Validators.compose([Validators.required])),
      user_title_id: new FormControl(false, Validators.compose([Validators.required])),
      identification_type_id: new FormControl(false, Validators.compose([Validators.required])),
      identification_number: new FormControl(false, Validators.compose([Validators.required])),
      coreregulatory_function_id: new FormControl(false, Validators.compose([Validators.required])),
      area_of_expertise_id: new FormControl(false, Validators.compose([])),
      other_regulatoryfunc_expertise: new FormControl(false, Validators.compose([Validators.required]))
    });
   
  
    this.expertsRegulatoryCompetenceForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      area_of_expertise_id: new FormControl('', Validators.compose([])),
      level_ofexperience_id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
    });

    this.expertsLanguageProficiencyForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      readproficiency_level_id: new FormControl('', Validators.compose([])),
      language_id: new FormControl('', Validators.compose([])),
      writeproficiency_level_id: new FormControl('', Validators.compose([])),
      speakproficiency_level_id: new FormControl('', Validators.compose([])),
      understandproficiency_level_id: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
    });

    this.expertsEducationQualificationForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      name_of_university: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      year_from: new FormControl('', Validators.compose([])),
      year_to: new FormControl('', Validators.compose([])),
      study_field: new FormControl('', Validators.compose([])),
      course_of_study: new FormControl('', Validators.compose([])),
      level_ofstudy_id: new FormControl('', Validators.compose([])),
    });

    this.expertsEmploymentRecordForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      start_date: new FormControl('', Validators.compose([])),
      end_date: new FormControl('', Validators.compose([])),
      exact_titleof_post: new FormControl('', Validators.compose([])),
      employer_name: new FormControl('', Validators.compose([])),
      employer_address: new FormControl('', Validators.compose([])),
      supervisor_name: new FormControl('', Validators.compose([])),
      reason_for_leaving: new FormControl('', Validators.compose([])),
      description_of_duties: new FormControl('', Validators.compose([])),
      is_present_employersinquiry: new FormControl('', Validators.compose([])),
      is_civilservant_status: new FormControl('', Validators.compose([])),
      field_industry_id: new FormControl('', Validators.compose([])),
      employer_business_type_id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      no_supervised_employees: new FormControl('', Validators.compose([])),
      country_ofemployment_id: new FormControl('', Validators.compose([])),
    });

    this.expertsPublicationInvolvementForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      title_of_publication: new FormControl('', Validators.compose([])),
      publish_date: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      publication_type_id: new FormControl('', Validators.compose([])),
      publication_link: new FormControl('', Validators.compose([])),
      desciption_of_publication: new FormControl('', Validators.compose([])),
    });

    this.expertsDocumentUploadsForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      document_type_id: new FormControl('', Validators.compose([])),
      document_name: new FormControl('', Validators.compose([])),
      document_file: new FormControl(null, Validators.compose([])), 
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
    });

    this.onloadAutoParameters();

    
      if (this.expertsProfileService.getApplicationDetail()) {
        this.expert_profiledata = this.expertsProfileService.getApplicationDetail();
        this.expertsprofile_information_id = this.expert_profiledata.expertsprofile_information_id;
        this.experts_profile_no = this.expert_profiledata.experts_profile_no;

        this.appworkflow_status_id = this.expert_profiledata.appworkflow_status_id;
        this.application_code = this.expert_profiledata.application_code;
        
        this.expertProfileFrm.patchValue(this.expert_profiledata);

        this.onLoadExpertsRegulatoryCompetence(this.expertsprofile_information_id)
        this.onLoadExpertsLanguageProficiency(this.expertsprofile_information_id)
        this.onLoadExpertsEducationQualification(this.expertsprofile_information_id)
        this.onLoadExpertsEmploymentRecord(this.expertsprofile_information_id)
        this.onLoadPublishingInvolvement(this.expertsprofile_information_id)
        this.onLoadDocumentUploads(this.expertsprofile_information_id)
      }
      else {
    
        this.router.navigate(['/experts-operations/app-expertsprofile-dash']);
        this.scrollToTop();
      }
  
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  funcpopWidth(percentage_width: number) {
    return window.innerWidth * percentage_width / 100;
  }
  
  funcpopHeight(percentage_height: number) {
    return window.innerHeight * percentage_height / 100;
  }

  onloadAutoParameters() {
    this.onLoaduserTitles();
    this.onLoadgenderData();
    this.onLoadregulatoryFunctionData();
    this.onloadlevelsofExperienceData();
    this.onLoadIdentificationType();
    this.onLoadlangproficiencyLevelsData();
    this.onLoademployerBusinessTypeData()
    this.onLoadlanguagesData();
    this.onLoadCountriesData()
    this.onLoadFieldIndustryData();
    this.onLoadPublicationTypesData();
    this.onLoadDocumentTypesData();
    this.onLoadconfirmationData();
  }

  onRegulatoryfunctioSelect($event) {
    if ($event.selectedItem) {
      let account_type = $event.selectedItem;
      this.regulatory_function_id = account_type.id;
      this.onLoadareasOfExpertiseData(this.regulatory_function_id);
    }
  }

  onLoaduserTitles() {
    let data_submit = {
      'table_name': 'usr_users_title'
    };
    
  }

  onLoadgenderData() {
    let data_submit = {
      'table_name': 'par_gender'
    };
    
  }

  onLoadregulatoryFunctionData() {
    let data_submit = {
      'table_name': 'cfg_regulatory_functions'
    };
    
  }

  onLoadareasOfExpertiseData(regulatory_function_id: number) {
    let data_submit = {
      'table_name': 'par_areasof_expertises'
    };
    
  }

  onLoadIdentificationType() {
    let data_submit = {
      'table_name': 'usr_identification_type'
    };
    
  }

  onloadlevelsofExperienceData() {
    let data_submit = {
      'table_name': 'par_levelsof_experience'
    };
     
  }

  onLoadCountriesData() {
    let data_submit = {
      'table_name': 'par_countries'
    };
    
  }

  onLoadlevelOfstudyData() {
    let data_submit = {
      'table_name': 'par_levelsof_study'
    };
    
  }

  onLoadlanguagesData() {
    let data_submit = {
      'table_name': 'cfg_system_languages'
    };
    
  }

  onLoadlangproficiencyLevelsData() {
    let data_submit = {
      'table_name': 'par_langproficiency_levels'
    };
    
  }

  onLoademployerBusinessTypeData() {
    let data_submit = {
      'table_name': 'par_employerbusiness_type'
    };
    
  }

  onLoadFieldIndustryData() {
    let data_submit = {
      'table_name': 'par_field_industry'
    };
    
  }

  onLoadPublicationTypesData() {
    let data_submit = {
      'table_name': 'par_publication_types'
    };
    
  }

  onLoadDocumentTypesData() {
    let data_submit = {
      'table_name': 'par_document_types'
    };
    
  }
  onLoadconfirmationData() {
    let data_submit = {
      'table_name': 'par_confirmations'
    };
   
  }

  onLoadExpertsRegulatoryCompetence(expertsprofile_information_id = 0) {
    this.loadData(
        'Loading expert regulatory function competence ...........',
        'exp_regulatory_competiencies',
        expertsprofile_information_id,
        'regulatoryFunctionCompetenceData'
    );
}

onLoadExpertsLanguageProficiency(expertsprofile_information_id = 0) {
    this.loadData(
        'Loading expert language proficiency ...........',
        'exp_experts_langsproficiencies',
        expertsprofile_information_id,
        'languageProficiencyData'
    );
}

onLoadExpertsEducationQualification(expertsprofile_information_id = 0) {
    this.loadData(
        'Loading expert education qualification...........',
        'exp_education_information',
        expertsprofile_information_id,
        'educationQualificationData'
    );
}

onLoadExpertsEmploymentRecord(expertsprofile_information_id = 0) {
    this.loadData(
        'Loading expert employment record...........',
        'exp_experience_information',
        expertsprofile_information_id,
        'employmentRecordData'
    );
}

onLoadPublishingInvolvement(expertsprofile_information_id = 0) {
    this.loadData(
        'Loading expert publishing and involvement...........',
        'exp_publishing_information',
        expertsprofile_information_id,
        'publishingInvolvementData'
    );
}

onLoadDocumentUploads(expertsprofile_information_id = 0) {
    this.loadData(
        'Loading expert document uploads...........',
        'exp_document_uploads',
        expertsprofile_information_id,
        'documentUploadsData'
    );
}

loadData(message, tableName, id, dataVariable) {
    this.spinnerShow(message);
    const data_submit = {
        'table_name': tableName,
        'expertsprofile_information_id': id
    };
    
}

  onAddExpertsRegulatoryCompetence() {
      this.expertsRegulatoryCompetenceForm.reset();
      this.isRegulatoryCompetenceVisible = true;
  }

  onAddExpertsEducationInformation(): void {
    this.isEducationInformationVisible = true;
    this.expertsEducationQualificationForm.reset();
  }

  onAddLanguageProficiency(): void {
    this.isLanguageProficiencyVisible = true;
    this.expertsLanguageProficiencyForm.reset();
  }

  onAddEmploymentRecord(): void {
    this.isEmploymentRecordVisible = true;
    this.expertsEmploymentRecordForm.reset();
  }

  onAddPublishingInformation(): void {
    this.isPublishingInformationVisible = true;
    this.expertsPublicationInvolvementForm.reset();
  }

  onAddExpertsDocumentUpload(): void {
    this.isDocumentUploadVisible = true;
    this.expertsDocumentUploadsForm.reset();
  }

  onFuncSaveExpertsProfileInformation() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.expertProfileFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertProfileFrm.invalid) {
      return;
    }
    this.spinnerShow('saving ' + this.parameter_name);
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertProfileFrm.value, 'onFuncSaveExpertsProfileInformation')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.application_code = this.response.application_code;
            this.experts_profile_no = this.response.experts_profile_no;
            this.selectedTabIndex = 1;

            this.expertsprofile_information_id = this.response.expertsprofile_information_id;
            this.expertProfileFrm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id)
            this.expertProfileFrm.get('application_code')?.setValue(this.application_code)
            this.toastr.success(this.response.message, 'Response');

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
  funcExpertProfileTabClick(e) {
    //add logic
    let tab_index = e.itemIndex;
    if (tab_index >0) {
      if (this.expertProfileFrm.invalid) {
        //validate the form based on saving 
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save the Experts Profile general Information Before before moving to the next step.', 'Response');
      }else{
        this.selectedTabIndex = tab_index;
      }
    }
  }
  onNextNavigationItems(nextStep) {
    if (nextStep >0) {
      if (this.expertProfileFrm.invalid) {
        //validate the form based on saving 
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save the Experts Profile Information Before before moving to the next step.', 'Response');
      }
      else{
        this.selectedTabIndex = nextStep;
      }
    }
    else{
      this.selectedTabIndex = nextStep;
    }
  }
  onSubmitProfileInformation() {


  }
  onPreviewProfiledetails() {

  }
  onFuncReturntoDashboard(){
    this.router.navigate([this.dashboard_url]);
    this.scrollToTop();
  }
  onSaveExpertsRegulatoryCompetence() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.expertsRegulatoryCompetenceForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertsRegulatoryCompetenceForm.invalid) {
      return;
    }
    this.expertsRegulatoryCompetenceForm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id);

    this.spinnerShow('Saving regulatory competence information');
    this.spinner.show();
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertsRegulatoryCompetenceForm.value, 'onSaveExpertsRegulatoryCompetence')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.onLoadExpertsRegulatoryCompetence();
            this.isRegulatoryCompetenceVisible = false;
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        }
      );
  }

 

  onSaveExpertsEducationInformation() {
    const controls = this.expertsEducationQualificationForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertsEducationQualificationForm.invalid) {
      return;
    }
    this.expertsEducationQualificationForm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id);

    this.spinnerShow('Saving regulatory competence information');
    this.spinner.show();
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertsEducationQualificationForm.value, 'onSaveExpertsEducationInformation')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.onLoadExpertsEducationQualification();
            this.isEducationInformationVisible = false;
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        }
      );
  }

  onSaveExpertsLanguageProficiency() {
    const controls = this.expertsLanguageProficiencyForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertsLanguageProficiencyForm.invalid) {
      return;
    }
    this.expertsLanguageProficiencyForm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id);

    this.spinnerShow('Saving language proficiency information');
    this.spinner.show();
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertsLanguageProficiencyForm.value, 'onSaveExpertsLanguageProficiency')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.onLoadExpertsLanguageProficiency();
            this.isLanguageProficiencyVisible = false;
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        }
      );
  }

  onSaveEmploymentRecord() {
    const controls = this.expertsEmploymentRecordForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertsEmploymentRecordForm.invalid) {
      return;
    }
    this.expertsEmploymentRecordForm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id);

    this.spinnerShow('Saving employment information');
    this.spinner.show();
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertsEmploymentRecordForm.value, 'onSaveEmploymentRecord')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.onLoadExpertsEmploymentRecord();
            this.isEmploymentRecordVisible = false;
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        }
      );
  }

  onSavePublishingInvolvement() {
    const controls = this.expertsPublicationInvolvementForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertsPublicationInvolvementForm.invalid) {
      return;
    }
    this.expertsPublicationInvolvementForm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id);

    this.spinnerShow('Saving publishing information');
    this.spinner.show();
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertsPublicationInvolvementForm.value, 'onSavePublishingInvolvement')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.onLoadPublishingInvolvement();
            this.isPublishingInformationVisible = false;
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        }
      );
  }

  onSaveDocumentUpload() {
    const controls = this.expertsDocumentUploadsForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.expertsDocumentUploadsForm.invalid) {
      return;
    }
    this.expertsDocumentUploadsForm.get('expertsprofile_information_id')?.setValue(this.expertsprofile_information_id);

    this.spinnerShow('Saving document upload');
    this.spinner.show();
    this.expertsProfileService.onSaveExpertProfileDetails(this.table_name, this.expertsDocumentUploadsForm.value, 'onSaveDocumentUpload')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.onLoadDocumentUploads();
            this.isDocumentUploadVisible = false;
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        }
      );
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.is_visiblewin = true;
  }

  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcActionColClick(e, data) {
    const action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    } else if (action_btn.action === 'block_record') {
      this.funcDeleteDetails(data);
    }
  }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  onDeleteConfigurationsDetails() {
    this.spinnerShow('Deleting ' + this.parameter_name);
    this.expertsProfileService.onDeleteExpertProfileDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        }
      );
  }

  spinnerShow(spinnerMessage: string) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }

  spinnerHide() {
    this.loadingVisible = false;
  }


  onViewDiscalimerstatment() {
    this.spinnerShow('Viewing Disclaimer Statement....');
    let data_submit = {
      'table_name': 'par_disclaimer_statements',
      'disclaimer_type_id': 1
    };
    this.expertsProfileService.onLoadExpertsConfigData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {

            this.disclaimerStatementData = this.data_record.data;
            this.is_disclaimer_visible= true;

          }
        },
        error => {
          
        }
      );
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

