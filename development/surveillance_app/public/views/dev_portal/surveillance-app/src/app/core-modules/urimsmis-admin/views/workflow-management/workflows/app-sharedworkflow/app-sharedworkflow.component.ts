import { Component, Input, ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-app-sharedworkflow',

  templateUrl: './app-sharedworkflow.component.html',
  styleUrl: './app-sharedworkflow.component.css'
})

export class AppSharedworkflowComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  @Input() resetcolumns: string;
  workflowProcessData:any;
  workflowItemsData: any[] = [];
  workflowStageData: any;
  workflowStatusData: any;
  processData: any;
  workflowData: any;
  workflowAllStageData: any;
  workflowItemsFrm: FormGroup;
  workflowStageStatusesData: any;
  statusesActionData: any;
  systemInterfacesData: any;
  dashboardTypeData: any;
  navigationLevelsData: any;
  navigationTypesData: any;
  navigationItemsParentData: any;
  actionTypeData: any;
  onAddWorkFlowItemVisible: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  show_advancesearch: boolean;
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
  is_hidden: boolean = true;
  confirmationData: any;
  workflowSubmissionActionsData: any;

  regulatoryFunctionsData: any;
  regulatorySubFunctionsData: any;
  productTypeData: any;
  workflow_id: any;
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

    this.workflowItemsFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      order_no: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      workflow_id: new FormControl('', Validators.compose([])),
      prevworkflow_stage_id: new FormControl('', Validators.compose([])),
      nextworkflow_stage_id: new FormControl('', Validators.compose([])),
      workflow_status_id: new FormControl('', Validators.compose([])),
      resetcolumns: new FormControl('', Validators.compose([])),
      stage_status_id: new FormControl('', Validators.compose([])),
      table_name: new FormControl('', Validators.compose([])),
      workflow_action_id: new FormControl('', Validators.compose([])),
      statuses_action_id: new FormControl('', Validators.compose([])),
      action: new FormControl('', Validators.compose([])),
      is_default_action: new FormControl('', Validators.compose([])),
      workflow_actionstype_id: new FormControl('', Validators.compose([])),
      system_interface_id: new FormControl('', Validators.compose([])),
      dashboard_type_id: new FormControl('', Validators.compose([])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),
      product_type_id: new FormControl('', Validators.compose([])),
      routerlink: new FormControl('', Validators.compose([])),

    });
    if(this.table_name == 'wf_workflow_transitions'){
      //nextworkflow_status_id
      this.workflowItemsFrm.addControl('nextworkflow_status_id', new FormControl('', Validators.required));
    }
    // other initializations

    this.fetchWorkflowItemsDetails();
    this.onLoadprocessData();
    this.onLoadnavigationTypesData();
    this.onloadworkflowData();
    this.onLoadregulatoryFunctionsData();
    // this.onLoadregulatorySubFunctionsData();
    this.onLoadproductTypeData();
    this.onLoadworkflowStageData(this.workflow_id);

    this.onLoadworkflowStageStatusesData();
    this.onLoadWorkflowSubmissionActionsData();
    // this.onLoadworkflowStageData(workflow_id);
   
    this.onLoadDashboardTypeData();

    // this.onloadworkflowAllStageData();
    this.onLoadconfirmationData();

    this.spinnerHide();
  }
  onValueChangeWorkflows($event) {

 
      if ($event.selectedItem) {
  
        let data = $event.selectedItem;
      
        this.onLoadworkflowStageData(data.id);

      }
   
  }
  onValueChangeprocesses($event) {
    if ($event.selectedItem) {

      let data = $event.selectedItem;
      this.onLoadworkflowStatusData(data.id);
      this.onLoadStatusesActionData(data.id);
      this.onLoadActionTypeData(data.id);
      this.onLoadWorkflowSubmissionTransitonActionsData(data.id);
      
      this.onLoadworkflowProcessData(data.id);


    }
}
onValueChangeWorkflowDefinations($event) {
  if ($event.selectedItem) {

    let data = $event.selectedItem;
    this.onLoadSystemInterfacesData(data.id);

  }
}

