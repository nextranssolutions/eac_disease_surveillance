import { Component, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { AppmenuService, Change } from 'src/app/core-services/appmenu.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})


export class UserGroupsComponent implements OnInit {
  resetcolumns = 'dashboard_type_id,resetcolumns,routerLink,has_partnerstate_defination';
  workflowPermissionData:any;
  table_name:string = 'usr_users_groups';
  parameter_name:string = "User Group & Permissions Management";
  iconPosition:any='top';
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  user_group_id:number;
  data: any[];
  editRowKey: any;
  editColumnName: any;
  changes: Array<any>;
  workflowData:any;
  workflowStageData:any;
  navigationTypesData:any;
  regulatoryFunctionData: any;
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
  showWizard = false; // Add this variable to control the visibility of the wizard
  AccountTypesData:any;
  allAccountTypesData:any;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id:number;
  addPopupVisible = false;
  deletePopupVisible = false;
  data_record: any;
  config_record:string;
  isLoading:boolean;
  sysadmin: any;
  AppNavigationMenus:any;
  updateUsrPermissNewDataFrm:FormGroup;
  AppRegulatoryFunction: any;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
      //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit Permission", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  allinstutitionTypesData:any;
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;

  
  loadingVisible: boolean;
  spinnerMessage: string;
  updateuserPermissionfrm: any;
  navigations: any[] = [];
  userAccessLevels: any[] = [];
  dashboardTypeData:any;
  accountTypesData:any;
  instutitionTypesData:any;
  partnerStateOptions = [
    { value: true, text: 'True' },
    { value: false, text: 'False' },
  ];
  selectedTabIndex = 0;
  selectTextOnEditStart:boolean;
  startEditAction:boolean;
  tabNames = ["UserGroup","RegulatoryFunctions", "NavigationPermission", "WorkflowPermission"]
  constructor(
    
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
     public modalService: NgxSmartModalService,
    private admnistrationService: ServiceAdmnistrationService,
    private userGroupsService: AppmenuService,
    private workflowService:WokflowManagementService,
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
      dashboard_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      has_partnerstate_defination: new FormControl(this.resetcolumns, Validators.compose([])),
      // institution_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      is_super_admin: new FormControl('', Validators.compose([]))

    });
   // this.resetcolumns = 'resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
  }
ngOnInit() {
  // other initializations
  this.fetchSysAdminDetails();
  this.fetchPermissionsDetails();
  this.onLoadnavigationTypesData();
  this.onLoadregulatoryFunctionData();
  this.spinnerShow('Loading '+this.parameter_name);
  this.spinnerHide();
  this.checkScreenSize();

  //for the action menu

  // if (this.table_name === 'usr_users_groups') {
  //   // Insert the new menu item at index 2 (third position)
  //   this.actionsMenuItems[0].items.splice(2, 0,
  //     { text: "Permission", action: 'user_permissions', icon: 'fa fa-users' }
  //   );
  // }

  this.onLoadAllAccountTypeData();
  this.onloaddashboardTypeData();
  this.fetchAppRegulatoryFunction(this.user_group_id);
  // this.onloadallinstutitionTypesData();

}
@HostListener('window:resize', ['$event'])
onResize(event: Event): void {
  this.screenWidth = window.innerWidth;
  this.checkScreenSize();
}

checkScreenSize(): void {
  if (this.screenWidth < 768) {
    this.tabsPosition = 'top';
  } else {
    this.tabsPosition = 'left';
  }
}

onAccountTypeSelection($event){
  if ($event.selectedItem) {
    let data = $event.selectedItem;
    // this.onloadinstutitionTypesData(data.id)
  }
}
funcUserRolesTabClick(e){
  //add logic
  let tab_index = e.itemIndex;
  
  if(tab_index ==1 || tab_index ==2){
    let user_group_id = this.createNewDataFrm.get('id')?.value;

    if(user_group_id < 1){
        //validate the form based on saving 
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save the Group details Before before moving to the next step.', 'Response');
    }
  }
}
onSavingUserNavigationPermissions(e) {
  // apply changes to local data
  let user_group_id = this.createNewDataFrm.get('id')?.value;

  this.changes = [];
  let access_changes = e.changes;
  for (let rec of access_changes) {
      let data_changeobj = {
            navigation_id: rec.key,
            user_group_id:user_group_id,
            user_access_levels_id : rec.data.user_access_levels_id
      };

      this.changes.push(data_changeobj);
  }
  
//call to the back end 
  if(this.changes){
    let post_data = JSON.stringify(this.changes);
    this.spinnerShow('Saving '+this.parameter_name);
    
    this.admnistrationService.onSavingUserNavigationPermissions('sys_usergroup_navpermissions', this.createNewDataFrm.value, post_data,'onSavingUserNavigationPermissions')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchAppNavigationMenus(user_group_id);
            this.fetchAppRegulatoryFunction(user_group_id);
            
            this.fetchWorkflowPermissionData(user_group_id) 
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();
  
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          // 
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          // 
          this.spinnerHide();
        });
  }

}

