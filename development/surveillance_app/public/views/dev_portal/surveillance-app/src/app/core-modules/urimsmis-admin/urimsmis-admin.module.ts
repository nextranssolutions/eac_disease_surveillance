
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
import { AppCurrenciesComponent } from './views/configurations/app-currencies/app-currencies.component';
import { AppAuditTrail } from './views/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from './views/configurations/app-partnerstates/app-partnerstates.component';
import { AppNotificationsComponent } from './views/app-notifications/app-notifications.component';
import { AppDashboardsectionsComponent } from './views/app-dashboardsections/app-dashboardsections.component';
import { SystemAdministratorsComponent } from './views/user-management/admins/system-administrators/system-administrators.component';
import { ReportsanalyticsdashboardComponent } from './views/dashboard/reportsanalytics/reportsanalyticsdashboard/reportsanalyticsdashboard.component';
import { AppNmrasinfoComponent } from './views/app-nmrasinfo/app-nmrasinfo.component';
import { SharedNavigationsComponent } from './views/workflow-management/navigation/shared-navigations/shared-navigations.component';
import { NavigationsComponent } from './views/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from './views/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationTypesComponent } from './views/workflow-management/navigation/navigation-types/navigation-types.component';
import { NavigationInterfacesComponent } from './views/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { AppExchangeratesComponent } from './views/configurations/app-exchangerates/app-exchangerates.component';
import { AppProcessworkflowstatusesComponent } from './views/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from './views/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from './views/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from './views/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from './views/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppSharedworkflowComponent } from './views/workflow-management/workflows/app-sharedworkflow/app-sharedworkflow.component';
import { SharedusermanagementComponent } from './views/user-management/sharedusermanagement/sharedusermanagement.component';
import { SharedSysAdministrationComponent } from './views/system-administration/shared-sys-administration/shared-sys-administration.component';
import { AppstageStatusesComponent } from './views/workflow-management/workflows/appstage-statuses/appstage-statuses.component';
import { AppPerformancescoringScalesComponent } from './views/document-checklistsmng/checklist_management/app-performancescoring-scales/app-performancescoring-scales.component';
import { AppChecklistTypesComponent } from './views/document-checklistsmng/checklist_management/app-checklist-types/app-checklist-types.component';
import { AppChecklistDefinationComponent } from './views/document-checklistsmng/checklist_management/app-checklist-defination/app-checklist-defination.component';
import { AppDocumentRequirementsComponent } from './views/document-checklistsmng/document_management/app-document-requirements/app-document-requirements.component';
import { AppDocumentTypesComponent } from './views/document-checklistsmng/document_management/app-document-types/app-document-types.component';
import { SharedDocumentchecklistmngComponent } from './views/document-checklistsmng/shared-documentchecklistmng/shared-documentchecklistmng.component';
import { AppTranslationmanagementComponent } from './views/language-management/app-translationmanagement/app-translationmanagement.component';
import { AppSystemlanguagesComponent } from './views/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppSystemlabelsmanagementComponent } from './views/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { NotificationTypesComponent } from './views/document-checklistsmng/notification-mng/notification-types/notification-types.component';
import { EmailTemplatesComponent } from './views/document-checklistsmng/notification-mng/email-templates/email-templates.component';
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
import { EcredResourcesmanagementComponent } from './views/information-sharing/ecred-resourcesmanagement/ecred-resourcesmanagement.component';
import { AppNationalitiesComponent } from './views/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from './views/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from './views/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from './views/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementTypesComponent } from './views/configurations/disclaimer-statement-types/disclaimer-statement-types.component';
import { DisclaimerStatementsComponent } from './views/configurations/disclaimer-statements/disclaimer-statements.component';
import { TruncateWordsadminPipe } from 'src/app/core-services/TruncateWordsadminPipe';
import { AppProcesssubmissionComponent } from './views/utilities/app-processsubmission/app-processsubmission.component';
import { DmsDocrequirementsAppstatusComponent } from './views/document-checklistsmng/document_management/dms-docrequirements-appstatus/dms-docrequirements-appstatus.component';
import { AppDosageformsComponent } from './views/configurations/app-dosageforms/app-dosageforms.component';
import { AppApplicationtypesComponent } from './views/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from './views/configurations/app-firewallips/app-firewallips.component';
import { EcredResourcedashboardComponent } from './views/information-sharing/ecred-resourcedashboard/ecred-resourcedashboard.component';
import { KnowledgecenterDashboardComponent } from './views/information-sharing/knowledgecenter-dashboard/knowledgecenter-dashboard.component';
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
import { NotificationManagementComponent } from './views/document-checklistsmng/notification-mng/notification-management/notification-management.component';
import { ProductConfigurationComponent } from './views/configurations/product-configuration/product-configuration.component';
import { DocumentchecklistSetupComponent } from './views/document-checklistsmng/documentchecklist-setup/documentchecklist-setup.component';
import { ExpertprofileSetupComponent } from './views/configurations/expertprofile-setup/expertprofile-setup.component';
import { InstitutionsInformationComponent } from './views/system-administration/institutions-information/institutions-information.component';
import { NotSlidesInformationsComponent } from './views/system-administration/not-slides-informations/not-slides-informations.component';
import { ChecklistmanagementSetupComponent } from './views/document-checklistsmng/checklistmanagement-setup/checklistmanagement-setup.component';
import { DmsDmsdocumentSitesComponent } from './views/document-checklistsmng/document_management/dms-dmsdocument-sites/dms-dmsdocument-sites.component';
import { DmsProcessesDocdefinationComponent } from './views/document-checklistsmng/document_management/dms-processes-docdefination/dms-processes-docdefination.component';
import { DmsNonstructuredDocrequirementComponent } from './views/document-checklistsmng/document_management/dms-nonstructured-docrequirement/dms-nonstructured-docrequirement.component';
import { UserSetupComponent } from './views/system-administration/user-setup/user-setup.component';
import { AppOrganizationinformationComponent } from './views/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppSignatoriesComponent } from './views/system-administration/app-signatories/app-signatories.component';
import { AppWorkflowactiontypesComponent } from './views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from './views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { KnowledgeCenterinfomanagementComponent } from './views/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppGenericnamesComponent } from './views/configurations/app-genericnames/app-genericnames.component';
import { UserDashboardComponent } from './views/dashboard/user-dashboard/user-dashboard.component';
import { FinanceDashboardComponent } from './views/dashboard/finance-dashboard/finance-dashboard.component';
import { ExternalDashboardComponent } from './views/dashboard/external-dashboard/external-dashboard.component';
import { SharedPortalNavigationsComponent } from './views/workflow-management/portal-navigations/shared-portal-navigations/shared-portal-navigations.component';
import { PortalNavigationComponent } from './views/workflow-management/portal-navigations/portal-navigations/portal-navigations.component';
import { PortalNavigationTypesComponent } from './views/workflow-management/portal-navigations/portal-navigation-types/portal-navigation-types.component';
import { PortalNavigationSetupComponent } from './views/workflow-management/portal-navigations/portal-navigation-setup/portal-navigation-setup.component';
import { PortalNavigationLevelsComponent } from './views/workflow-management/portal-navigations/portal-navigation-levels/portal-navigation-levels.component';
import { PortalNavigationInterfacesComponent } from './views/workflow-management/portal-navigations/portal-navigation-interfaces/portal-navigation-interfaces.component';
import { CertificateConditionComponent } from './views/quality_auditmanagement/certificate-condition/certificate-condition.component';
import { ControlDocmasterlistComponent } from './views/quality_auditmanagement/control-docmasterlist/control-docmasterlist.component';
import { ControlDocumentmanagementComponent } from './views/quality_auditmanagement/control-documentmanagement/control-documentmanagement.component';
import { DocumentControlsetupComponent } from './views/quality_auditmanagement/document-controlsetup/document-controlsetup.component';
import { RegistrationConditionComponent } from './views/quality_auditmanagement/registration-condition/registration-condition.component';
import { RegistrationRegulationComponent } from './views/quality_auditmanagement/registration-regulation/registration-regulation.component';
import { PortalTermsComponent } from './views/workflow-management/portal-modules/portal-terms/portal-terms.component';
import { PortalProcessesComponent } from './views/workflow-management/portal-modules/portal-processes/portal-processes.component';
import { PortalProcessguidelinesComponent } from './views/workflow-management/portal-modules/portal-processguidelines/portal-processguidelines.component';
import { PortalStatusactionsComponent } from './views/workflow-management/portal-modules/portal-statusactions/portal-statusactions.component';
import { PortalServicesComponent } from './views/workflow-management/portal-modules/portal-services/portal-services.component';
import { PortalProcesstransitionComponent } from './views/workflow-management/portal-modules/portal-processtransition/portal-processtransition.component';
import { PortalDocdefinationComponent } from './views/workflow-management/portal-modules/portal-docdefination/portal-docdefination.component';
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
import { AnnualCeilconfComponent } from './views/configurations/controlled-drugs-configurations/annual-ceilingconfiguration/annual-ceilconf.component';
import { CtrlDrugsbasesaltsComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugsbasesalts/ctrl-drugsbasesalts.component';
import { CtrlDrugsconvfactComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugsconvfact/ctrl-drugsconvfact.component';
import { CtrlDrugssaltsComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugssalts/ctrl-drugssalts.component';
import { CtrlDrugssubstancesComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugssubstances/ctrl-drugssubstances.component';
import { CtrlDrugstypeComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugstype/ctrl-drugstype.component';
import { ControlleddrugsConfsetupComponent } from './views/configurations/controlled-drugs-configurations/controlleddrugs-confsetup/controlleddrugs-confsetup.component';
import { SharedCtrldrugsconfigurationComponent } from './views/configurations/controlled-drugs-configurations/shared-ctrldrugsconfiguration/shared-ctrldrugsconfiguration.component';
import { TraderAccountManagementComponent } from './views/user-management/trader-account-management/trader-account-management.component';
import { InterfacesComponent } from './views/workflow-management/workflows/interfaces/interfaces.component';
import { WorkflowsComponent } from './views/workflow-management/workflows/workflows/workflows.component';
import { ImportExportconfsetupComponent } from './views/configurations/import-exportconfigurations/import-exportconfsetup/import-exportconfsetup.component';
import { PermitReasonsComponent } from './views/configurations/import-exportconfigurations/permit-reasons/permit-reasons.component';
import { PermittypeCategoriesComponent } from './views/configurations/import-exportconfigurations/permittype-categories/permittype-categories.component';
import { PortentryExitComponent } from './views/configurations/import-exportconfigurations/portentry-exit/portentry-exit.component';
import { SharedImportexportconfigComponent } from './views/configurations/import-exportconfigurations/shared-importexportconfig/shared-importexportconfig.component';
import { AssessmentProcedureComponent } from './views/configurations/gmp-configurations/assessment-procedure/assessment-procedure.component';
import { GmpConfigsetupComponent } from './views/configurations/gmp-configurations/gmp-configsetup/gmp-configsetup.component';
import { GmpProductcategoryComponent } from './views/configurations/gmp-configurations/gmp-productcategory/gmp-productcategory.component';
import { GmpProductlineComponent } from './views/configurations/gmp-configurations/gmp-productline/gmp-productline.component';
import { SharedGmpconfigurationsComponent } from './views/configurations/gmp-configurations/shared-gmpconfigurations/shared-gmpconfigurations.component';
import { SystemProcessesComponent } from './views/workflow-management/workflows/system-processes/system-processes.component';
import { AdvertisementTypesComponent } from './views/configurations/promotional_advertisements_configurations/advertisement-types/advertisement-types.component';
import { PromotionMaterialsComponent } from './views/configurations/promotional_advertisements_configurations/promotion-materials/promotion-materials.component';
import { PromotionalAdvertconfigsetupComponent } from './views/configurations/promotional_advertisements_configurations/promotional-advertconfigsetup/promotional-advertconfigsetup.component';
import { SharedPromotionAdvertConfigurationsComponent } from './views/configurations/promotional_advertisements_configurations/shared-promotion-advert-configurations/shared-promotion-advert-configurations.component';
import { BusinessCategoriesComponent } from './views/configurations/premises-configurations/business-categories/business-categories.component';
import { BusinessScalesComponent } from './views/configurations/premises-configurations/business-scales/business-scales.component';
import { BusinessTypeCategoryComponent } from './views/configurations/premises-configurations/business-type-category/business-type-category.component';
import { BusinessTypeDetailsComponent } from './views/configurations/premises-configurations/business-type-details/business-type-details.component';
import { BusinessTypesComponent } from './views/configurations/premises-configurations/business-types/business-types.component';
import { PersonnelInstitutionsComponent } from './views/configurations/premises-configurations/personnel-institutions/personnel-institutions.component';
import { PersonnelPositionComponent } from './views/configurations/premises-configurations/personnel-position/personnel-position.component';
import { PersonnelQualificationsComponent } from './views/configurations/premises-configurations/personnel-qualifications/personnel-qualifications.component';
import { PersonnelstudyFieldComponent } from './views/configurations/premises-configurations/personnelstudy-field/personnelstudy-field.component';
import { PremiseConfigsetupComponent } from './views/configurations/premises-configurations/premise-configsetup/premise-configsetup.component';
import { PremiseTypeComponent } from './views/configurations/premises-configurations/premise-type/premise-type.component';
import { PremiseinspectRecommendationComponent } from './views/configurations/premises-configurations/premiseinspect-recommendation/premiseinspect-recommendation.component';
import { SharedPremisesconfigurationsComponent } from './views/configurations/premises-configurations/shared-premisesconfigurations/shared-premisesconfigurations.component';
import { PmsConfigsetupComponent } from './views/configurations/pms-configurations/pms-configsetup/pms-configsetup.component';
import { PmsScreeningdecisionsComponent } from './views/configurations/pms-configurations/pms-screeningdecisions/pms-screeningdecisions.component';
import { PmsanalysisDecisionComponent } from './views/configurations/pms-configurations/pmsanalysis-decision/pmsanalysis-decision.component';
import { PmsapprovalDecisionComponent } from './views/configurations/pms-configurations/pmsapproval-decision/pmsapproval-decision.component';
import { PmsevaluationDecisionsComponent } from './views/configurations/pms-configurations/pmsevaluation-decisions/pmsevaluation-decisions.component';
import { PmssamplingStagesComponent } from './views/configurations/pms-configurations/pmssampling-stages/pmssampling-stages.component';
import { PmstcmeetingDecisionComponent } from './views/configurations/pms-configurations/pmstcmeeting-decision/pmstcmeeting-decision.component';
import { SampleApplicationtypesComponent } from './views/configurations/pms-configurations/sample-applicationtypes/sample-applicationtypes.component';
import { SamplingReasonComponent } from './views/configurations/pms-configurations/sampling-reason/sampling-reason.component';
import { SharedPmsconfigurationsComponent } from './views/configurations/pms-configurations/shared-pmsconfigurations/shared-pmsconfigurations.component';
import { PortalworkflowsComponent } from './views/workflow-management/portal-workflows/portalworkflows/portalworkflows.component';
import { PortalWorkflowsetupComponent } from './views/workflow-management/portal-workflows/portal-workflowsetup/portal-workflowsetup.component';
import { PortalInterfacesComponent } from './views/workflow-management/portal-workflows/portal-interfaces/portal-interfaces.component';
import { AgeGroupsComponent } from './views/configurations/clinical-trialconfigurations/age-groups/age-groups.component';
import { ClinicalTrialpersonnelComponent } from './views/configurations/clinical-trialconfigurations/clinical-trialpersonnel/clinical-trialpersonnel.component';
import { ClinicalallocationSequenceComponent } from './views/configurations/clinical-trialconfigurations/clinicalallocation-sequence/clinicalallocation-sequence.component';
import { ClinicaldiseaseConditionsComponent } from './views/configurations/clinical-trialconfigurations/clinicaldisease-conditions/clinicaldisease-conditions.component';
import { ClinicalinterventAllocationComponent } from './views/configurations/clinical-trialconfigurations/clinicalintervent-allocation/clinicalintervent-allocation.component';
import { ClinicalinterventTypesComponent } from './views/configurations/clinical-trialconfigurations/clinicalintervent-types/clinicalintervent-types.component';
import { ClinicalinterventionAssignmentComponent } from './views/configurations/clinical-trialconfigurations/clinicalintervention-assignment/clinicalintervention-assignment.component';
import { ClinicalmaskingBindingComponent } from './views/configurations/clinical-trialconfigurations/clinicalmasking-binding/clinicalmasking-binding.component';
import { ClinicalmaskingUsedComponent } from './views/configurations/clinical-trialconfigurations/clinicalmasking-used/clinicalmasking-used.component';
import { ClinicalnatureControlsComponent } from './views/configurations/clinical-trialconfigurations/clinicalnature-controls/clinicalnature-controls.component';
import { ClinicaloutcomesTypesComponent } from './views/configurations/clinical-trialconfigurations/clinicaloutcomes-types/clinicaloutcomes-types.component';
import { ClinicalrecruitStatusesComponent } from './views/configurations/clinical-trialconfigurations/clinicalrecruit-statuses/clinicalrecruit-statuses.component';
import { ClinicalreportTypesComponent } from './views/configurations/clinical-trialconfigurations/clinicalreport-types/clinicalreport-types.component';
import { ClinicalsequenceGenerationComponent } from './views/configurations/clinical-trialconfigurations/clinicalsequence-generation/clinicalsequence-generation.component';
import { ClinicalstudyPhaseComponent } from './views/configurations/clinical-trialconfigurations/clinicalstudy-phase/clinicalstudy-phase.component';
import { ClinicalstudyPurposesComponent } from './views/configurations/clinical-trialconfigurations/clinicalstudy-purposes/clinicalstudy-purposes.component';
import { ClinicalstudyStatusComponent } from './views/configurations/clinical-trialconfigurations/clinicalstudy-status/clinicalstudy-status.component';
import { ClinicaltrialDesignsComponent } from './views/configurations/clinical-trialconfigurations/clinicaltrial-designs/clinicaltrial-designs.component';
import { FundingsourceTypesComponent } from './views/configurations/clinical-trialconfigurations/fundingsource-types/fundingsource-types.component';
import { SponsorLevelsComponent } from './views/configurations/clinical-trialconfigurations/sponsor-levels/sponsor-levels.component';
import { SponsorsNatureComponent } from './views/configurations/clinical-trialconfigurations/sponsors-nature/sponsors-nature.component';
import { StudySitesComponent } from './views/configurations/clinical-trialconfigurations/study-sites/study-sites.component';
import { ClinicaltrialConfigsetupComponent } from './views/configurations/clinical-trialconfigurations/clinicaltrial-configsetup/clinicaltrial-configsetup.component';
import { SharedclinicalTrialconfigurationsComponent } from './views/configurations/clinical-trialconfigurations/sharedclinical-trialconfigurations/sharedclinical-trialconfigurations.component';
import { ApiUsersComponent } from './views/user-management/api-users/api-users.component';
import { ExternalUsersComponent } from './views/user-management/external-users/external-users.component';


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
    PortalworkflowsComponent,
    ApiUsersComponent,
    AppInstitutionDepartments,
    SharedconfigurationsComponent,
    DataEntryFormSetupComponent,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    ProcessConfsetupComponent,
    AppGenericnamesComponent,
    ControlDocumentmanagementComponent,
    AppCurrenciesComponent,
    AppAuditTrail,
    WorkflowsComponent,
    GeneralApplicationFormComponent,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    SystemProcessesComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    PortalTermsComponent,
    TraderAccountManagementComponent,
    AppSectionsComponent,
    AppealTypesComponent,
    PortalWorkflowsetupComponent,
    ModulesComponent,
    PortalInterfacesComponent,
    SectionsComponent,
    AnnualCeilconfComponent,
    CtrlDrugsbasesaltsComponent,
    CtrlDrugsconvfactComponent,
    CtrlDrugssaltsComponent,
    CtrlDrugssubstancesComponent,
    CtrlDrugstypeComponent,
    SharedCtrldrugsconfigurationComponent,
    InterfacesComponent,    ImportExportconfsetupComponent,
    PermitReasonsComponent,
    PermittypeCategoriesComponent,
    PortentryExitComponent,
    SharedImportexportconfigComponent,
    AssessmentProcedureComponent,
    GmpConfigsetupComponent,
    GmpProductcategoryComponent,
    GmpProductlineComponent,
    SharedGmpconfigurationsComponent,
    ExternalUsersComponent,
    AdvertisementTypesComponent,
    PromotionMaterialsComponent,
    PromotionalAdvertconfigsetupComponent,
    SharedPromotionAdvertConfigurationsComponent,

    BusinessCategoriesComponent,
    BusinessScalesComponent,
    BusinessTypeCategoryComponent,
    BusinessTypeDetailsComponent,
    BusinessTypesComponent,
    PersonnelInstitutionsComponent,
    PersonnelPositionComponent,
    PersonnelQualificationsComponent,
    PersonnelstudyFieldComponent,
    PremiseConfigsetupComponent,
    PremiseTypeComponent,
    PremiseinspectRecommendationComponent,
    SharedPremisesconfigurationsComponent,
    PmsConfigsetupComponent,
    PmsScreeningdecisionsComponent,
    PmsanalysisDecisionComponent,
    PmsapprovalDecisionComponent,
    PmsevaluationDecisionsComponent,
    PmssamplingStagesComponent,
    PmstcmeetingDecisionComponent,
    SampleApplicationtypesComponent,
    SamplingReasonComponent,
    SharedPmsconfigurationsComponent,

    StudySitesComponent,
    SponsorsNatureComponent,
    SponsorLevelsComponent,
    FundingsourceTypesComponent,
    ClinicaltrialDesignsComponent,
    ClinicalstudyStatusComponent,
    ClinicalstudyPurposesComponent,
    ClinicalstudyPhaseComponent,
    ClinicalsequenceGenerationComponent,
    ClinicalreportTypesComponent,
    ClinicalrecruitStatusesComponent,
    ClinicaloutcomesTypesComponent,
    ClinicalnatureControlsComponent,
    ClinicalmaskingUsedComponent,
    ClinicalmaskingBindingComponent,
    ClinicalinterventionAssignmentComponent,
    ClinicalinterventTypesComponent,
    ClinicalinterventAllocationComponent,
    ClinicaldiseaseConditionsComponent,
    ClinicalallocationSequenceComponent,
    ClinicalTrialpersonnelComponent,
    AgeGroupsComponent,
    ClinicaltrialConfigsetupComponent,
    SharedclinicalTrialconfigurationsComponent,

    


    



    CertificateConditionComponent,
    
    AppPartnerStates,
    ControlDocmasterlistComponent,
    AppNotificationsComponent,
    AppDashboardsectionsComponent,
  
    DocumentControlsetupComponent,
    ControlleddrugsConfsetupComponent,
   
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
    AppFormsComponent,
    EcredResourcesmanagementComponent,
    DynamicFormComponent,
    FormFieldsComponent,
    FormTypesComponent,
    
    AppTranslationmanagementComponent, AppSystemlanguagesComponent,
    AppSystemlabelsmanagementComponent, InstitutionsDetailsComponent,
    AppSystemlabelsmanagementComponent,

    InstitutionsDetailsComponent,
    SystemsFunctionalitiesComponent,
   
   
    InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent, AppPublicationTypesComponent,
    DmsDocrequirementsAppstatusComponent,
    RegistrationConditionComponent,
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
    RegistrationRegulationComponent,

    ChecklistmanagementSetupComponent,
    DmsDmsdocumentSitesComponent,
    DmsProcessesDocdefinationComponent, DmsNonstructuredDocrequirementComponent,
    SharedProcessconfigurationComponent,
    UserDashboardComponent,
    FinanceDashboardComponent,
    ExternalDashboardComponent,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    PortalProcessesComponent,
    PortalProcessguidelinesComponent,
    PortalStatusactionsComponent,
    PortalServicesComponent,
    PortalProcesstransitionComponent,
    PortalDocdefinationComponent,
    IntegrationManagementComponent,
    

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
    AppInstitution, KnowledgeCenterinfomanagementComponent,
    AppInstitutionDepartments,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppCurrenciesComponent,
    AppSubmissionmethodsComponent,
    AppAuditTrail,
    GeneralApplicationFormComponent,
    AppPartnerStates,
    AppNotificationsComponent,
    AppDashboardsectionsComponent,
    AppWorkflowstatusesinterfacesComponent,
    AppNmrasinfoComponent,
    PortalTermsComponent,
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
    PortalProcessesComponent,
    PortalProcessguidelinesComponent,
    PortalStatusactionsComponent,
    PortalServicesComponent,
    PortalWorkflowsetupComponent,
    PortalProcesstransitionComponent,
    PortalDocdefinationComponent,
    AppFormsComponent,
    InterfacesComponent,
    SharedconfigurationsComponent,
    UserloginLogsComponent,
    UserpwdresetrequestLogsComponent,
    UserpwdchangerequestLogsComponent,
    UsermaliciousaccessComponent,
    SyslogsUsersaccessComponent,
    PortalInterfacesComponent,
    SyslogsComponent,
    PortalworkflowsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,
    NotSlidesInformationsComponent,
    SharedPortalNavigationsComponent,
    ControlleddrugsConfsetupComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    ProcessConfsetupComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    DataEntryFormSetupComponent,
    CertificateConditionComponent,
    ControlDocmasterlistComponent,
    ControlDocumentmanagementComponent,
    DocumentControlsetupComponent,
    RegistrationConditionComponent,
    RegistrationRegulationComponent,
    IntegrationManagementComponent,
    AppSectionsComponent,
    AppealTypesComponent,
    ModulesComponent,
    SectionsComponent,
    AnnualCeilconfComponent,
    CtrlDrugsbasesaltsComponent,
    CtrlDrugsconvfactComponent,
    CtrlDrugssaltsComponent,
    CtrlDrugssubstancesComponent,
    CtrlDrugstypeComponent,
    WorkflowsComponent,
    ImportExportconfsetupComponent,
    PermitReasonsComponent,
    PermittypeCategoriesComponent,
    PortentryExitComponent,
    SharedImportexportconfigComponent,
    AssessmentProcedureComponent,
    GmpConfigsetupComponent,
    GmpProductcategoryComponent,
    GmpProductlineComponent,
    SystemProcessesComponent,

    AdvertisementTypesComponent,
    PromotionMaterialsComponent,
    PromotionalAdvertconfigsetupComponent,
    SharedPromotionAdvertConfigurationsComponent,

    BusinessCategoriesComponent,
    BusinessScalesComponent,
    BusinessTypeCategoryComponent,
    BusinessTypeDetailsComponent,
    BusinessTypesComponent,
    PersonnelInstitutionsComponent,
    PersonnelPositionComponent,
    PersonnelQualificationsComponent,
    PersonnelstudyFieldComponent,
    PremiseConfigsetupComponent,
    PremiseTypeComponent,
    PremiseinspectRecommendationComponent,
    SharedPremisesconfigurationsComponent,

    PmsConfigsetupComponent,
    PmsScreeningdecisionsComponent,
    PmsanalysisDecisionComponent,
    PmsapprovalDecisionComponent,
    PmsevaluationDecisionsComponent,
    PmssamplingStagesComponent,
    PmstcmeetingDecisionComponent,
    SampleApplicationtypesComponent,
    SamplingReasonComponent,
    SharedPmsconfigurationsComponent,

    
    
    SharedProcessconfigurationComponent,
    SharedCtrldrugsconfigurationComponent,
   

    StudySitesComponent,
    SponsorsNatureComponent,
    SponsorLevelsComponent,
    FundingsourceTypesComponent,
    ClinicaltrialDesignsComponent,
    ClinicalstudyStatusComponent,
    ClinicalstudyPurposesComponent,
    ClinicalstudyPhaseComponent,
    ClinicalsequenceGenerationComponent,
    ClinicalreportTypesComponent,
    ClinicalrecruitStatusesComponent,
    ClinicaloutcomesTypesComponent,
    ClinicalnatureControlsComponent,
    ClinicalmaskingUsedComponent,
    ClinicalmaskingBindingComponent,
    ClinicalinterventionAssignmentComponent,
    ClinicalinterventTypesComponent,
    ClinicalinterventAllocationComponent,
    ClinicaldiseaseConditionsComponent,
    ClinicalallocationSequenceComponent,
    ClinicalTrialpersonnelComponent,
    AgeGroupsComponent,
    ClinicaltrialConfigsetupComponent,
    SharedclinicalTrialconfigurationsComponent,

   
   

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

