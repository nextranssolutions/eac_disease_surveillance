
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DxValidatorModule, DxDropDownButtonModule, DxTreeListModule, DxLoadPanelModule, DxToolbarModule, DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxProgressBarModule, DxChartModule, DxBulletModule, DxDataGridComponent, DxDiagramModule, DxDiagramComponent, DxCalendarModule, DxTabsModule, DxSwitchModule, DxResponsiveBoxModule, DxDrawerModule } from 'devextreme-angular';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxoExportModule } from 'devextreme-angular/ui/nested';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppdashboardComponent } from 'src/app/views/admin-dashboard/appdashboard/appdashboard.component';
import { AppfooterComponent } from 'src/app/views/admin-dashboard/system-layout/appfooter/appfooter.component';
import { AppheaderComponent } from 'src/app/views/admin-dashboard/system-layout/appheader/appheader.component';
import { AppLayoutComponent } from 'src/app/views/admin-dashboard/system-layout/app-layout/app-layout.component';
import { AppmenuComponent } from 'src/app/views/admin-dashboard/system-layout/appmenu/appmenu.component';
import { AppMyprofileComponent } from 'src/app/views/admin-dashboard/user-management/app-myprofile/app-myprofile.component';
import { UserAccessLevelsComponent } from 'src/app/views/admin-dashboard/system-administration/user-access-levels/user-access-levels.component';
import { UserGroupsComponent } from 'src/app/views/admin-dashboard/system-administration/user-groups/user-groups.component';
import { SharedconfigurationsComponent } from 'src/app/views/admin-dashboard/configurations/sharedconfigurations/sharedconfigurations.component';
import { AppCitiesComponent } from 'src/app/views/admin-dashboard/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from 'src/app/views/admin-dashboard/configurations/app-countries/app-countries.component';
import { AppUserTitle } from 'src/app/views/admin-dashboard/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from 'src/app/views/admin-dashboard/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from 'src/app/views/admin-dashboard/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from 'src/app/views/admin-dashboard/app-institutiondepartments/app-institutiondepartments.component';
import { AppActiveUserAccounts } from 'src/app/views/admin-dashboard/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { RecursiveMenuDirective } from 'src/app/views/admin-dashboard/system-layout/appmenu/recursive-menu.directive';
import { AppCurrenciesComponent } from 'src/app/views/admin-dashboard/configurations/app-currencies/app-currencies.component';
import { AppAuditTrail } from 'src/app/views/admin-dashboard/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from 'src/app/views/admin-dashboard/configurations/app-partnerstates/app-partnerstates.component';
import { AppNotificationsComponent } from 'src/app/views/admin-dashboard/app-notifications/app-notifications.component';
import { AppDashboardsectionsComponent } from 'src/app/views/admin-dashboard/app-dashboardsections/app-dashboardsections.component';
import { SystemAdministratorsComponent } from 'src/app/views/admin-dashboard/user-management/admins/system-administrators/system-administrators.component';
import { ReportsanalyticsdashboardComponent } from 'src/app/views/admin-dashboard/dashboard/reportsanalytics/reportsanalyticsdashboard/reportsanalyticsdashboard.component';
import { AppNmrasinfoComponent } from 'src/app/views/admin-dashboard/app-nmrasinfo/app-nmrasinfo.component';
import { AdminRoutingDashboardModule } from 'src/app/routes/admin-routing-dashboard/admin-routing-dashboard.module';
import { SharedNavigationsComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/shared-navigations/shared-navigations.component';
import { NavigationsComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationTypesComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-types/navigation-types.component';
import { NavigationInterfacesComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { AppExchangeratesComponent } from 'src/app/views/admin-dashboard/configurations/app-exchangerates/app-exchangerates.component';
import { AppProcessworkflowstatusesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppSharedworkflowComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-sharedworkflow/app-sharedworkflow.component';
import { SharedusermanagementComponent } from 'src/app/views/admin-dashboard/user-management/sharedusermanagement/sharedusermanagement.component';
import { SharedSysAdministrationComponent } from 'src/app/views/admin-dashboard/system-administration/shared-sys-administration/shared-sys-administration.component';
import { AppstageStatusesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/appstage-statuses/appstage-statuses.component';
import { AppPerformancescoringScalesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklist_management/app-performancescoring-scales/app-performancescoring-scales.component';
import { AppChecklistTypesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklist_management/app-checklist-types/app-checklist-types.component';
import { AppChecklistDefinationComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklist_management/app-checklist-defination/app-checklist-defination.component';
import { AppDocumentRequirementsComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/app-document-requirements/app-document-requirements.component';
import { AppDocumentTypesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/app-document-types/app-document-types.component';
import { SharedDocumentchecklistmngComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/shared-documentchecklistmng/shared-documentchecklistmng.component';
import { AppTranslationmanagementComponent } from 'src/app/views/admin-dashboard/language-management/app-translationmanagement/app-translationmanagement.component';
import { AppSystemlanguagesComponent } from 'src/app/views/admin-dashboard/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppSystemlabelsmanagementComponent } from 'src/app/views/admin-dashboard/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { NotificationTypesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/notification-mng/notification-types/notification-types.component';
import { EmailTemplatesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/notification-mng/email-templates/email-templates.component';
import { UserAccounttypesComponent } from 'src/app/views/admin-dashboard/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from 'src/app/views/admin-dashboard/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsDepartmentsComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-departments/institutions-departments.component';
import { InstitutionsDetailsComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-details/institutions-details.component';
import { InstitutionsTypesComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-types/institutions-types.component';
import { UsermanagementDashboardComponent } from 'src/app/views/admin-dashboard/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { ShareusermanagementClassComponent } from 'src/app/views/admin-dashboard/user-management/shareusermanagement-class/shareusermanagement-class.component';
import { ApplicationDocumentuploadsComponent } from 'src/app/views/admin-dashboard/utilities/application-documentuploads/application-documentuploads.component';
import { ApplicationWorkflowsubmissionsComponent } from 'src/app/views/admin-dashboard/utilities/application-workflowsubmissions/application-workflowsubmissions.component';
import { PublicationDashboardComponent } from 'src/app/views/admin-dashboard/information-sharing/publication-dashboard/publication-dashboard.component';
import { EcredResourcesmanagementComponent } from 'src/app/views/admin-dashboard/information-sharing/ecred-resourcesmanagement/ecred-resourcesmanagement.component';
import { AppNationalitiesComponent } from 'src/app/views/admin-dashboard/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from 'src/app/views/admin-dashboard/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from 'src/app/views/admin-dashboard/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from 'src/app/views/admin-dashboard/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementTypesComponent } from 'src/app/views/admin-dashboard/configurations/disclaimer-statement-types/disclaimer-statement-types.component';
import { DisclaimerStatementsComponent } from 'src/app/views/admin-dashboard/configurations/disclaimer-statements/disclaimer-statements.component';
import { TruncateWordsadminPipe } from 'src/app/services/TruncateWordsadminPipe';
import { AppProcesssubmissionComponent } from 'src/app/views/admin-dashboard/utilities/app-processsubmission/app-processsubmission.component';


import { DmsDocrequirementsAppstatusComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/dms-docrequirements-appstatus/dms-docrequirements-appstatus.component';
import { AppDosageformsComponent } from 'src/app/views/admin-dashboard/configurations/app-dosageforms/app-dosageforms.component';
import { AppApplicationtypesComponent } from 'src/app/views/admin-dashboard/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from 'src/app/views/admin-dashboard/configurations/app-firewallips/app-firewallips.component';
import { EcredResourcedashboardComponent } from 'src/app/views/admin-dashboard/information-sharing/ecred-resourcedashboard/ecred-resourcedashboard.component';
import { KnowledgecenterDashboardComponent } from 'src/app/views/admin-dashboard/information-sharing/knowledgecenter-dashboard/knowledgecenter-dashboard.component';
import { SystemsFunctionalitiesComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { SystemguidelinesDetailComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systemguidelines-detail/systemguidelines-detail.component';
import { SystemguidelinesDashComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systemguidelines-dash/systemguidelines-dash.component';
import { AppWorkflowsubmissionactionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { AdminsystemguudelinesDetailsComponent } from 'src/app/views/utilitiescomponents/adminsystemguudelines-details/adminsystemguudelines-details.component';
import { SyserrorLogsComponent } from 'src/app/views/admin-dashboard/user-logs/syserror-logs/syserror-logs.component';
import { UserloginLogsComponent } from 'src/app/views/admin-dashboard/user-logs/userlogin-logs/userlogin-logs.component';
import { UserpwdresetrequestLogsComponent } from 'src/app/views/admin-dashboard/user-logs/userpwdresetrequest-logs/userpwdresetrequest-logs.component';
import { UserpwdchangerequestLogsComponent } from 'src/app/views/admin-dashboard/user-logs/userpwdchangerequest-logs/userpwdchangerequest-logs.component';
import { UsermaliciousaccessComponent } from 'src/app/views/admin-dashboard/user-logs/usermaliciousaccess/usermaliciousaccess.component';
import { SyslogsUsersaccessComponent } from 'src/app/views/admin-dashboard/user-logs/syslogs-usersaccess/syslogs-usersaccess.component';
import { SyslogsComponent } from 'src/app/views/admin-dashboard/syslogs/syslogs.component';
import { UserloginoutLogsComponent } from 'src/app/views/admin-dashboard/user-login-logs/userloginout-logs/userloginout-logs.component';
import { UserfaildloginsLogsComponent } from 'src/app/views/admin-dashboard/user-login-logs/userfaildlogins-logs/userfaildlogins-logs.component';
import { LocationParametersComponent } from 'src/app/views/admin-dashboard/configurations/location-parameters/location-parameters.component';
import { SystemmanualConfigurationComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systemmanual-configuration/systemmanual-configuration.component';
import { SigninSignupGuidelinesComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/signin-signup-guidelines/signin-signup-guidelines.component';
import { TermsconditionsDetailsComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/termsconditions-details/termsconditions-details.component';
import { GuidelinesoptionsComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/guidelinesoptions/guidelinesoptions.component';
import { MultilingualConfigurationsComponent } from 'src/app/views/admin-dashboard/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { WorkflowsSetupComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/workflows-setup/workflows-setup.component';
import { NotificationManagementComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/notification-mng/notification-management/notification-management.component';
import { ProductConfigurationComponent } from 'src/app/views/admin-dashboard/configurations/product-configuration/product-configuration.component';
import { DocumentchecklistSetupComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/documentchecklist-setup/documentchecklist-setup.component';
import { ExpertprofileSetupComponent } from 'src/app/views/admin-dashboard/configurations/expertprofile-setup/expertprofile-setup.component';
import { InstitutionsInformationComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-information/institutions-information.component';

import { NotSlidesInformationsComponent } from 'src/app/views/admin-dashboard/system-administration/not-slides-informations/not-slides-informations.component';
import { ChecklistmanagementSetupComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklistmanagement-setup/checklistmanagement-setup.component';
import { DmsDmsdocumentSitesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/dms-dmsdocument-sites/dms-dmsdocument-sites.component';
import { DmsProcessesDocdefinationComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/dms-processes-docdefination/dms-processes-docdefination.component';
import { DmsNonstructuredDocrequirementComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/dms-nonstructured-docrequirement/dms-nonstructured-docrequirement.component';
import { UserSetupComponent } from 'src/app/views/admin-dashboard/system-administration/user-setup/user-setup.component';

import { AppOrganizationinformationComponent } from 'src/app/views/admin-dashboard/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppSignatoriesComponent } from 'src/app/views/admin-dashboard/system-administration/app-signatories/app-signatories.component';
import { AppWorkflowactiontypesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { KnowledgeCenterinfomanagementComponent } from 'src/app/views/admin-dashboard/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppGenericnamesComponent } from 'src/app/views/admin-dashboard/configurations/app-genericnames/app-genericnames.component';
import { UserDashboardComponent } from 'src/app/views/admin-dashboard/dashboard/user-dashboard/user-dashboard.component';
import { FinanceDashboardComponent } from 'src/app/views/admin-dashboard/dashboard/finance-dashboard/finance-dashboard.component';
import { ExternalDashboardComponent } from 'src/app/views/admin-dashboard/dashboard/external-dashboard/external-dashboard.component';
import { SharedPortalNavigationsComponent } from 'src/app/views/admin-dashboard/workflow-management/portal-navigations/shared-portal-navigations/shared-portal-navigations.component';
import { PortalNavigationComponent } from 'src/app/views/admin-dashboard/workflow-management/portal-navigations/portal-navigations/portal-navigations.component';
import { PortalNavigationTypesComponent } from 'src/app/views/admin-dashboard/workflow-management/portal-navigations/portal-navigation-types/portal-navigation-types.component';
import { PortalNavigationSetupComponent } from 'src/app/views/admin-dashboard/workflow-management/portal-navigations/portal-navigation-setup/portal-navigation-setup.component';
import { PortalNavigationLevelsComponent } from 'src/app/views/admin-dashboard/workflow-management/portal-navigations/portal-navigation-levels/portal-navigation-levels.component';
import { PortalNavigationInterfacesComponent } from 'src/app/views/admin-dashboard/workflow-management/portal-navigations/portal-navigation-interfaces/portal-navigation-interfaces.component';


@NgModule({
  declarations: [AppdashboardComponent,
    AppfooterComponent, AppNationalitiesComponent,
    AppheaderComponent, TruncateWordsadminPipe,
    AppLayoutComponent,
    AppmenuComponent,
    AppMyprofileComponent,
    UserAccessLevelsComponent, AppWorkflowstatusesinterfacesComponent,
    UserGroupsComponent, AppWorkflowactiontypesComponent,
    SharedusermanagementComponent,
    AppCitiesComponent,
    AppCountriesComponent,
    AppUserTitle, DisclaimerStatementTypesComponent, DisclaimerStatementsComponent,
    AppUserIdentificationType,
    AppInstitution,
    AppInstitutionDepartments,
    SharedconfigurationsComponent,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppGenericnamesComponent,
    
    AppCurrenciesComponent,
    AppAuditTrail,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,


    AppPartnerStates,

    AppNotificationsComponent,
    AppDashboardsectionsComponent,



    SystemAdministratorsComponent,
    ReportsanalyticsdashboardComponent,
    AppNmrasinfoComponent,
    NotSlidesInformationsComponent,
    SharedNavigationsComponent,
    NavigationsComponent, AppSharedworkflowComponent,
    NavigationTypesComponent, AppExchangeratesComponent,
    KnowledgeCenterinfomanagementComponent,
    AppProcessworkflowstatusesComponent,
    AppSystemprocessesComponent,
    AppProcessworkflowtransitionsComponent,
    AppProcessworkflowsstagesComponent,
    AppProcessworkflowsComponent,
    NotificationTypesComponent, EmailTemplatesComponent,
    NavigationLevelsComponent, NavigationInterfacesComponent,
    InstitutionsDepartmentsComponent,
    AppstageStatusesComponent, SharedDocumentchecklistmngComponent,
    SharedSysAdministrationComponent, AppPerformancescoringScalesComponent,
    AppChecklistTypesComponent, AppChecklistDefinationComponent,
    AppDocumentRequirementsComponent, AppDocumentTypesComponent,
    ShareusermanagementClassComponent,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    UsermanagementDashboardComponent, ApplicationDocumentuploadsComponent,
    ApplicationWorkflowsubmissionsComponent,
    PublicationDashboardComponent,

    AppProcesssubmissionComponent,
    AppSubmissionmethodsComponent,

    EcredResourcesmanagementComponent,

    AppTranslationmanagementComponent, AppSystemlanguagesComponent,
    AppSystemlabelsmanagementComponent, InstitutionsDetailsComponent,
    AppSystemlabelsmanagementComponent, InstitutionsDetailsComponent,
    SystemsFunctionalitiesComponent,


    InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent, AppPublicationTypesComponent,
     DmsDocrequirementsAppstatusComponent,

    AppDosageformsComponent, AppApplicationtypesComponent, AppFirewallipsComponent,
    EcredResourcedashboardComponent,
    KnowledgecenterDashboardComponent, 
    SystemguidelinesDetailComponent,
    SystemguidelinesDashComponent, AdminsystemguudelinesDetailsComponent,
    AppWorkflowsubmissionactionsComponent,
    AppWorkflowstatusesactionsComponent,
    AppStatusesactionsComponent,
    SyserrorLogsComponent,
    AppOrganizationinformationComponent,
    AppSignatoriesComponent,
    UserloginLogsComponent,
    UserpwdresetrequestLogsComponent,

    UserpwdchangerequestLogsComponent,
    UsermaliciousaccessComponent,
    SyslogsUsersaccessComponent,
    SyslogsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,

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
    NotificationManagementComponent,
    ProductConfigurationComponent,
    DocumentchecklistSetupComponent,
    
    ExpertprofileSetupComponent,
    InstitutionsInformationComponent,
    

    ChecklistmanagementSetupComponent,
    DmsDmsdocumentSitesComponent,
    DmsProcessesDocdefinationComponent, DmsNonstructuredDocrequirementComponent,

    UserDashboardComponent,
    FinanceDashboardComponent,
    ExternalDashboardComponent
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
    AppInstitution,KnowledgeCenterinfomanagementComponent,
    AppInstitutionDepartments,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppCurrenciesComponent,
    AppSubmissionmethodsComponent,
    AppAuditTrail,
    AppPartnerStates,
    AppNotificationsComponent,
    AppDashboardsectionsComponent,
    AppWorkflowstatusesinterfacesComponent,
    AppNmrasinfoComponent,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingDashboardModule,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    AppTranslationmanagementComponent, AppSystemlanguagesComponent, AppSystemlabelsmanagementComponent,

    NotificationTypesComponent, EmailTemplatesComponent,
    SharedusermanagementComponent,
    EcredResourcedashboardComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent, InstitutionsDetailsComponent, InstitutionsTypesComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent, 
    InstitutionsDetailsComponent, InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent,
    AppPublicationTypesComponent,
     DmsDocrequirementsAppstatusComponent,

    AppDosageformsComponent,
    AppApplicationtypesComponent,
    AppFirewallipsComponent,
    KnowledgecenterDashboardComponent,
    SystemsFunctionalitiesComponent,
    SystemguidelinesDetailComponent,
    SystemguidelinesDashComponent,
    AppWorkflowsubmissionactionsComponent,
    AppWorkflowstatusesactionsComponent,
    AppStatusesactionsComponent,
    SyserrorLogsComponent,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,

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
    NotSlidesInformationsComponent,
  ]
})
export class UrimsmisAdminModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

