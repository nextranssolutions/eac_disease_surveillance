import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-shared-processconfiguration',

  templateUrl: './shared-processconfiguration.component.html',
  styleUrl: './shared-processconfiguration.component.css'
})
export class SharedProcessconfigurationComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  hasReadpermissions: boolean;
  onAddProcessConfiVisible: boolean;
  processConfigFrm: FormGroup;
  processConfigData: any[] = [];
  productTypesData: any[] = [];
  regFunctionData: any[] = [];
  regSubFunctionData: any[] = [];
  isActiveData: any[] = [];
  data_record: any;
  show_advancesearch: boolean;
  isnewprocess: boolean;
  config_record: string;
  deletePopupVisible = false;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean;
  regulatoryFunctionData: any;

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

    if (this.table_name == 'cfg_regulated_productstypes') {
      this.processConfigFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required])),
        code: new FormControl('', Validators.compose([])),
        navigation_type_id: new FormControl('', Validators.compose([])),
        iconsCls: new FormControl('', Validators.compose([])),
        parent_id: new FormControl('', Validators.compose([])),
        level: new FormControl('', Validators.compose([])),
        order_no: new FormControl('', Validators.compose([])),
        system_interface_id: new FormControl('', Validators.compose([])),
        resetcolumns: new FormControl('', Validators.compose([])),
        regulatory_function_id: new FormControl('', Validators.compose([])),
        regulatory_subfunction_id: new FormControl('', Validators.compose([])),
        is_enabled: new FormControl('', Validators.compose([])),

      });
    }
     else {
      this.processConfigFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required])),
        code: new FormControl('', Validators.compose([Validators.required])),
        navigation_type_id: new FormControl('', Validators.compose([])),
        order_no: new FormControl('', Validators.compose([])),
        iso_acyronym: new FormControl('', Validators.compose([])),
        routerlink: new FormControl('', Validators.compose([])),
        resetcolumns: new FormControl('', Validators.compose([])),

      });

      this.processConfigFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    }
   
    
    
    
  }

  ngOnInit(){
    this.fetchRegulatoryFunctionData()
    this.fetchProcessConfigDetails();
    this.fetchproductTypesData();
    this.fetchregFunctionData();
    this.fetchregSubFunctionData();
    this.fetchisActiveData();
  }



  resetcolumns(resetcolumns: any) {
    throw new Error('Method not implemented.');
  }
  
  
  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }
  onAddProcessConfig() {
    this.processConfigFrm.reset();
    this.onAddProcessConfiVisible = true;
  }

  fetchProcessConfigDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.processConfigData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchRegulatoryFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_functions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatoryFunctionData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchproductTypesData() {

    var data_submit = {
      'table_name': 'cfg_regulated_productstypes'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productTypesData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchregFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_functions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regFunctionData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchregSubFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_subfunctions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regSubFunctionData = this.data_record.data
          }
        },
        error => {

        });
  }
  fetchisActiveData() {

    var data_submit = {
      'table_name': 'cfg_application_sections'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.isActiveData= this.data_record.data
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
funcEditDetails(data) {
  this.processConfigFrm.patchValue(data.data);
  this. isnewprocess= true;
}
funcDeleteDetails(data) {
  this.processConfigFrm.patchValue(data.data);
  this.config_record = data.data.name;
  this.deletePopupVisible = true;
}
funcEnableDisableRecord(data) {
  this.processConfigFrm.patchValue(data.data);

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

    onExporting(e: DxDataGridTypes.ExportingEvent) {
  
      if (e.format == 'pdf') {
        this.reportingAnalytics.onExportingPDF(e)
      }
      else {
        this.reportingAnalytics.onExportingExcelData(e)
      }
    }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

