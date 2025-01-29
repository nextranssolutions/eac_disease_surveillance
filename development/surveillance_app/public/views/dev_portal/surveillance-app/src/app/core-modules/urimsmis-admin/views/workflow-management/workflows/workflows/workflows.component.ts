import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrl: './workflows.component.css'
})
export class WorkflowsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  show_advancesearch: boolean;
  workflowItemsFrm: FormGroup
  onAddWorkFlowItemVisible: boolean;
  hasReadpermissions: boolean;
  deletePopupVisible = false;
  workflowDetailsVisible = false;
  workflowStageDetailsVisible = false;
  workflowTransitionVisible = false;
  workflowStageActionDetailsVisible = false;
  workflowStageData: any;
  workflowApplicationStatusData: any;

  workflowStagesVisible =false;
  workflow_id: number;
  config_record: string;

  // tabPanelPopupVisible: boolean = false;
  selectedTabIndex = 0;
  tabNames = ["Workflows","WorkflowStages", "workflowTransitions"];
  // workflowTabName = ["WorkflowStage","WorkflowStageActions"];
  iconPosition:any='top';
  workflowStageStatusesData: any;
  workflowStatusData: any;
  workflowAllStageData: any;
  workflowSubmissionActionsData: any;
  workflowStagesData: any;
  workflowTransitionsData: any;
  workflowInterfaceData: any;
  workflowStagesFrm: FormGroup;
  stageCategoryData: any;
  stageStatusData: any;
  processTypeData: any;
  workflowStageActionsData: any;
  workflowProcessCategoryData: any;
  workflowTransitionFrm: FormGroup;
  workflowStageActionsItemsFrm: FormGroup
  is_status_tied = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  is_inspection_submission= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_checklist_tied= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_declarationstatus_tied= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_paymentrequest_submission= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_staticappprocess_defination= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  permitsubmission_status= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_external_usersubmission= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
 
  checklist_category= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_to_portal = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  needs_directive = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];



  needResponsibleUsrData= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  isManagerSubmissionData = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  workflowStageItemsFrm: FormGroup;







  regulatoryFunctionsData: any;
  regulatory_function_id: number;
  regulatorySubFunctionsData: any;
  productTypeData:any;
  loadingVisible = false;
  spinnerMessage: string;
  workflowItemsData: any[] = [];
  data_record: any;
  action_url: string;
  response: any;
  loading = false;
   tabsPositions: DxTabPanelTypes.Position[] = [
      'left', 'top', 'right', 'bottom',
    ];
    tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[1];
    stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
    stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
    screenWidth: any;

  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit workflow details", action: 'edit_record', icon: 'fa fa-edit' },
        // { text: "workflow details", action: 'workflow_details', icon: 'fa fa-code-fork' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  workflowStageActionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit workflow Stage details", action: 'edit_record', icon: 'fa fa-edit' },
        // { text: "workflow details", action: 'workflow_details', icon: 'fa fa-code-fork' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  constructor(
    public utilityService: UtilityService, 
    public toastr: ToastrService,
    private spinner: SpinnerVisibilityService,
    public workflowService: WokflowManagementService,
    public reportingAnalytics: ReportsService,
  ) {
    this.table_name = 'wkf_workflows';
    this.parameter_name = "workflows";
    this.checkScreenSize();
     
}
ngOnInit() {
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
        // regulated_productstype_id: new FormControl('', Validators.compose([])),
        firstName: new FormControl('', Validators.compose([])),
      });

  this.workflowStagesFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    workflow_id: new FormControl('', Validators.compose([])),
    stage_status: new FormControl('', Validators.compose([])),
    is_general: new FormControl('', Validators.compose([])),
    stage_category_id: new FormControl('', Validators.compose([])),
    is_manager_query: new FormControl('', Validators.compose([])),
    is_manager_precheckingquery: new FormControl('', Validators.compose([])),
    is_manager_query_response: new FormControl('', Validators.compose([])),
    is_screeningquery_response: new FormControl('', Validators.compose([])),
    is_portalapp_initialstage: new FormControl('', Validators.compose([])),
    needs_responsible_user: new FormControl('', Validators.compose([])),
    is_inspection: new FormControl('', Validators.compose([])),
    is_inspassessment_stage: new FormControl('', Validators.compose([])),
    regulatory_function_id: new FormControl('', Validators.compose([])),
    is_reinspectionintial: new FormControl('', Validators.compose([])),
    is_manager_submission: new FormControl('', Validators.compose([])),
    process_type_id: new FormControl('', Validators.compose([])),
    appdismissal_allowed: new FormControl('', Validators.compose([])),
    interface_id: new FormControl('', Validators.compose([])),
    servicedelivery_timeline: new FormControl('', Validators.compose([])),
    is_caparesponseinitial:new FormControl('', Validators.compose([])),
    process_category_id: new FormControl('', Validators.compose([])),
    // stage_status_id: new FormControl('', Validators.compose([])),
    
  });
 
  this.workflowTransitionFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    workflow_action_id:new FormControl('', Validators.compose([])),
    workflow_status_id: new FormControl('', Validators.compose([])),
    prevworkflow_stage_id: new FormControl('', Validators.compose([])),
    nextworkflow_stage_id: new FormControl('', Validators.compose([])),
    nextworkflow_status_id: new FormControl('', Validators.compose([])),
  });

  this.workflowStageItemsFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    stage_status_id:new FormControl('', Validators.compose([])),
    interface_id: new FormControl('', Validators.compose([])),
    process_category_id: new FormControl('', Validators.compose([])),
  });

  this.workflowStageActionsItemsFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    stage_id: new FormControl('', Validators.compose([])),
    is_status_tied: new FormControl('', Validators.compose([])),
    application_status_id: new FormControl('', Validators.compose([])),
    is_inspection_submission: new FormControl('', Validators.compose([])),
    is_checklist_tied: new FormControl('', Validators.compose([])),
    is_declarationstatus_tied: new FormControl('', Validators.compose([])),
    is_paymentrequest_submission: new FormControl('', Validators.compose([])),
    is_staticappprocess_defination: new FormControl('', Validators.compose([])),
    permitsubmission_status_id: new FormControl('', Validators.compose([])),
    is_external_usersubmission: new FormControl('', Validators.compose([])),
    checklist_category_id: new FormControl('', Validators.compose([])),
    is_to_portal: new FormControl('', Validators.compose([])),
    needs_directive: new FormControl('', Validators.compose([])),
  });

  

  

      
  this.fetchWorkflowItemsDetails();
  // this.onloadworkflowData();
  this.onLoadregulatoryFunctionsData();
  // this.onLoadregulatorySubFunctionsData(this.regulatory_function_id);
  this.onLoadproductTypeData();
  this.onLoadworkflowStageStatusesData();
  this.fetchWorkflowStagesDetails(this.workflow_id);
  this.fetchWorkflowTransitionsDetails(this.workflow_id);
  this.onLoadworkflowStatusData();
  this.onloadworkflowAllStageData();
  this.onLoadWorkflowSubmissionTransitonActionsData();
  this.onLoadworkflowInterfaceData();
  this.onLoadStageCategoryData();
  this.onLoadStageStatusData();
  this.onLoadProcessTypesData();
  this.onLoadProcessCategoryData();
  this.onLoadStageData();
  this.onLoadApplicationStatusData();

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
      this.tabsPosition = 'top';
    }
  }


