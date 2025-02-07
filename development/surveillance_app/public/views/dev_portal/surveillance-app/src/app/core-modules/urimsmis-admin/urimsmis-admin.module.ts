
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DxValidatorModule, DxDropDownButtonModule, DxTreeListModule, DxLoadPanelModule, DxToolbarModule, DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxProgressBarModule, DxChartModule, DxBulletModule, DxDataGridComponent, DxDiagramModule, DxDiagramComponent, DxCalendarModule, DxTabsModule, DxSwitchModule, DxResponsiveBoxModule, DxDrawerModule } from 'devextreme-angular';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxoExportModule } from 'devextreme-angular/ui/nested';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppdashboardComponent } from './views/appdashboard/appdashboard.component';
import { AppfooterComponent } from './views/system-layout/appfooter/appfooter.component';
import { AppheaderComponent } from './views/system-layout/appheader/appheader.component';
import { AppLayoutComponent } from './views/system-layout/app-layout/app-layout.component';
import { AppmenuComponent } from './views/system-layout/appmenu/appmenu.component';
import { AppMyprofileComponent } from './views/user-management/app-myprofile/app-myprofile.component';
import { UserAccessLevelsComponent } from './views/system-administration/user-access-levels/user-access-levels.component';
import { UserGroupsComponent } from './views/system-administration/user-groups/user-groups.component';
import { SharedconfigurationsComponent } from './views/configurations/sharedconfigurations/sharedconfigurations.component';
import { AppCitiesComponent } from './views/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from './views/configurations/app-countries/app-countries.component';
import { AppUserTitle } from './views/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from './views/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from './views/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from './views/app-institutiondepartments/app-institutiondepartments.component';
import { AppActiveUserAccounts } from './views/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { RecursiveMenuDirective } from './views/system-layout/appmenu/recursive-menu.directive';
import { AppAuditTrail } from './views/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from './views/configurations/app-partnerstates/app-partnerstates.component';
import { AppNotificationsComponent } from './views/app-notifications/app-notifications.component';
import { SystemAdministratorsComponent } from './views/user-management/admins/system-administrators/system-administrators.component';

import { SharedNavigationsComponent } from './views/workflow-management/navigation/shared-navigations/shared-navigations.component';
import { NavigationsComponent } from './views/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from './views/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationTypesComponent } from './views/workflow-management/navigation/navigation-types/navigation-types.component';
import { NavigationInterfacesComponent } from './views/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { AppProcessworkflowstatusesComponent } from './views/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from './views/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from './views/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from './views/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from './views/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppSharedworkflowComponent } from './views/workflow-management/workflows/app-sharedworkflow/app-sharedworkflow.component';
import { SharedusermanagementComponent } from './views/user-management/sharedusermanagement/sharedusermanagement.component';
import { SharedSysAdministrationComponent } from './views/system-administration/shared-sys-administration/shared-sys-administration.component';
import { AppstageStatusesComponent } from './views/workflow-management/workflows/appstage-statuses/appstage-statuses.component';
import { AppTranslationmanagementComponent } from './views/language-management/app-translationmanagement/app-translationmanagement.component';
import { AppSystemlanguagesComponent } from './views/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppSystemlabelsmanagementComponent } from './views/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { UserAccounttypesComponent } from './views/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from './views/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsDepartmentsComponent } from './views/system-administration/institutions-departments/institutions-departments.component';
import { InstitutionsDetailsComponent } from './views/system-administration/institutions-details/institutions-details.component';
import { InstitutionsTypesComponent } from './views/system-administration/institutions-types/institutions-types.component';
import { UsermanagementDashboardComponent } from './views/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { ShareusermanagementClassComponent } from './views/user-management/shareusermanagement-class/shareusermanagement-class.component';
import { ApplicationDocumentuploadsComponent } from './views/utilities/application-documentuploads/application-documentuploads.component';
import { ApplicationWorkflowsubmissionsComponent } from './views/utilities/application-workflowsubmissions/application-workflowsubmissions.component';
import { PublicationDashboardComponent } from './views/information-sharing/publication-dashboard/publication-dashboard.component';
import { AppNationalitiesComponent } from './views/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from './views/configurations/app-gender/app-gender.component';
import { TruncateWordsadminPipe } from 'src/app/core-services/TruncateWordsadminPipe';
import { AppProcesssubmissionComponent } from './views/utilities/app-processsubmission/app-processsubmission.component';