onRegulatoryFunctionChange($event) {
  if ($event.selectedItem) {
    let regulatory_function = $event.selectedItem;
    this.onLoadregulatorySubFunctionsData(regulatory_function.id)
  }
}


  onLoadconfirmationData() {
    let data_submit = {
      'table_name': 'par_confirmations',
      is_enabled: true,
    }
    this.workflowService.getWorkflowConfigs(data_submit)
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

  onLoadworkflowStageStatusesData() {
    var data_submit = {
      'table_name': 'wf_stage_statuses',
      
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowStageStatusesData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadStatusesActionData(process_id) {
    var data_submit = {
      'table_name': 'wf_statuses_actions',
      process_id:process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.statusesActionData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onLoadworkflowStatusData(process_id) {
    var data_submit = {
      'table_name': 'wf_workflow_statuses',
      process_id:process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowStatusData = this.data_record.data;
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
  onloadworkflowAllStageData() {
    var data_submit = {
      'table_name': 'wf_workflow_stages'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowAllStageData = this.data_record.data;
          }
        },
        error => {

        });


  }
  onLoadworkflowStageData(workflow_id) {
    var data_submit = {
      'table_name': 'wf_workflow_stages',
      'workflow_id': workflow_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowStageData = this.data_record.data;
          }
        },
        error => {

        });

  }
  
  onLoadworkflowProcessData(process_id) {
    var data_submit = {
      'table_name': 'wf_workflow_definition',
      // process_id: process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowProcessData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadregulatoryFunctionsData() {
    var data_submit = {
      'table_name': 'cfg_regulatory_functions',
      // process_id: process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatoryFunctionsData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadregulatorySubFunctionsData(regulatory_function_id) {
    var data_submit = {
      'table_name': 'cfg_regulatory_subfunctions',
      regulatory_function_id: regulatory_function_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatorySubFunctionsData = this.data_record.data;
          }
        },
        error => {

        });

  }

 

  onLoadproductTypeData() {
    var data_submit = {
      'table_name': 'cfg_regulated_productstypes',
      // process_id: process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productTypeData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onloadworkflowData() {
    var data_submit = {
      'table_name': 'wkf_workflows',
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
  onLoadprocessData() {
    var data_submit = {
      'table_name': 'wf_processes'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.processData = this.data_record.data;
          }
        },
        error => {

        });

  }
  // 

  onLoadActionTypeData(process_id){
    var data_submit = {
      'table_name': 'wf_workflow_actionstypes',
      process_id:process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit).subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.actionTypeData = this.data_record.data;
        }
      }
    )
  }
  onLoadWorkflowSubmissionTransitonActionsData(process_id) {
    var data_submit = {
      'table_name': 'wf_workflowsubmission_actions',
      process_id: process_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowSubmissionActionsData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onLoadWorkflowSubmissionActionsData() {
    var data_submit = {
      'table_name': 'wf_workflowsubmission_actions'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowSubmissionActionsData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadSystemInterfacesData(workflow_id) {
    var data_submit = {
      'table_name': 'wf_system_interfaces',
      workflow_id:workflow_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.systemInterfacesData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadDashboardTypeData() {
    var data_submit = {
      'table_name': 'sys_dashboard_types'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.dashboardTypeData = this.data_record.data;
          }
        },
        error => {

        });

  }


  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  fetchWorkflowItemsDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowItemsData = this.data_record.data;
          }

        },
        error => {

        });

  }

  onAddWorkFlowItem() {
    this.workflowItemsFrm.reset();
    this.onAddWorkFlowItemVisible = true;

  }

  onFuncSaveWorlflowData() {


    const formData = new FormData();
    const invalid = [];
    const controls = this.workflowItemsFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.workflowItemsFrm.invalid) {
      return;
    }


    this.workflowItemsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.workflowItemsFrm.get('table_name')?.setValue(this.table_name);
    this.spinnerShow('Saving ' + this.parameter_name);
    this.action_url = 'onsaveWorkflowConfigData';
    if (this.table_name == 'wf_navigation_items') {
      this.action_url = 'onsaveNavigationItemsConfigData';
    }
    this.spinner.show();

    this.workflowService.onSaveWorkflowDetailsDetails(this.table_name, this.workflowItemsFrm.value, this.action_url)
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchWorkflowItemsDetails();
            this.onAddWorkFlowItemVisible = false;
            this.toastr.success(this.response.message, 'Response');
            this.onAddWorkFlowItemVisible = false;
            this.spinnerHide();
          } else {
            this.toastr.error(this.response.message, 'Alert');
            this.spinnerHide();
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
    this.fetchWorkflowItemsDetails();
  }

  funcEditDetails(data) {
    this.workflowItemsFrm.patchValue(data.data);
    this.onAddWorkFlowItemVisible = true;
  }
  funcDeleteDetails(data) {
    this.workflowItemsFrm.patchValue(data.data);
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
  onDeleteWorkflowDetails() {
    this.spinnerShow('deleting ' + this.parameter_name);

    this.workflowService.onDeleteWorkflowsDetails(this.workflowItemsFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {

          this.response = response;
          if (this.response.success) {
            this.fetchWorkflowItemsDetails();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          } this.spinnerHide();

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