import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { AppSettings } from 'src/app/app-settings';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-app-translationmanagement',
  templateUrl: './app-translationmanagement.component.html',
  styleUrl: './app-translationmanagement.component.css'
})
export class AppTranslationmanagementComponent  {
  table_name: string;
  parameter_name = "translation_management";
  resetcolumns:string;
  system_language_id:number;
  checklistTypesData: any;
  translationMnaagementData: any = {};
  performanceScoringScaleData: any;
  createNewDataFrm: FormGroup;
  filterLanguageFrm: FormGroup;
  isnewproduct: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  changes:any;
  configData: any;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id: number;
  addPopupVisible = false;
  deletePopupVisible = false;
  data_record: any;
  config_record: string;
  Countries: any;
  documentTypeData: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  notificationTypeData:any;
  documentTypesData: any;
  systemLabelsData:any;
  SystemLangaugesData:any;
  isMultiline:boolean=true;
  show_advancesearch: boolean;
  selectTextOnEditStart:boolean;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  decryptedPayload:any;
  constructor(
    private spinner: SpinnerVisibilityService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService, 
    public modalService: NgxSmartModalService,
    private reportingAnalytics: ReportsService,
    private AuthService: AuthenticationService,
    public httpClient: HttpClient,
    public encryptionService: EncryptionService
  ) {

    this.filterLanguageFrm = new FormGroup({
      system_language_id: new FormControl('', Validators.compose([]))
    });
    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      system_label_id: new FormControl('', Validators.compose([])),
      system_language_id: new FormControl('', Validators.compose([])),
      translation: new FormControl('', Validators.compose([])),
      resetcolumns: new FormControl('', Validators.compose([])),
    });


    
  }

  ngOnInit() {
    // other initializations

    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails();
    this.onLoaddocumentTypeData();
    this.onLoadsystemLabelsData();
    this.onLoadSystemLangaugesData();
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
 
  onLoadSystemLangaugesData() {
    var data_submit = {
      'table_name': 'cfg_system_languages'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.SystemLangaugesData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  onLoadsystemLabelsData() {
    var data_submit = {
      'table_name': 'cfg_system_labels'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemLabelsData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  onLoaddocumentTypeData() {

    var data_submit = {
      'table_name': 'dms_document_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.documentTypeData = this.data_record.data;
          }

        },
        error => {
          
        });

  }
  onLanguageSelection($event) {

    if ($event.selectedItem) {

      let language = $event.selectedItem;
      this.system_language_id = language.id;
      this.fetchConfigurationItemsDetails(this.system_language_id);
    }
  }
  fetchConfigurationItemsDetails(system_language_id =0) {
    this.spinnerShow('Loading Language Translationdetails....');

    var data_submit = {
      'table_name': this.table_name,
      'system_language_id':system_language_id
    }
    this.configService.onLoadTranslationManagement(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.translationMnaagementData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  onPopupHidden() {
    this.fetchConfigurationItemsDetails();
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.isnewproduct = true;
  }
  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcActionColClick(e, data) {
    var action_btn = e.itemData;
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

  onAddNewSystemLabel() {
    this.createNewDataFrm.reset();
    this.isnewproduct = true;
  }
  onSavingLanguageTranslationManagement(e) {
    // apply changes to local data
    let system_language_id = this.createNewDataFrm.get('system_language_id')?.value;
    
    
    this.changes = [];
    let access_changes = e.changes;
    for (let rec of access_changes) {
        let data_changeobj = {
              system_label_id: rec.key.id,
              system_language_id:rec.key.system_language_id,
              translation:rec.data.translation
        };
        this.changes.push(data_changeobj);
    }
    
  //call to the back end 
    if(this.changes){
      let post_data = JSON.stringify(this.changes);
      this.spinnerShow('Saving '+this.parameter_name);
      this.spinner.show();
      this.configService.onSavingLanguageTranslationManagement('sys_usergroup_navpermissions', this.createNewDataFrm.value, post_data,'onSavingLanguageTranslationManagement')
        .subscribe(
          response => {
            this.response = response;
            //the details 
            if (this.response.success) {
              this.fetchConfigurationItemsDetails(system_language_id);
              this.toastr.success(this.response.message, 'Response');
              this.spinnerHide();
    
            } else {
              this.toastr.error(this.response.message, 'Alert');
            }
            // this.spinner.hide();
            this.spinnerHide();
          },
          error => {
            this.toastr.error('Error Occurred', 'Alert');
            // this.spinner.hide();
            this.spinnerHide();
          });
    }
  
  }

  onFUncSaveSystemLabels() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.createNewDataFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.createNewDataFrm.invalid) {
      return;
    }
    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.spinnerShow('saving system Labels');
    this.configService.onSaveConfigurationDetailsDetails('cfg_system_labels', this.createNewDataFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          
          this.response = response;
          //the details 
          if (this.response.success) {
            // this.onLoadTranslationManagement();
            this.fetchConfigurationItemsDetails();
            this.isnewproduct = false;
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

  // onLoadTranslationManagement(system_language_id = 0) {

  //   let me = this;
  //   this.translationMnaagementData.store = new CustomStore({
  //     load: function (loadOptions: any) {
  //       var params = '?';
  //       params += 'skip=' + loadOptions.skip;
  //       params += '&take=' + loadOptions.take;//searchValue
  //       var headers = new HttpHeaders({
  //         "Accept": "application/json",
  //         "Authorization": "Bearer " + me.AuthService.getAccessToken(),
  //       });

  //       me.configData = {
  //         headers: headers,
  //         params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: me.table_name, 'system_language_id': me.system_language_id }
  //       };
  //       return me.httpClient.get(AppSettings.base_url + '/api/configurations/onLoadTranslationManagement', me.configData)
  //         .toPromise()
  //         .then((data: any) => {
  //           return {
  //             data: data.data,
  //             totalCount: data.totalCount
  //           }

  //         })
  //         .catch(error => {
  //           throw 'Data Loading Error'
  //           me.spinnerHide();
  //         });
  //     },
  //     insert: function (loadOptions: any) {
  //       var params = '?';
  //       params += 'skip=' + loadOptions.skip;
  //       params += '&take=' + loadOptions.take;//searchValue
  //       var headers = new HttpHeaders({
  //         "Accept": "application/json",
  //         "Authorization": "Bearer " + me.AuthService.getAccessToken(),
  //       });

  //       me.configData = {
  //         headers: headers,
  //         params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: me.table_name, 'system_language_id': me.system_language_id }
  //       };
  //       return me.httpClient.get(AppSettings.base_url + '/api/configurations/onLoadTranslationManagement', me.configData)
  //         .toPromise()
  //         .then((data: any) => {
  //           return {
  //             data: data.data,
  //             totalCount: data.totalCount
  //           }
  //         })
  //         .catch(error => {
  //           throw 'Data Loading Error'
  //           me.spinnerHide();
  //         });
  //     },
  //     update: function (loadOptions: any) {
  //       var params = '?';
  //       params += 'skip=' + loadOptions.skip;
  //       params += '&take=' + loadOptions.take;//searchValue
  //       var headers = new HttpHeaders({
  //         "Accept": "application/json",
  //         "Authorization": "Bearer " + me.AuthService.getAccessToken(),
  //       });

  //       me.configData = {
  //         headers: headers,
  //         params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: me.table_name, 'system_language_id': me.system_language_id }
  //       };
  //       return me.httpClient.get(AppSettings.base_url + '/api/configurations/onLoadTranslationManagement', me.configData)
  //         .toPromise()
  //         .then((data: any) => {
  //           return {
  //             data: data.data,
  //             totalCount: data.totalCount
  //           }

  //         })
  //         .catch(error => {
  //           throw 'Data Loading Error'
  //           me.spinnerHide();
  //         });
  //     }
  //   });
  // }

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

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }

  }

}