import { AppFirewallipsComponent } from './views/configurations/app-firewallips/app-firewallips.component';
import { SystemsFunctionalitiesComponent } from './views/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { SystemguidelinesDetailComponent } from './views/system-administration/system-guidelines/systemguidelines-detail/systemguidelines-detail.component';
import { SystemguidelinesDashComponent } from './views/system-administration/system-guidelines/systemguidelines-dash/systemguidelines-dash.component';
import { AppWorkflowsubmissionactionsComponent } from './views/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from './views/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from './views/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { AdminsystemguudelinesDetailsComponent } from 'src/app/shared-views/utilitiescomponents/adminsystemguudelines-details/adminsystemguudelines-details.component';
import { SyserrorLogsComponent } from './views/user-logs/syserror-logs/syserror-logs.component';
import { UserloginLogsComponent } from './views/user-logs/userlogin-logs/userlogin-logs.component';
import { UserpwdresetrequestLogsComponent } from './views/user-logs/userpwdresetrequest-logs/userpwdresetrequest-logs.component';
import { UserpwdchangerequestLogsComponent } from './views/user-logs/userpwdchangerequest-logs/userpwdchangerequest-logs.component';
import { UsermaliciousaccessComponent } from './views/user-logs/usermaliciousaccess/usermaliciousaccess.component';
import { SyslogsUsersaccessComponent } from './views/user-logs/syslogs-usersaccess/syslogs-usersaccess.component';
import { SyslogsComponent } from './views/syslogs/syslogs.component';
import { UserloginoutLogsComponent } from './views/user-login-logs/userloginout-logs/userloginout-logs.component';
import { UserfaildloginsLogsComponent } from './views/user-login-logs/userfaildlogins-logs/userfaildlogins-logs.component';
import { LocationParametersComponent } from './views/configurations/location-parameters/location-parameters.component';
import { SystemmanualConfigurationComponent } from './views/system-administration/system-guidelines/systemmanual-configuration/systemmanual-configuration.component';
import { SigninSignupGuidelinesComponent } from './views/system-administration/system-guidelines/signin-signup-guidelines/signin-signup-guidelines.component';
import { TermsconditionsDetailsComponent } from './views/system-administration/system-guidelines/termsconditions-details/termsconditions-details.component';
import { GuidelinesoptionsComponent } from './views/system-administration/system-guidelines/guidelinesoptions/guidelinesoptions.component';
import { MultilingualConfigurationsComponent } from './views/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from './views/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { WorkflowsSetupComponent } from './views/workflow-management/workflows/workflows-setup/workflows-setup.component';
import { InstitutionsInformationComponent } from './views/system-administration/institutions-information/institutions-information.component';
import { UserSetupComponent } from './views/system-administration/user-setup/user-setup.component';
import { AppOrganizationinformationComponent } from './views/system-administration/app-organizationinformation/app-organizationinformation.component';

import { AppWorkflowactiontypesComponent } from './views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from './views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';

import { AppFormsComponent } from './views/configurations/forms/app-forms-setup/app-forms.component';
import { DynamicFormComponent } from './views/configurations/forms/dynamic-form/dynamic-form.component';
import { FormFieldsComponent } from './views/configurations/forms/form-fields/form-fields.component';
import { FormTypesComponent } from './views/configurations/forms/form-types/form-types.component';
import { AdminRoutingDashboardModule } from './admin-routing-dashboard.module';
import { IntegrationManagementComponent } from './views/integration-management/integration-management.component';
import { ProcessConfsetupComponent } from './views/configurations/process-configuration/process-confsetup/process-confsetup.component';
import { AppSectionsComponent } from './views/configurations/process-configuration/application-section/app-sections.component';
import { AppealTypesComponent } from './views/configurations/process-configuration/appeal-types/appeal-types.component';
import { ModulesComponent } from './views/configurations/process-configuration/modules/modules.component';
import { SectionsComponent } from './views/configurations/process-configuration/sections/sections.component';
import { SharedProcessconfigurationComponent } from './views/configurations/process-configuration/shared-processconfiguration/shared-processconfiguration.component';
import { GeneralApplicationFormComponent } from './views/configurations/forms/general-application-form/general-application-form.component';
import { DataEntryFormSetupComponent } from './views/configurations/forms/data-entry-form-setup/data-entry-form-setup.component';
import { InterfacesComponent } from './views/workflow-management/workflows/interfaces/interfaces.component';
import { WorkflowsComponent } from './views/workflow-management/workflows/workflows/workflows.component';
import { SystemProcessesComponent } from './views/workflow-management/workflows/system-processes/system-processes.component';
import { ApiUsersComponent } from './views/user-management/api-users/api-users.component';

