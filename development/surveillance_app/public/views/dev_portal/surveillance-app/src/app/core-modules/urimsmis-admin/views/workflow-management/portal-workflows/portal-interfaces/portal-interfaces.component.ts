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
  selector: 'app-portal-interfaces',

  templateUrl: './portal-interfaces.component.html',
  styleUrl: './portal-interfaces.component.css'
})
export class PortalInterfacesComponent {
   table_name: string;
      parameter_name: string;
      resetcolumns:string;
      show_advancesearch: boolean;
      workflowItemsFrm: FormGroup
      onAddWorkFlowItemVisible: boolean;
      hasReadpermissions: boolean;
      deletePopupVisible = false;
      is_enabled: boolean;
      enablePopupVisible: boolean;
      enabledisable_interface: string;
      enabledisable_interfacedescription: string;

      productCategoryData: any;
      checklistConfigVisible = false;
      premiseTypeData: any;
      workflow_id: number;
      config_record: string;
      regulatoryFunctionsData: any;
      regulatorySubFunctionsData: any;
      productTypeData:any;
      loadingVisible = false;
      spinnerMessage: string;
      workflowItemsData: any[] = [];
      workflowData:any;
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
            { text: "Edit ", action: 'edit_record', icon: 'fa fa-edit' },
            { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
            { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
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
        this.table_name = 'ptl_workflow_interfaces';
        this.parameter_name = "workflow_interfaces";
        this.checkScreenSize();
        
    }
    ngOnInit() {
      this.workflowItemsFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        description: new FormControl('', Validators.compose([])),
        code: new FormControl('', Validators.compose([])),
        order_no: new FormControl('', Validators.compose([])),
        
        resetcolumns: new FormControl('', Validators.compose([])),
        
        table_name: new FormControl('', Validators.compose([])),
        action: new FormControl('', Validators.compose([])),
        
        regulatory_function_id: new FormControl('', Validators.compose([])),
        regulatory_subfunction_id: new FormControl('', Validators.compose([])),
        
        routerlink: new FormControl('', Validators.compose([])),
        is_enabled: new FormControl('', Validators.compose([])),
       
      });
      
    this.fetchWorkflowItemsDetails();
    this.onloadworkflowData();
    this.onLoadregulatoryFunctionsData();
    // this.onLoadregulatorySubFunctionsData();
    this.onLoadproductTypeData();
    this.onLoadproductClassCategoryData();
    this.onLoadPremiseTypeData();
    
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
    
    onAddWorkFlowItem() {
      this.workflowItemsFrm.reset();
      this.onAddWorkFlowItemVisible = true;
    
    }
    onRegulatoryFunctionChange($event) {
      if ($event.selectedItem) {
        let regulatory_function = $event.selectedItem;
        this.onLoadregulatorySubFunctionsData(regulatory_function.id)
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
    
    fetchWorkflowItemsDetails() {
    
      var data_submit = {
        'table_name': this.table_name
      }
      this.workflowService.getPortalWorkflowsConfigs(data_submit)
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
  
    onLoadproductClassCategoryData() {
      var data_submit = {
        'table_name': 'cfg_prodclass_categories',
        // process_id: process_id
      }
      this.workflowService.getWorkflowConfigs(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              this.productCategoryData = this.data_record.data;
            }
          },
          error => {
    
          });
    
    }
    onLoadPremiseTypeData() {
      var data_submit = {
        'table_name': 'cfg_premises_types',
        // process_id: process_id
      }
      this.workflowService.getWorkflowConfigs(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              this.premiseTypeData = this.data_record.data;
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
      this.action_url = 'onsavePortalWorkflowConfigData';
     
      this.spinner.show();
    
      this.workflowService.onSavePortalWorkflowDetailsDetails(this.table_name, this.workflowItemsFrm.value, this.action_url)
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
      this.onAddWorkFlowItemVisible = true;
    }
    funcDeleteDetails(data) {
      this.workflowItemsFrm.patchValue(data.data);
      this.config_record = data.data.name;
      this.deletePopupVisible = true;
    }
    funcChecklistDetails(data){
      this.checklistConfigVisible = true;
      // this.workflow_id = data.workflow_id
    }

    iniateEnableDisableRecord() {

      this.spinnerShow('Saving_details');
      this.workflowService.onEnablePortalWorkflowsDetails(this.workflowItemsFrm.value, this.table_name, this.parameter_name)
        .subscribe(
          response => {
            this.spinner.hide();
            this.response = response;
            if (this.response.success) {
              this.fetchWorkflowItemsDetails();
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

    funcEnableDisableRecord(data) {
      this.workflowItemsFrm.patchValue(data.data);
  
      this.config_record = data.data.name;
      this.is_enabled = data.data.is_enabled;
      // console.log(this.is_enabled)
      if (this.is_enabled) {
        this.enabledisable_interface = "disable_workflow_interface";
        this.enabledisable_interfacedescription = "are_you_sure_you_want_to_disableworkflow_interface";
  
      }
      else {
        this.enabledisable_interface = "enable_workflow_interface";
        this.enabledisable_interfacedescription = "are_you_sure_you_want_to_enableworkflow_interface";
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
      } else if (action_btn.action === 'checklist_record'){
        this.funcChecklistDetails(data);
      }
    }
    
    onCellPrepared(e) {
      this.utilityService.onCellCountriesPrepared(e);
    }
    onDeletePortalWorkflowDetails() {
      this.spinnerShow('deleting ' + this.parameter_name);
    
      this.workflowItemsFrm.get('table_name')?.setValue('ptl_workflow_interfaces');
      this.workflowService.onDeletePortalWorkflowsDetails(this.workflowItemsFrm.value, 'ptl_workflow_interfaces', this.parameter_name)
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
