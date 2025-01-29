import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-shared-premisesconfigurations',
  templateUrl: './shared-premisesconfigurations.component.html',
  styleUrl: './shared-premisesconfigurations.component.css'
})
export class SharedPremisesconfigurationsComponent {

  @Input() table_name: string;
  @Input() parameter_name: string;
  hasReadpermissions: boolean;
  createNewDataFrm: FormGroup;
  onAddNewConfiVisible: boolean;
  NewConfigData: any[] = [];
  premiseTypeData: any[] = [];
  pharmaceuticalTypeData: any[] = [];
  regTypeData: any[] = [];
  businessTypeData: any[] = [];
  businessTypeDetailsData: any[] = []; 
  show_advancesearch: boolean;
  isnewprocess: boolean;
  config_record: string;
  deletePopupVisible = false;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean;
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  response: any;
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  loading = false;

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


  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public translate: TranslateService,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    public reportingAnalytics: ReportsService,
    public configService: ConfigurationsService,
  ) {


      this.createNewDataFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required])),
        is_enabled: new FormControl('', Validators.compose([])),
        product_type_id: new FormControl('', Validators.compose([])),
        code: new FormControl('', Validators.compose([])),
        permit_type_title: new FormControl('', Validators.compose([])),
        act_name: new FormControl('', Validators.compose([])),
        premise_type_id: new FormControl('', Validators.compose([])),
        pharmaceuticallicense_type_id: new FormControl('', Validators.compose([])),
        regulatory_function_id: new FormControl('', Validators.compose([])),
        business_typecategory_id: new FormControl('', Validators.compose([])),
        business_type_id: new FormControl('', Validators.compose([])),
      });
    
  

  }

  ngOnInit() {
    this.fetchNewConfigData();
    this.fetchPremiseTypeData();
    this.fetchNewConfigurations();
    this.fetchPharmaceuticalTypeData();
    this. fetchRegTypeData();
    this.fetchBusinessTypeData();
    this. fetchBusinessTypeDetailsData();
  
    }

    spinnerShow(spinnerMessage) {
      this.loadingVisible = true;
      this.spinnerMessage = spinnerMessage;
    }
    spinnerHide() {
      this.loadingVisible = false;
    }
  
  resetcolumns(resetcolumns: any) {
    throw new Error('Method not implemented.');
  }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  onAddNewConfig() {
    this.createNewDataFrm.reset();
    this.onAddNewConfiVisible = true;
  }

  fetchNewConfigurations() {
    this.spinnerShow('Loading...........');
    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.NewConfigData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }
  onFuncSaveNewConfigData() {

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
    this.spinnerShow('saving ' + this.parameter_name);
    this.configService.onSaveConfigurationDetailsDetails(this.table_name, this.createNewDataFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this. fetchNewConfigurations();
            this.onAddNewConfiVisible = false;
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

  
  fetchNewConfigData() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          ;
          if (this.data_record.success) {
            this.NewConfigData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchPremiseTypeData() {

    var data_submit = {
      'table_name': 'cfg_premises_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.premiseTypeData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchPharmaceuticalTypeData() {

    var data_submit = {
      'table_name': 'cfg_pharmaceuticallicense_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.pharmaceuticalTypeData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchRegTypeData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_functions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regTypeData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchBusinessTypeData() {

    var data_submit = {
      'table_name': 'cfg_businesstype_categories'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.businessTypeData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchBusinessTypeDetailsData() {

    var data_submit = {
      'table_name': 'cfg_business_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.businessTypeDetailsData = this.data_record.data
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
  finishFunction() {

  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.onAddNewConfiVisible = true;
  }
  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcEnableDisableRecord(data) {
    this.createNewDataFrm.patchValue(data.data);

    this.config_record = data.data.name;
    this.is_enabled = data.data.is_enabled;
    if (this.is_enabled) {
      this.enabledisable_tracer = "disable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_disableconfigurationitem";

    }
    else {
      this.enabledisable_tracer = "enable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_enableconfigurationitem";
    }

    this.enablePopupVisible = true;
  }
  funcActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    } else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    } else if (action_btn.action === 'block_record') {
      this.funcDeleteDetails(data);
    }
  }

  iniateEnableDisableRecord() {

    this.spinnerShow('Saving_details');
    this.configService.onEnableConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchNewConfigurations();
            this.enablePopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {
            this.toastr.success(this.response.message, 'Response');
          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
          this.spinnerHide();
        });
  }

  
  onAdvanceProductRegistrySearch(e) {
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
  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  }

  onDeleteConfigurationsDetails() {
    this.spinnerShow('deleting ' + this.parameter_name);
    this.configService.onDeleteConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchNewConfigurations();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }
          this.spinnerHide();

        },
        error => {
          this.loading = false;
          this.spinnerHide();
        });

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

//   @Input() table_name: string;
//   @Input() parameter_name: string;
//   hasReadpermissions: boolean;
//   onAddPremisesConfiVisible: boolean;
//   premisesConfigFrm: FormGroup;
//   premisesConfigData: any[] = [];
//   businessTypeData: any[] = [];
//   businessTypeDetailsData: any[] = [];
//   permitTypeData: any[] = [];
//   actNameData: any[] = [];
//   premiseTypeData: any[] = [];
//   regTypeData: any[] = [];
//   pharmaceuticalTypeData: any[] = [];

//   data_record: any;
//   show_advancesearch: boolean;
//   isnewprocess: boolean;
//   config_record: string;
//   deletePopupVisible = false;
//   is_enabled: boolean;
//   enabledisable_tracer: string;
//   enabledisable_tracerdescription: string;
//   enablePopupVisible: boolean;


//   actionsMenuItems = [
//     {
//       text: "Action",
//       icon: 'menu',
//       items: [
//         //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
//         { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
//         { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
//       ]
//     }
//   ];
//   regStatusOptions = [
//     { value: true, text: 'Yes' },
//     { value: false, text: 'No' },
//   ];

//   constructor(
//     private spinner: SpinnerVisibilityService,
//     private router: Router,
//     public toastr: ToastrService,
//     public viewRef: ViewContainerRef,
//     public translate: TranslateService,
//     public utilityService: UtilityService, 
//     public modalService: NgxSmartModalService,
//     public reportingAnalytics: ReportsService,
//     public configService: ConfigurationsService,
//   ) {

//     if (this.table_name == 'cfg_premises_types') {
//       this.premisesConfigFrm = new FormGroup({
//         id: new FormControl('', Validators.compose([])),
//         name: new FormControl('', Validators.compose([Validators.required])),
//         description: new FormControl('', Validators.compose([Validators.required])),
//         code: new FormControl('', Validators.compose([])),
//         navigation_type_id: new FormControl('', Validators.compose([])),
//         iconsCls: new FormControl('', Validators.compose([])),
//         parent_id: new FormControl('', Validators.compose([])),
//         level: new FormControl('', Validators.compose([])),
//         order_no: new FormControl('', Validators.compose([])),
//         system_interface_id: new FormControl('', Validators.compose([])),
//         resetcolumns: new FormControl('', Validators.compose([])),
//         regulatory_function_id: new FormControl('', Validators.compose([])),
//         regulatory_subfunction_id: new FormControl('', Validators.compose([])),
//         is_enabled: new FormControl('', Validators.compose([])),

//       });
//     }
//      else {
//       this.premisesConfigFrm = new FormGroup({
//         id: new FormControl('', Validators.compose([])),
//         name: new FormControl('', Validators.compose([Validators.required])),
//         description: new FormControl('', Validators.compose([Validators.required])),
//         code: new FormControl('', Validators.compose([Validators.required])),
//         navigation_type_id: new FormControl('', Validators.compose([])),
//         order_no: new FormControl('', Validators.compose([])),
//         iso_acyronym: new FormControl('', Validators.compose([])),
//         routerlink: new FormControl('', Validators.compose([])),
//         resetcolumns: new FormControl('', Validators.compose([])),

//       });

//       this.premisesConfigFrm.get('resetcolumns')?.setValue(this.resetcolumns);
//     }
//   }

//   ngOnInit(){
//     this.fetchpremisesConfigData();
//     this. fetchbusinessTypeData();
//     this.fetchbusinessTypeDetailsData();
//     this.fetchactNameData();
//     this.fetchpermitTypeData();
//     this.fetchpremiseTypeData();
//     this.fetchregTypeData();
//     this.fetchpharmaceuticalTypeData();
//   }
    
//   resetcolumns(resetcolumns: any) {
//     throw new Error('Method not implemented.');
//   }
  
  
//   onCellPrepared(e) {
//     this.utilityService.onCellCountriesPrepared(e);
//   }
//   onAddPremisesConfig() {
//     this.premisesConfigFrm.reset();
//     this.onAddPremisesConfiVisible = true;
//   }
    
//   fetchpermitTypeData() {
//   var data_submit = {
//     'table_name': 'cfg_premises_types'
//   }
//   this.configService.onLoadConfigurationData(data_submit)
//     .subscribe(
//       data => {
//         this.data_record = data;
//         if (this.data_record.success) {
//           this.permitTypeData = this.data_record.data;
//         }

//       },
//       error => {

//       });
    
    
//   }

//   fetchactNameData() {
//     var data_submit = {
//       'table_name': 'cfg_premises_types'
//     }
//     this.configService.onLoadConfigurationData(data_submit)
//       .subscribe(
//         data => {
//           this.data_record = data;
//           if (this.data_record.success) {
//             this.actNameData = this.data_record.data;
//           }
  
//         },
//         error => {
  
//         });
      
      
//     }

//   fetchpremisesConfigData() {
//     var data_submit = {
//       'table_name': this.table_name
//     }
//     this.configService.onLoadConfigurationData(data_submit)
//       .subscribe(
//         data => {
//           this.data_record = data;
//           if (this.data_record.success) {
//             this.premisesConfigData = this.data_record.data;
//           }
  
//         },
//         error => {
  
//         });
      
      
//     }

//   fetchbusinessTypeData() {

//     var data_submit = {
//       'table_name': 'cfg_businesstype_categories'
//     }
//     this.configService.onLoadConfigurationData(data_submit)
//       .subscribe(
//         data => {
//           this.data_record = data;
//           ;
//           if (this.data_record.success) {
//             this.businessTypeData = this.data_record.data
//           }
//         },
//         error => {

//         });
//   }
//   fetchbusinessTypeDetailsData(){
//     var data_submit = {
//       'table_name': 'cfg_business_types'
//     }
//     this.configService.onLoadConfigurationData(data_submit)
//       .subscribe(
//         data => {
//           this.data_record = data;
//           ;
//           if (this.data_record.success) {
//             this.businessTypeDetailsData = this.data_record.data
//           }
//         },
//         error => {

//         });


//   }

//   fetchpremiseTypeData(){
//     var data_submit = {
//       'table_name': 'cfg_premises_types'
//     }
//     this.configService.onLoadConfigurationData(data_submit)
//       .subscribe(
//         data => {
//           this.data_record = data;
//           ;
//           if (this.data_record.success) {
//             this.businessTypeDetailsData = this.data_record.data
//           }
//         },
//         error => {

//         });


//   }

//   fetchregTypeData() {
//     var data_submit = {
//       'table_name': 'cfg_regulatory_functions'
//     }
//     this.configService.onLoadConfigurationData(data_submit)
//       .subscribe(
//         data => {
//           this.data_record = data;
//           ;
//           if (this.data_record.success) {
//             this.regTypeData = this.data_record.data;
//           }
  
//         },
//         error => {
  
//         });
      
      
//     }

//     fetchpharmaceuticalTypeData(){
//       var data_submit = {
//         'table_name': 'cfg_pharmaceuticallicense_types'
//       }
//       this.configService.onLoadConfigurationData(data_submit)
//         .subscribe(
//           data => {
//             this.data_record = data;
//             ;
//             if (this.data_record.success) {
//               this.businessTypeDetailsData = this.data_record.data
//             }
//           },
//           error => {
  
//           });
  
  
//     }
  
//   onAdvanceProductRegistrySearch(e){
//     e.toolbarOptions.items.unshift({
//       location: 'after',
//       widget: 'dxCheckBox',
//       options: {
//         icon: 'select',
//         text: 'Show Advanced Search',
//         value: this.show_advancesearch,
//         onValueChanged: this.onActivatetheAdvanceSearch.bind(this)
//       }
//     });
//   }
//   funcEditDetails(data) {
//     this.premisesConfigFrm.patchValue(data.data);
//     this. isnewprocess= true;
//   }
//   funcDeleteDetails(data) {
//     this.premisesConfigFrm.patchValue(data.data);
//     this.config_record = data.data.name;
//     this.deletePopupVisible = true;
//   }

//   funcEnableDisableRecord(data) {
//     this.premisesConfigFrm.patchValue(data.data);
  
//     this.config_record = data.data.name;
//     this.is_enabled = data.data.is_enabled;
//     if (this.is_enabled) {
//       this.enabledisable_tracer = "disable_configuration_item";
//       this.enabledisable_tracerdescription = "are_you_sure_you_want_to_disableconfigurationitem";
  
//     }
//     else {
//       this.enabledisable_tracer = "enable_configuration_item";
//       this.enabledisable_tracerdescription = "are_you_sure_you_want_to_enableconfigurationitem";
//     }
  
//     this.enablePopupVisible = true;
//   }

//   funcActionColClick(e, data) {
//     var action_btn = e.itemData;
//     if (action_btn.action === 'edit_record') {
//       this.funcEditDetails(data);
//     } else if (action_btn.action === 'delete_record') {
//       this.funcDeleteDetails(data);
//     } else if (action_btn.action === 'enable_record') {
//       this.funcEnableDisableRecord(data);
//     } else if (action_btn.action === 'block_record') {
//       this.funcDeleteDetails(data);
//     }
//   }
  
//   onActivatetheAdvanceSearch(e){

//     this.show_advancesearch =  e.value;

// }
//       onExporting(e: DxDataGridTypes.ExportingEvent) {
    
//         if (e.format == 'pdf') {
//           this.reportingAnalytics.onExportingPDF(e)
//         }
//         else {
//           this.reportingAnalytics.onExportingExcelData(e)
//         }
//       }
// }