onAddWorkFlowItem(){
  this.workflowItemsFrm.reset();
  this.workflowDetailsVisible = true;
  this.workflowStagesData = []; 
}

onAddWorkFlowStage(){
  this.workflowStageItemsFrm.reset();
  this.workflowStagesVisible = true;

  this.workflowStageItemsFrm.get('table_name')?.setValue('wkf_workflow_stages');
    this.workflowStageItemsFrm.get('workflow_id')?.setValue(this.workflow_id);
}

onAddWorkFlowTransition(){
 this.workflowTransitionFrm.reset();
 this.workflowTransitionVisible = true;

 this.workflowTransitionFrm.get('table_name')?.setValue('wkf_workflow_transitions');
 this.workflowTransitionFrm.get('workflow_id')?.setValue(this.workflow_id);
}

onAddWorkFlowStageActions(){
  this.workflowStageActionsItemsFrm.reset();
  this.workflowStageActionDetailsVisible = true;
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


fetchWorkflowStagesDetails(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  this.workflowService.getAppWorkflowStages(workflow_id)
  .subscribe(
    data => {
      ;
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowStagesData = this.data_record.data;
      }
    });
    this.spinnerHide();
  // .subscribe(
  //   (data) => {
      
  //     this.workflowStagesData = data; 
  //     this.spinnerHide();
  //     this.workflowDetailsVisible = true;
  //   },
  //   (error) => {
  //     console.error('Error fetching Navigation menu:', error);
  //     this.spinnerHide();
  //   }
  // );
  

}