import { SharedDocumentchecklistmngComponent } from './views/document-checklistsmng/shared-documentchecklistmng/shared-documentchecklistmng.component';
import { TopappmenuComponent } from './views/system-layout/topappmenu/topappmenu.component';
import { InitiateDiseaseoutbreakReportingComponent } from './views/pandemic-informationsharing/initiate-diseaseoutbreak-reporting/initiate-diseaseoutbreak-reporting.component';
import { SubmittedDiseaseoutbreakRptdashComponent } from './views/pandemic-informationsharing/submitted-diseaseoutbreak-rptdash/submitted-diseaseoutbreak-rptdash.component';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { DiseaseOutbreaksInfoComponent } from './views/pandemic-informationsharing/data-entry/disease-outbreaks-info/disease-outbreaks-info.component';
import { PandemicReportingInfoComponent } from './views/pandemic-informationsharing/data-entry/pandemic-reporting-info/pandemic-reporting-info.component';
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [AppdashboardComponent,
    AppfooterComponent, AppNationalitiesComponent,
    AppheaderComponent, TruncateWordsadminPipe,
    AppLayoutComponent, SharedDocumentchecklistmngComponent,
    AppmenuComponent,
    AppMyprofileComponent,
    UserAccessLevelsComponent, AppWorkflowstatusesinterfacesComponent,
    UserGroupsComponent, AppWorkflowactiontypesComponent,
    SharedusermanagementComponent,
    AppCitiesComponent,
    AppCountriesComponent,
    AppUserTitle,
    AppUserIdentificationType,
    AppInstitution,
    ApiUsersComponent,
    AppInstitutionDepartments,
    SharedconfigurationsComponent,
    DataEntryFormSetupComponent,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    ProcessConfsetupComponent,
    AppAuditTrail,
    WorkflowsComponent,
    GeneralApplicationFormComponent,
    SystemProcessesComponent,
    AppSectionsComponent,
    AppealTypesComponent,
    ModulesComponent,
    SectionsComponent,
    InterfacesComponent,
    AppPartnerStates,
    AppNotificationsComponent,
    SubmittedDiseaseoutbreakRptdashComponent,
    InitiateDiseaseoutbreakReportingComponent,
    SystemAdministratorsComponent,
    SharedNavigationsComponent,
    NavigationsComponent, AppSharedworkflowComponent,
    NavigationTypesComponent,
    AppProcessworkflowstatusesComponent,
    AppSystemprocessesComponent,
    AppProcessworkflowtransitionsComponent,
    AppProcessworkflowsstagesComponent,
    AppProcessworkflowsComponent,
    NavigationLevelsComponent, NavigationInterfacesComponent,
    InstitutionsDepartmentsComponent,
    AppstageStatusesComponent,
    SharedSysAdministrationComponent,
    ShareusermanagementClassComponent,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    UsermanagementDashboardComponent, ApplicationDocumentuploadsComponent,
    ApplicationWorkflowsubmissionsComponent,
    PublicationDashboardComponent,

    AppProcesssubmissionComponent,
    AppFormsComponent,
    DynamicFormComponent,
    FormFieldsComponent,
    FormTypesComponent,

    AppTranslationmanagementComponent, AppSystemlanguagesComponent,
    AppSystemlabelsmanagementComponent, InstitutionsDetailsComponent,
    AppSystemlabelsmanagementComponent,

    InstitutionsDetailsComponent,
    SystemsFunctionalitiesComponent,


    InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent,
    AppFirewallipsComponent,
    SystemguidelinesDetailComponent,
    SystemguidelinesDashComponent, AdminsystemguudelinesDetailsComponent,
    AppWorkflowsubmissionactionsComponent,
    AppWorkflowstatusesactionsComponent,
    AppStatusesactionsComponent,
    SyserrorLogsComponent,
    AppOrganizationinformationComponent,
    UserloginLogsComponent,
    UserpwdresetrequestLogsComponent,

    UserpwdchangerequestLogsComponent,
    UsermaliciousaccessComponent,
    SyslogsUsersaccessComponent,
    SyslogsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,

    TopappmenuComponent,
    AppWorkflowactiontypesComponent,
    LocationParametersComponent,
    SystemmanualConfigurationComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,
    MultilingualConfigurationsComponent,
    NavigationSetupComponent,
    WorkflowsSetupComponent,
    InstitutionsInformationComponent,
    SharedProcessconfigurationComponent,
    IntegrationManagementComponent,
    //pandemic Reporting 
    PandemicReportingInfoComponent,
    DiseaseOutbreaksInfoComponent

  ],
  imports: [
    CommonModule, DxButtonModule, DxProgressBarModule,
    FormsModule, DxToolbarModule, DxLoadPanelModule, DxValidatorModule,
    ReactiveFormsModule, DxDropDownButtonModule,
    NgHttpLoaderModule, DxTreeListModule, AdminRoutingDashboardModule,
    DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxTabPanelModule, DxFormModule, DxScrollViewModule, DxChartModule,
    DxSelectBoxModule, DxoExportModule, NgxSmartModalModule.forRoot(),
    DxValidatorModule, DxDrawerModule,
    DxCalendarModule, DxPopupModule, DxFileUploaderModule, DxNumberBoxModule, DxMenuModule, DxTagBoxModule,
    DxTabPanelModule, DxFileUploaderModule, DxNumberBoxModule,
    DxTextAreaModule, DxMenuModule, DxTagBoxModule, DxTabsModule,
    DxTabPanelModule, HttpClientModule, DxSwitchModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }), DxDiagramModule,
    NgWizardModule.forRoot(ngWizardConfig),
    DxTextBoxModule, DxDateBoxModule, DxDropDownButtonModule, DxPopupModule, DxFileUploaderModule,
    DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule,
    DxContextMenuModule, DxMenuModule, DxScrollViewModule, DxTabPanelModule, DxHtmlEditorModule,
    DxDropDownBoxModule, DxTagBoxModule, DxRadioGroupModule, DxBulletModule, NgxIntlTelInputModule,
    DxActionSheetModule,
    DxResponsiveBoxModule],
  exports: [
    AppdashboardComponent,
    AppfooterComponent,
    AppheaderComponent,
    AppLayoutComponent,
    AppmenuComponent,
    AppMyprofileComponent,
    UserAccessLevelsComponent,
    UserGroupsComponent,
    AppCitiesComponent,
    AppCountriesComponent,
    AppUserTitle,
    AppUserIdentificationType,
    AppInstitution,
    AppInstitutionDepartments,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppAuditTrail,
    GeneralApplicationFormComponent,
    AppPartnerStates,
    AppNotificationsComponent,
    AppWorkflowstatusesinterfacesComponent,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingDashboardModule,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    AppTranslationmanagementComponent, AppSystemlanguagesComponent, AppSystemlabelsmanagementComponent,

    SharedusermanagementComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent, InstitutionsDetailsComponent, InstitutionsTypesComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent,
    InstitutionsDetailsComponent, InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent,

    AppFirewallipsComponent,
    SystemsFunctionalitiesComponent,
    SystemguidelinesDetailComponent,
    SystemguidelinesDashComponent,
    AppWorkflowsubmissionactionsComponent,
    AppWorkflowstatusesactionsComponent,
    AppStatusesactionsComponent,
    SyserrorLogsComponent,
    AppFormsComponent,
    InterfacesComponent,
    SharedconfigurationsComponent,
    UserloginLogsComponent,
    UserpwdresetrequestLogsComponent,
    UserpwdchangerequestLogsComponent,
    UsermaliciousaccessComponent,
    SyslogsUsersaccessComponent,
    SyslogsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,
    ProcessConfsetupComponent,
    DataEntryFormSetupComponent,
    IntegrationManagementComponent,
    AppSectionsComponent,
    AppealTypesComponent,
    ModulesComponent,
    SectionsComponent,
    WorkflowsComponent,
    SystemProcessesComponent,

    SharedProcessconfigurationComponent,
    DynamicFormComponent,
    FormFieldsComponent,
    FormTypesComponent,
  ]
})
export class UrimsmisAdminModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

