import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { Change, AppmenuService } from 'src/app/core-services/appmenu.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
@Component({
  selector: 'app-shared-sys-administration',
  templateUrl: './shared-sys-administration.component.html',
  styleUrl: './shared-sys-administration.component.css'
})
export class SharedSysAdministrationComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  @Input() resetcolumns: string;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean
  iconPosition: any = 'top';
  data: any[];
  editRowKey: any;
  editColumnName: any;
  changes: Array<any>;
  workflowPermissionData: any;
  navigationTypesData: any;
  createNewDataFrm: FormGroup;
  isnewrecord: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  show_advancesearch: boolean;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  showWizard = false;
  AccountTypesData: any;
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
  isLoading: boolean;
  sysadmin: any;
  workflowData: any;
  AppNavigationMenus: any;
  user_group_id: number;
  updateUsrPermissNewDataFrm: FormGroup;
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];


  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  loadingVisible: boolean;
  spinnerMessage: string;
  updateuserPermissionfrm: any;
  navigations: any[] = [];
  userAccessLevels: any[] = [];
  dashboardTypeData: any;
  accountTypesData: any;
  instutitionTypesData: any;
  systemFunctionalitiesData: any;
  partnerStateOptions = [
    { value: true, text: 'True' },
    { value: false, text: 'False' },
  ];
  selectedTabIndex = 0;
  selectTextOnEditStart: boolean;
  startEditAction: boolean;
  systemProcessesData:any;
  tabNames = ["UserGroup", "NavigationPermission", "WorkflowPermission"]
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private AuthService: AuthenticationService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private admnistrationService: ServiceAdmnistrationService,
    private userGroupsService: AppmenuService,
    public configService: ConfigurationsService,
    private workflowService: WokflowManagementService,
    private reportingAnalytics: ReportsService
  ) {

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl('', Validators.compose([Validators.required])),
      resetcolumns: new FormControl(this.resetcolumns, Validators.compose([])),
      account_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      routerLink: new FormControl(this.resetcolumns, Validators.compose([])),
      // dashboard_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      has_partnerstate_defination: new FormControl(this.resetcolumns, Validators.compose([])),
      institution_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      is_super_admin: new FormControl(this.resetcolumns, Validators.compose([])),
    });
    if(this.table_name == 'cfg_systems_functionalities'){
      
      this.createNewDataFrm.addControl('process_id',new FormControl('', Validators.required));
    }
  }
  ngOnInit() {
    this.fetchSysAdminDetails();
    this.fetchPermissionsDetails();
    this.onLoadnavigationTypesData();
    this.onLoadsystemProcessesData();
    if(this.table_name == 'cfg_systems_functionalities'){
      this.createNewDataFrm.addControl('process_id',new FormControl('', Validators.required));
    }
    this.spinnerShow('Loading ' + this.parameter_name);
    this.spinnerHide();

    if (this.table_name === 'usr_users_groups') {
      this.actionsMenuItems[0].items.splice(2, 0,
        { text: "Permission", action: 'user_permissions', icon: 'fa fa-users' }
      );
    }
    this.onLoadAccountTypeData();
    this.onloaddashboardTypeData();
    this.onloadaccountTypesData();
    this.onloadinstutitionTypesData();

  }
  funcUserRolesTabClick(e) {
    let tab_index = e.itemIndex;

    if (tab_index == 1 || tab_index == 2) {
      let user_group_id = this.createNewDataFrm.get('id')?.value;

      if (user_group_id < 1) {
        this.selectedTabIndex = this.tabNames.indexOf('UserGroup');
        this.toastr.error('Kindly save the Group details Before before moving to the next step.', 'Response');
      }
    }
  }
  onSavingUserNavigationPermissions(e) {
    let user_group_id = this.createNewDataFrm.get('id')?.value;

    this.changes = [];
    let access_changes = e.changes;
    for (let rec of access_changes) {
      let data_changeobj = {
        navigation_id: rec.key,
        user_group_id: user_group_id,
        user_access_levels_id: rec.data.user_access_levels_id
      };

      this.changes.push(data_changeobj);
    }

    if (this.changes) {
      let post_data = JSON.stringify(this.changes);
      this.spinnerShow('Saving ' + this.parameter_name);
      this.spinner.show();
      this.admnistrationService.onSavingUserNavigationPermissions('sys_usergroup_navpermissions', this.createNewDataFrm.value, post_data, 'onSavingUserNavigationPermissions')
        .subscribe(
          response => {
            this.response = response;
            if (this.response.success) {
              this.fetchAppNavigationMenus(user_group_id);
              
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
          }
        );
    }

  }
  onNextNavigationItems(nextStep) {
    this.selectedTabIndex = this.tabNames.indexOf(nextStep);
  }
  onloadinstutitionTypesData() {
    var data_submit = {
      'table_name': 'cfg_institutions_types',
      is_enabled: true,
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.instutitionTypesData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onloadaccountTypesData() {
    var data_submit = {
      'table_name': 'sys_account_types',
      is_enabled: true,
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.accountTypesData = this.data_record.data;
          }
        },
        error => {

        });
  }


  onloaddashboardTypeData() {

    var data_submit = {
      'table_name': 'sys_dashboard_types',
      is_enabled: true,
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
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
  onLoadAccountTypeData() {

    var data_submit = {
      'table_name': 'sys_account_types',
      is_enabled: true,
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.AccountTypesData = this.data_record.data;
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
  fetchSysAdminDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.sysadmin = this.data_record.data;
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

  onAddNewRecord() {

    this.createNewDataFrm.reset();
    this.isnewrecord = true;
    if (this.table_name == 'usr_users_groups') {
      this.AppNavigationMenus = [];
    }
  }

  onFuncSaveRecordData() {

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

    this.spinnerShow('Saving ' + this.parameter_name);
    this.spinner.show();
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.createNewDataFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.fetchSysAdminDetails();
            this.isnewrecord = false;
            this.record_id = this.response.record_id;
            this.createNewDataFrm.get('id')?.setValue(this.record_id);
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
    this.fetchSysAdminDetails();
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.user_group_id = data.data.id;
    this.isnewrecord = true;
    if(this.table_name == 'usr_users_groups'){
      this.fetchWorkflowPermissionData(data.data.id)
    }
  
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
    } else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    }else if (action_btn.action === 'block_record') {
      this.funcDeleteDetails(data);
    } else if (action_btn.action === 'user_permissions') {
      this.funcEditPermissionDetails(data);
    }
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


  iniateEnableDisableRecord() {

    this.spinnerShow('Saving_details');
    this.configService.onEnableConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchSysAdminDetails();
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
  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }
  onDeleteSystemAdministrationDetails() {
    this.spinner.show();
    this.admnistrationService.onDeleteSystemAdministrationDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchSysAdminDetails();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;          }
          else {
            this.toastr.error(this.response.message, 'Response');
          }
        },
        error => {
          this.loading = false;
        });

  }
  fetchPermissionsDetails() {

    var userAccessLevels_fetch = {
      'table_name': 'usr_users_accesslvls'
    }
    this.admnistrationService.onLoadSystemAdministrationData(userAccessLevels_fetch)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userAccessLevels = this.data_record.data;
          }

        },
        error => {

        });

  }
  onLoadsystemProcessesData() {
    var data_submit = {
      'table_name': 'wf_processes',
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.systemProcessesData = this.data_record.data;
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
  fetchAppNavigationMenus(user_group_id) {
    this.spinnerShow('Loading User Permissions Details');
    this.admnistrationService.getAppUserGroupNavigationMenus(user_group_id).subscribe(
      (data) => {
        this.AppNavigationMenus = data;
        this.spinnerHide();

        this.tabPanelPopupVisible = true;
      },
      (error) => {
        console.error('Error fetching Navigation menu:', error);
        this.spinnerHide();
      }
    );
  }
  onUpdateUserPermissionSubmit() {
    // Gather values from the form
    const groupId = this.updateuserPermissionfrm.value.id;
    const groupName = this.updateuserPermissionfrm.value.name;
    const has_partnerstate_defination = this.updateuserPermissionfrm.value.has_partnerstate_defination
    const groupDescription = this.updateuserPermissionfrm.value.description;
    this.showWizard = true;
  }

  funcEditPermissionDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.fetchAppNavigationMenus(data.data.id)
    this.user_group_id = data.data.id;
    this.fetchWorkflowPermissionData(data.data.id)


  }
  onSavingNavigation(e: any) {
    const groupId = this.createNewDataFrm.value.id;
    const change = e.changes[0];

    if (change) {

      //Trouble retrieving the navigation name
      change.data.user_group_id = groupId;
      change.data.navigation_item_id = change.key;
      change.data.name = "GroupNavPar:" + change.data.user_group_id + "_" + change.data.user_access_levels_id + "_" + change.data.navigation_item_id;

      e.cancel = true;
      e.promise = this.processSaving(change);
    }
  }
  async processSaving(change: Change<any>) {
    this.isLoading = true;
    try {
      await this.userGroupsService.saving(change);
      this.toastr.success('Association added successfully');
    }
    catch (error) {
      console.error('Error adding association:', error);
      this.toastr.error('Error adding association, already exists');
    }
    finally {
      this.isLoading = false;
    }
  }
  editorPreparing(e) {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.cancel = true;
    }
  }

  onRolesCellPrepared(e) {
    this.onCellUserAccountPrepared(e);
  }
  onCellUserAccountPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "user_access_levels_id") {
      let user_access_levels_id = e.data.user_access_levels_id;

      if (user_access_levels_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#2e2e2e';

      } else if (user_access_levels_id == 2) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#0000FF';

      } else if (user_access_levels_id == 4) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#50c878';

      } else {

        e.cellElement.style.color = 'white';

      }
    }
  }
  fetchWorkflowPermissionData(user_group_id) {
    this.spinnerShow('Loading User Workflow Details');
    this.admnistrationService.getAppUserGroupWorkflowPermission(user_group_id).subscribe(
      (data) => {
        this.workflowPermissionData = data.data;

        this.spinnerHide();
        // this.tabPanelPopupVisible = true;
      },
      (error) => {
        console.error('Error fetching Navigation menu:', error);
        this.spinnerHide();
      }
    );
  }
  onSavingUserWorkflowPermissions(e) {
    // apply changes to local data
    let user_group_id = this.createNewDataFrm.get('id')?.value;
    this.changes = [];
    let access_changes = e.changes;
    for (let rec of access_changes) {

      let data_changeobj = {
        workflow_stage_id: rec.key,
        user_group_id: user_group_id,
        user_access_levels_id: rec.data.user_access_levels_id
      };
      this.changes.push(data_changeobj);
    }
    //call to the back end 
    if (this.changes) {
      let post_data = JSON.stringify(this.changes);
      this.spinnerShow('Saving ' + this.parameter_name);
      this.spinner.show();
      this.admnistrationService.onSavingUserNavigationPermissions('sys_user_workflowstagepermissions', this.createNewDataFrm.value, post_data, 'onSavingUserWorkflowPermissions')
        .subscribe(
          response => {
            this.response = response;
            //the details 
            if (this.response.success) {
              this.fetchAppNavigationMenus(user_group_id);

              this.fetchWorkflowPermissionData(user_group_id)
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

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }

  }
}