onSavingRegulatoryFunctionPermissions(e){
// apply changes to local data
let user_group_id = this.createNewDataFrm.get('id')?.value;

this.changes = [];
let access_changes = e.changes;
for (let rec of access_changes) {
    let data_changeobj = {
          regulatory_function_id: rec.key,
          user_group_id:user_group_id,
          user_access_levels_id : rec.data.user_access_levels_id
    };

    this.changes.push(data_changeobj);
}

//call to the back end 
if(this.changes){
  let post_data = JSON.stringify(this.changes);
  this.spinnerShow('Saving '+this.parameter_name);
  
  this.admnistrationService.onSavingUserNavigationPermissions('cfg_regulatoryfunctionaccess_groups', this.createNewDataFrm.value, post_data,'onSavingRegulatoryFunctionPermissions')
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {
          this.fetchAppNavigationMenus(user_group_id);
          this.fetchAppRegulatoryFunction(user_group_id);
          
          this.fetchWorkflowPermissionData(user_group_id) 
          this.toastr.success(this.response.message, 'Response');
          this.spinnerHide();

        } else {
          this.toastr.error(this.response.message, 'Alert');
        }
        // 
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        // 
        this.spinnerHide();
      });
}
}


onSavingUserWorkflowPermissions(e) {
  // apply changes to local data
  let user_group_id = this.createNewDataFrm.get('id')?.value;
  this.changes = [];
  let access_changes = e.changes;
  for (let rec of access_changes) {

      let data_changeobj = {
            workflow_stage_id: rec.key,
            user_group_id:user_group_id,
            user_access_levels_id : rec.data.user_access_levels_id
      };
      this.changes.push(data_changeobj);
  }
  //call to the back end 
  if(this.changes){
    let post_data = JSON.stringify(this.changes);
    this.spinnerShow('Saving '+this.parameter_name);
    
    this.admnistrationService.onSavingUserNavigationPermissions('sys_user_workflowstagepermissions', this.createNewDataFrm.value, post_data,'onSavingUserWorkflowPermissions')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchAppNavigationMenus(user_group_id);
           this.fetchAppRegulatoryFunction(user_group_id);
            this.fetchWorkflowPermissionData(user_group_id); 
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();
  
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          // 
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          // 
          this.spinnerHide();
        });
  }

}

onNextNavigationItems(nextStep){
  this.selectedTabIndex = this.tabNames.indexOf(nextStep);
}
// onloadinstutitionTypesData(account_type_id) {
//   var data_submit = {
//     'table_name': 'par_institutions_types',
//     account_type_id:account_type_id
//   }
//   this.admnistrationService.onLoadSystemAdministrationData(data_submit)
//     .subscribe(
//       data => {
//         this.data_record = data;
//         if (this.data_record.success) {
//           this.instutitionTypesData = this.data_record.data;
//         }
//       },
//       error => {
        
//       });

// }
// onloadallinstutitionTypesData() {
//   var data_submit = {
//     'table_name': 'par_institutions_types'
//   }
//   this.admnistrationService.onLoadSystemAdministrationData(data_submit)
//     .subscribe(
//       data => {
//         this.data_record = data;
        
//         if (this.data_record.success) {
//           this.allinstutitionTypesData = this.data_record.data;
//         }
//       },
//       error => {
        
//       });

// }
onloaddashboardTypeData() {

  var data_submit = {
    'table_name': 'sys_dashboard_types'
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
onLoadAllAccountTypeData(){

  var data_submit = {
    'table_name': 'sys_account_types'
  }
  this.admnistrationService.onLoadSystemAdministrationData(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        
        if (this.data_record.success) {
          this.allAccountTypesData = this.data_record.data;
        }

      },
      error => {
        
      });

}

spinnerShow(spinnerMessage){
  this.loadingVisible = true;
  this.spinnerMessage = spinnerMessage;
}
spinnerHide(){
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

  this.spinnerShow('Saving '+this.parameter_name);
  
  this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.createNewDataFrm.value, 'onsaveSysAdminData')
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

            this.fetchSysAdminDetails();
            this.isnewrecord = false;
            this.user_group_id = this.response.record_id;
            
            this.createNewDataFrm.get('id')?.setValue(this.user_group_id);
            this.fetchAppNavigationMenus(this.user_group_id);
            this.selectedTabIndex = 1;
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();

        } else {
          this.toastr.error(this.response.message, 'Alert');
        }
        // 
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        // 
        this.spinnerHide();
      });
}

funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width / 100;
} 
funcpopHeight(percentage_height) {
  return window.innerHeight * percentage_height/100;
}
finishFunction() {

}

onPopupHidden() {
  this.fetchSysAdminDetails();
}

funcEditDetails(data) {
  this.createNewDataFrm.patchValue(data.data);

  this.user_group_id = data.data.id;
  this.fetchAppNavigationMenus(data.data.id);
  this.fetchAppRegulatoryFunction(data.data.id);
  this.fetchWorkflowPermissionData(data.data.id) 
}
funcEditPermissionDetails(data) {
  this.createNewDataFrm.patchValue(data.data);
  
  this.user_group_id = data.data.id;
  this.fetchAppNavigationMenus(data.data.id)
  this.fetchWorkflowPermissionData(data.data.id) 
  this.fetchAppRegulatoryFunction(data.data.id)
}
onAddNewRecord() {

  this.createNewDataFrm.reset();
  this.tabPanelPopupVisible = true;
  this.AppNavigationMenus = []; 

}
fetchAppNavigationMenus(user_group_id) {
  this.spinnerShow('Loading User Permissions Details');
  this.admnistrationService.getAppUserGroupNavigationMenus(user_group_id)
  .subscribe(
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

    // .subscribe(
    //   data => {
    //     this.data_record = data;
    //     if (this.data_record.success) {
    //       this.AppNavigationMenus = this.data_record.data;
    //     }
    //   });
    //   this.spinnerHide();
  
}

fetchAppRegulatoryFunction(user_group_id) {
  this.spinnerShow('Loading User Permissions Details');
  this.admnistrationService.getAppUserGroupRegulatoryFunctions(user_group_id)
  .subscribe(
    data => {
      this.data_record = data;
      if (this.data_record.success) {
        this.AppRegulatoryFunction = this.data_record.data;
      }
    });
    this.spinnerHide();

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
  } else if (action_btn.action === 'user_permissions') {
    this.funcEditPermissionDetails(data);
  }
}
onCellPrepared(e) {
  this.utilityService.onCellCountriesPrepared(e);
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
onLoadnavigationTypesData(){
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

onLoadregulatoryFunctionData(){
  var data_submit = {
    'table_name': 'cfg_regulatory_functions'
  }
  this.workflowService.getWorkflowConfigs(data_submit)
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

onUpdateUserPermissionSubmit() {
  // Gather values from the form
  const groupId = this.updateuserPermissionfrm.value.id;
  const groupName = this.updateuserPermissionfrm.value.name;
  const has_partnerstate_defination = this.updateuserPermissionfrm.value.has_partnerstate_defination
  const groupDescription = this.updateuserPermissionfrm.value.description;
  this.showWizard = true;
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

onSavingNavigation(e: any) {
  const groupId = this.createNewDataFrm.value.id;
  const change = e.changes[0];

  if (change) {

    //Trouble retrieving the navigation name
    change.data.user_group_id = groupId;
    change.data.navigation_item_id = change.key;
    change.data.name = "GroupNavPar:"+change.data.user_group_id+"_"+change.data.user_access_levels_id+"_"+change.data.navigation_item_id;
    
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

    }else   if (user_access_levels_id == 2) {

      e.cellElement.style.color = 'white';
      e.cellElement.style.backgroundColor = '#0000FF';

    } else   if (user_access_levels_id == 4) {

      e.cellElement.style.color = 'white';
      e.cellElement.style.backgroundColor = '#50c878';

    }  else {

      e.cellElement.style.color = 'white';

    }
  }
}
onDeleteSystemAdministrationDetails() {
  
  this.admnistrationService.onDeleteSystemAdministrationDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
    .subscribe(
      response => {
        
        this.response  = response;
        if (this.response.success) {
          this.fetchSysAdminDetails();
          this.deletePopupVisible = false;
          this.toastr.success(this.response.message, 'Response');
        }
        else {

          this.toastr.error(this.response.message, 'Response');

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