fetchWorkflowStageActionsDetails(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  this.workflowService.getAppWorkflowStages(workflow_id)
  .subscribe(
    data => {
      ;
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowStageActionsData = this.data_record.data;
      }
    });
    this.spinnerHide();
  

}

fetchWorkflowTransitionsDetails(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  this.workflowService.getAppWorkflowTransitions(workflow_id)
  .subscribe(
    data => {
      ;
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowTransitionsData = this.data_record.data;
      }
    });
    this.spinnerHide();

}
onRegulatoryFunctionChange($event) {
  if ($event.selectedItem) {
    let regulatory_function = $event.selectedItem;
    this.onLoadregulatorySubFunctionsData(regulatory_function.id)
  }
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
    regulatory_function_id : regulatory_function_id
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


onloadworkflowAllStageData() {
  var data_submit = {
    'table_name': 'wkf_workflow_stages'
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
onLoadworkflowStatusData() {
  var data_submit = {
    'table_name': 'wf_workflow_statuses',
    // process_id:process_id
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
onLoadWorkflowSubmissionTransitonActionsData() {
  var data_submit = {
    'table_name': 'wf_workflowsubmission_actions',
    // process_id: process_id
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
onLoadworkflowInterfaceData() {
  var data_submit = {
    'table_name': 'wf_workflow_interfaces',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowInterfaceData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadStageCategoryData() {
  var data_submit = {
    'table_name': 'wkf_stage_categories',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.stageCategoryData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadStageStatusData() {
  var data_submit = {
    'table_name': 'wf_stage_statuses',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.stageStatusData = this.data_record.data;
        }
      },
      error => {

      });

}
onLoadProcessTypesData() {
  var data_submit = {
    'table_name': 'cfg_process_types',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.processTypeData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadProcessCategoryData() {
  var data_submit = {
    'table_name': 'wkf_workflow_process_category',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowProcessCategoryData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadStageData() {
  var data_submit = {
    'table_name': 'wkf_workflow_stages',
    // process_id: process_id
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
onLoadApplicationStatusData() {
  var data_submit = {
    'table_name': 'cfg_application_statuses',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowApplicationStatusData = this.data_record.data;
        }
      },
      error => {

      });

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

  this.spinner.show();

  this.workflowService.onSaveWorkflowDetailsDetails(this.table_name, this.workflowItemsFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowItemsDetails();
          // this.onAddWorkFlowItemVisible = false;
          this.toastr.success(this.response.message, 'Response');
          // this.onAddWorkFlowItemVisible = false;

          this.workflow_id = this.response.record_id;
         
          this.selectedTabIndex = 1;
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


onFuncSaveWorlflowStageTransitionData() {


  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowTransitionFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowTransitionFrm.invalid) {
    return;
  }

  this.workflowTransitionFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving Process Transition');
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();

  this.workflowService.onSaveWorkflowDetailsDetails('wf_workflow_transitions', this.workflowTransitionFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowTransitionsDetails(this.workflow_id);
          this.workflowTransitionVisible = false;
          this.toastr.success(this.response.message, 'Response');
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
onFuncSaveWorkflowStageData() {


  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowStagesFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowStagesFrm.invalid) {
    return;
  }

  this.workflowStagesFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();

  this.workflowService.onSaveWorkflowDetailsDetails('wkf_workflow_stages', this.workflowStagesFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowStagesDetails(this.workflow_id);
          this.workflowStagesVisible = false;
          this.toastr.success(this.response.message, 'Response');
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

onFuncSaveWorlflowStageActionData() {


  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowStageActionsItemsFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowStageActionsItemsFrm.invalid) {
    return;
  }

  this.workflowStageActionsItemsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();

  this.workflowService.onSaveWorkflowDetailsDetails('wkf_workflow_actions', this.workflowStageActionsItemsFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowStageActionsDetails(this.workflow_id);
          this.workflowStageDetailsVisible = false;
          this.toastr.success(this.response.message, 'Response');
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
finishFunction() {

}

onPopupHidden() {
  this.fetchWorkflowItemsDetails();
}

funcEditDetails(data) {
  this.workflowItemsFrm.patchValue(data.data);
  this.workflowDetailsVisible = true;
 
  this.workflow_id = data.data.id;
  this.fetchWorkflowStagesDetails(data.data.id);
  this.fetchWorkflowTransitionsDetails(data.data.id) 
  
}
funcDeleteDetails(data) {
  this.workflowItemsFrm.patchValue(data.data);
  this.config_record = data.data.name;
  this.deletePopupVisible = true;
}
funcWorkflowDetails(data){
 
}

funcActionColClick(e, data) {
  var action_btn = e.itemData;
  if (action_btn.action === 'edit_record') {
    this.funcEditDetails(data);
  } else if (action_btn.action === 'delete_record') {
    this.funcDeleteDetails(data);
  } else if (action_btn.action === 'block_record') {
    this.funcDeleteDetails(data);
  } else if (action_btn.action === 'workflow_details'){
    this.funcWorkflowDetails(data);
  }
}

funcEditStageDetails(data){
//  this.workflowStageDetailsVisible = true
//  this.workflowStagesFrm.reset();
this.workflowStagesFrm.reset();
this.workflowStageDetailsVisible = true
this.workflowStagesFrm.patchValue(data.data);

this.workflowStagesFrm.get('table_name')?.setValue('wkf_workflow_stages');
this.workflowStagesFrm.get('workflow_id')?.setValue(this.workflow_id);

}

funcStageActionClick(e, data) {
  var action_btn = e.itemData;
  if (action_btn.action === 'edit_record') {
    this.funcEditStageDetails(data);
  } else if (action_btn.action === 'delete_record') {
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




 

  funcUserRolesTabClick(e){
    //add logic
    let tab_index = e.itemIndex;
    
    if(tab_index ==1 || tab_index ==2){
      let user_group_id = this.workflowItemsFrm.get('id')?.value;
  
      if(user_group_id < 1){
          //validate the form based on saving 
          this.selectedTabIndex = 0;
          this.toastr.error('Kindly save the Workflow details Before before moving to the next step.', 'Response');
      }
    }
  }
  onNextNavigationItems(nextStep){
    this.selectedTabIndex = this.tabNames.indexOf(nextStep);
  }

  // onNextWorkflowNavItem(nextTab){
  //   this.selectedTabIndex = this.workflowTabName.indexOf(nextTab);
  // }

  onUpdateWorkflowsSubmit(){

  }
}
