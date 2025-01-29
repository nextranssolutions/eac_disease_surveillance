import { Component, Input, ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-shared-navigations',
  templateUrl: './shared-navigations.component.html',
  styleUrl: './shared-navigations.component.css'
})
export class SharedNavigationsComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  countriesinfoData: any[] = [];
  workflowData: any;
  AppNavigationMenus: any;
  navigationItemsFrm: FormGroup;
  navigationLevelsData: any;
  navigationTypesData: any;
  navigationItemsParentData: any;
  onAddNavigationItemVisible: boolean;
  show_advancesearch: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  action_url: string;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id: number;
  addPopupVisible = false;
  spinnerMessage: string;
  deletePopupVisible = false;
  data_record: any;
  config_record: string;
  Countries: any;
  loadingVisible = false;
  AppSystemInterfaceData: any;
  AppRegulatoryFunctionsData: any;
  AppRegulatorySubFunctionsData: any;
  NavigationTypeData: any
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
    public workflowService: WokflowManagementService,
    public utilityService: UtilityService, 
    public modalService: NgxSmartModalService,
    public reportingAnalytics: ReportsService,
  ) {


  }

  ngOnInit() {
    this.spinnerShow('Loading ' + this.parameter_name);
    if (this.table_name == 'wf_navigation_items') {
      this.navigationItemsFrm = new FormGroup({
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

      });
    }
    else {
      this.navigationItemsFrm = new FormGroup({
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

      this.navigationItemsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    }
    // other initializations
    this.fetchNavigationItemsDetails();
    this.onLoadnavigationTypesData();
    this.onLoadnavigationLevelsData();
    this.onloadworkflowData();
    if (this.table_name == 'wf_navigation_items') {
      this.fetchAppNavigationMenus();
      
      this.onLoadAppSystemInterfaceData();
      this.onLoadAppRegulatoryFunctionsData();
      this.onLoadAppRegulatorySubFunctionsData();
    }
    this.spinnerHide();

  }
  resetcolumns(resetcolumns: any) {
    throw new Error('Method not implemented.');
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onValueChangeNavigationLevel(level) {
    this.onLoadnavigationItemsParentData(level);

  }
  fetchAppNavigationMenus() {
    this.spinnerShow('Loading Navigation items......')
    this.workflowService.getAppNavigationMenus().subscribe(
      (data) => {
        this.AppNavigationMenus = data; // Assuming the field as an array
        this.spinnerHide();
      },
      (error) => {
        console.error('Error fetching Navigation menu:', error);
        // Handle error, show message, etc.
      }
    );
  }
  onLoadnavigationItemsParentData(level) {
    let level_no = level - 1;
    this.workflowService.getallNavigationItems(level_no).subscribe(
      (data) => {
        this.navigationItemsParentData = data.data; // Assuming the field as an array

      },
      (error) => {
        console.error('Error fetching Navigation menu:', error);
        // Handle error, show message, etc.
      }
    );
  }

  onLoadnavigationLevelsData() {
    var data_submit = {
      'table_name': 'wf_navigation_levels'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.navigationLevelsData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onloadworkflowData() {
    var data_submit = {
      'table_name': 'wf_workflow_definition',
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowData = this.data_record.data;
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

  onLoadAppSystemInterfaceData() {
    var data_submit = {
      'table_name': 'wf_system_interfaces'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppSystemInterfaceData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadAppRegulatoryFunctionsData() {
    var data_submit = {
      'table_name': 'cfg_regulatory_functions'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppRegulatoryFunctionsData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadAppRegulatorySubFunctionsData() {
    var data_submit = {
      'table_name': 'cfg_regulatory_subfunctions'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppRegulatorySubFunctionsData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onLoadnavigationTypesData() {
    var data_submit = {
      'table_name': 'wf_navigation_types'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.navigationTypesData = this.data_record.data;
          }
        },
        error => {

        });

  }
  fetchNavigationItemsDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.countriesinfoData = this.data_record.data;
          }

        },
        error => {

        });

  }

  onAddNavigationItem() {
    this.navigationItemsFrm.reset();
    this.onAddNavigationItemVisible = true;
  }

  onAddProductCategoryClick() {
    this.addPopupVisible = true;
  }
  onFuncSaveNavigationData() {


    const formData = new FormData();
    const invalid = [];
    const controls = this.navigationItemsFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.navigationItemsFrm.invalid) {
      return;
    }

    this.spinnerShow('Saving ' + this.parameter_name);
    this.action_url = 'onsaveWorkflowConfigData';
    if (this.table_name == 'wf_navigation_items') {
      this.action_url = 'onsaveNavigationItemsConfigData';
    }
    this.spinner.show();

    this.workflowService.onSaveWorkflowDetailsDetails(this.table_name, this.navigationItemsFrm.value, this.action_url)
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchNavigationItemsDetails();
            this.fetchAppNavigationMenus();
            this.onAddNavigationItemVisible = false;
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

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  onPopupHidden() {
    this.fetchNavigationItemsDetails();
  }

  funcEditDetails(data) {
    this.navigationItemsFrm.patchValue(data.data);
    this.onAddNavigationItemVisible = true;
  }
  funcDeleteDetails(data) {
    this.navigationItemsFrm.patchValue(data.data);
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
  onDeleteNavigationDetails() {
    this.spinner.show();
    this.workflowService.onDeleteWorkflowsDetails(this.navigationItemsFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchNavigationItemsDetails();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }

        },
        error => {
          this.loading = false;
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