import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AppdashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/appdashboard/appdashboard.component';
import { AppCitiesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-countries/app-countries.component';
import { AppCurrenciesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-currencies/app-currencies.component';
import { AppActiveUserAccounts } from 'src/app/core-modules/urimsmis-admin/views/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { UserGroupsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-groups/user-groups.component';
import { UserAccessLevelsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-access-levels/user-access-levels.component';
import { AppUserTitle } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from 'src/app/core-modules/urimsmis-admin/views/app-institutiondepartments/app-institutiondepartments.component';
import { AppGenericnamesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-genericnames/app-genericnames.component';
import { AppAuditTrail } from 'src/app/core-modules/urimsmis-admin/views/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-partnerstates/app-partnerstates.component';
import { SystemAdministratorsComponent } from 'src/app/core-modules/urimsmis-admin/views/user-management/admins/system-administrators/system-administrators.component';
import { NavigationsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationInterfacesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { NavigationTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-types/navigation-types.component';
import { AppExchangeratesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-exchangerates/app-exchangerates.component';
import { AppProcessworkflowstatusesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppstageStatusesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/appstage-statuses/appstage-statuses.component';
import { AppChecklistDefinationComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/checklist_management/app-checklist-defination/app-checklist-defination.component';
import { AppChecklistTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/checklist_management/app-checklist-types/app-checklist-types.component';
import { AppPerformancescoringScalesComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/checklist_management/app-performancescoring-scales/app-performancescoring-scales.component';
import { AppDocumentRequirementsComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/document_management/app-document-requirements/app-document-requirements.component';
import { AppDocumentTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/document_management/app-document-types/app-document-types.component';
import { AppSystemlabelsmanagementComponent } from 'src/app/core-modules/urimsmis-admin/views/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { AppSystemlanguagesComponent } from 'src/app/core-modules/urimsmis-admin/views/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppTranslationmanagementComponent } from 'src/app/core-modules/urimsmis-admin/views/language-management/app-translationmanagement/app-translationmanagement.component';
import { NotificationTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/notification-mng/notification-types/notification-types.component';
import { EmailTemplatesComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/notification-mng/email-templates/email-templates.component';
import { UserAccounttypesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-types/institutions-types.component';
import { InstitutionsDetailsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-details/institutions-details.component';
import { InstitutionsDepartmentsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-departments/institutions-departments.component';
import { UsermanagementDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { PublicationDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/information-sharing/publication-dashboard/publication-dashboard.component';
import { KnowledgeCenterinfomanagementComponent } from 'src/app/core-modules/urimsmis-admin/views/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppNationalitiesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementsComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/disclaimer-statements/disclaimer-statements.component';
import { DisclaimerStatementTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/disclaimer-statement-types/disclaimer-statement-types.component';

import { DmsDocrequirementsAppstatusComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/document_management/dms-docrequirements-appstatus/dms-docrequirements-appstatus.component';
import { AppApplicationtypesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-firewallips/app-firewallips.component';
import { EcredResourcedashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/information-sharing/ecred-resourcedashboard/ecred-resourcedashboard.component';
import { KnowledgecenterDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/information-sharing/knowledgecenter-dashboard/knowledgecenter-dashboard.component';
import { SubscriptionDashComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/subscription-dash/subscription-dash.component';
import { AppMyprofileComponent } from 'src/app/core-modules/urimsmis-admin/views/user-management/app-myprofile/app-myprofile.component';
import { SystemsFunctionalitiesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { SystemguidelinesDetailComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-guidelines/systemguidelines-detail/systemguidelines-detail.component';
import { SystemguidelinesDashComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-guidelines/systemguidelines-dash/systemguidelines-dash.component';
import { AppWorkflowsubmissionactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { SyslogsComponent } from 'src/app/core-modules/urimsmis-admin/views/syslogs/syslogs.component';
import { LocationParametersComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/location-parameters/location-parameters.component';
import { SystemmanualConfigurationComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-guidelines/systemmanual-configuration/systemmanual-configuration.component';
import { MultilingualConfigurationsComponent } from 'src/app/core-modules/urimsmis-admin/views/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { WorkflowsSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/workflows-setup/workflows-setup.component';
import { NotificationManagementComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/notification-mng/notification-management/notification-management.component';
import { ProductConfigurationComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/product-configuration/product-configuration.component';
import { DocumentchecklistSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/documentchecklist-setup/documentchecklist-setup.component';
import { InstitutionsInformationComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-information/institutions-information.component';

import { NotSlidesInformationsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/not-slides-informations/not-slides-informations.component';
import { ChecklistmanagementSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/document-checklistsmng/checklistmanagement-setup/checklistmanagement-setup.component';
import { UserSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-setup/user-setup.component';


import { AppSignatoriesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/app-signatories/app-signatories.component';
import { AppOrganizationinformationComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppWorkflowactiontypesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { UserDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/dashboard/user-dashboard/user-dashboard.component';
import { FinanceDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/dashboard/finance-dashboard/finance-dashboard.component';
import { ExternalDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/dashboard/external-dashboard/external-dashboard.component';
import { SharedPortalNavigationsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-navigations/shared-portal-navigations/shared-portal-navigations.component';
import { PortalNavigationLevelsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-navigations/portal-navigation-levels/portal-navigation-levels.component';
import { PortalNavigationInterfacesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-navigations/portal-navigation-interfaces/portal-navigation-interfaces.component';
import { PortalNavigationSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-navigations/portal-navigation-setup/portal-navigation-setup.component';
import { PortalNavigationTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-navigations/portal-navigation-types/portal-navigation-types.component';
import { PortalNavigationComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-navigations/portal-navigations/portal-navigations.component';
import { ProductDashboardComponent } from 'src/app/regulatory_modules/marketing-authorisation/views/product-dashboard/product-dashboard.component';
import { LocalAgentComponent } from 'src/app/regulatory_modules/marketing-authorisation/views/new_productapp/local-agent/local-agent.component';
import { CertificateConditionComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/certificate-condition/certificate-condition.component';
import { ControlDocmasterlistComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/control-docmasterlist/control-docmasterlist.component';
import { ControlDocumentmanagementComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/control-documentmanagement/control-documentmanagement.component';
import { DocumentControlsetupComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/document-controlsetup/document-controlsetup.component';
import { RegistrationConditionComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/registration-condition/registration-condition.component';
import { RegistrationRegulationComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/registration-regulation/registration-regulation.component';
import { SopGuidlinesComponent } from 'src/app/core-modules/urimsmis-admin/views/quality_auditmanagement/sop-guidlines/sop-guidlines.component';
import { PortalTermsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-terms/portal-terms.component';
import { PortalProcessesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-processes/portal-processes.component';
import { PortalProcessguidelinesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-processguidelines/portal-processguidelines.component';
import { PortalStatusactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-statusactions/portal-statusactions.component';
import { PortalServicesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-services/portal-services.component';
import { PortalProcesstransitionComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-processtransition/portal-processtransition.component';
import { PortalDocdefinationComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/portal-modules/portal-docdefination/portal-docdefination.component';
import { AppLayoutComponent } from 'src/app/core-modules/urimsmis-admin/views/system-layout/app-layout/app-layout.component';
import { AppFormsComponent } from './views/configurations/forms/app-forms-setup/app-forms.component';
import { FormTypesComponent } from './views/configurations/forms/form-types/form-types.component';
import { FormFieldsComponent } from './views/configurations/forms/form-fields/form-fields.component';
import { IntegrationManagementComponent } from './views/integration-management/integration-management.component';
import { ProcessConfsetupComponent } from './views/configurations/process-configuration/process-confsetup/process-confsetup.component';
import { NewProductapplicationComponent } from 'src/app/regulatory_modules/marketing-authorisation/views/new_productapp/new-productapplication/new-productapplication.component';
import { AppSectionsComponent } from './views/configurations/process-configuration/application-section/app-sections.component';
import { AppealTypesComponent } from './views/configurations/process-configuration/appeal-types/appeal-types.component';
import { ModulesComponent } from './views/configurations/process-configuration/modules/modules.component';
import { SectionsComponent } from './views/configurations/process-configuration/sections/sections.component';

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

//./admin-ecres/app-dashboard
const routes: Routes = [{
  path: '',
  component: AppLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: AppdashboardComponent
  }, {
    path: 'index',
    component: AppdashboardComponent
  }, {
    path: 'app-dashboard',
    component: AppdashboardComponent
  }, {
    path: 'app-countries-cities-provinces',
    component: AppCitiesComponent
  }, {
    path: 'app-countries',
    component: AppCountriesComponent
  }, {
    path: 'app-active-user-accounts',
    component: AppActiveUserAccounts
  }, {
    path: 'app-user-groups',
    component: UserGroupsComponent
  }, {
    path: 'app-currencies',
    component: AppCurrenciesComponent
  }, {
    path: 'app-currenciesexchange-rates',
    component: AppExchangeratesComponent
  }, {
    path: 'app-navigation-items',
    component: NavigationsComponent
  }, {
    path: 'app-navigation-types',
    component: NavigationTypesComponent
  }, {
    path: 'app-navigation-levels',
    component: NavigationLevelsComponent
  }, {
    path: "app-systeminterfaces",
    component: NavigationInterfacesComponent

  },

  {
    path: "app-portal-navigation-interfaces",
    component: PortalNavigationInterfacesComponent
  },
  {
    path: "app-portalworkflows",
    component: PortalworkflowsComponent
  },
  
  {
    path: "app-system-processes",
    component: SystemProcessesComponent
  },
  {
    path: "app-portal-interfaces",
    component: PortalInterfacesComponent
  },
  {
    path: "app-portal-workflowsetup",
    component: PortalWorkflowsetupComponent
  },
  {
    path: "app-portal-navigation-levels",
    component: PortalNavigationLevelsComponent
  },
  {
    path: "app-interfaces",
    component: InterfacesComponent
  },
  {
    path: "app-workflows",
    component: WorkflowsComponent
  },
  {
    path: "app-portal-navigation-types",
    component: PortalNavigationTypesComponent
  },
  {
    path: "app-portal-navigation-setup",
    component: PortalNavigationSetupComponent
  },
  {
    path: "app-portal-navigations",
    component: PortalNavigationComponent
  },
  {
    path: 'app-user-access-levels',
    component: UserAccessLevelsComponent
  },
  {
    path: 'app-general-application-form',
    component: GeneralApplicationFormComponent
  },
  {
    path: 'app-data-entry-form-setup',
    component: DataEntryFormSetupComponent
  }, {
    path: 'app-user-titles',
    component: AppUserTitle
  }, {
    path: 'app-user-identification-type',
    component: AppUserIdentificationType
  }, {
    path: 'app-institutions',
    component: AppInstitution
  }, {
    path: 'app-institution-departments',
    component: AppInstitutionDepartments
  },
  {
    path: 'app-app-forms',
    component: AppFormsComponent
  },

  {
    path: 'app-process-confsetup',
    component: ProcessConfsetupComponent
  },

  {
    path: 'app-institutions-types',
    component: InstitutionsTypesComponent
  }
    ,
  {
    path: 'app-institutions-details',
    component: InstitutionsDetailsComponent
  },
  {
    path: 'app-form-fields',
    component: FormFieldsComponent
  }

    ,
  {
    path: 'app-form-types',
    component: FormTypesComponent
  },
  {
    path: 'app-shared-portal-navigations',
    component: SharedPortalNavigationsComponent
  },
  {
    path: 'app-shared-portal-navigations',
    component: NavigationInterfacesComponent,
  },

  {
    path: 'app-institutions-departments',
    component: InstitutionsDepartmentsComponent
  }, {
    path: 'app-product-genericnames',
    component: AppGenericnamesComponent
  }, {
    path: "app-mis-audit-trail",
    component: AppAuditTrail
  }, {
    path: "app-partner-states",
    component: AppPartnerStates
  }, {
    path: "app-signatories",
    component: AppSignatoriesComponent
  }, {
    path: "app-organisationinformation",
    component: AppOrganizationinformationComponent
  }, {
    path: "app-systemadministrators",
    component: SystemAdministratorsComponent
  }, {
    path: "app-processworkflowstatuses",
    component: AppProcessworkflowstatusesComponent
  }, {
    path: "app-applicationstatuses",
    component: AppProcessworkflowstatusesComponent
  }, {
    path: "app-stagesstatuses",
    component: AppstageStatusesComponent
  },
  {
    path: "app-systemprocesses",
    component: AppSystemprocessesComponent
  }, {
    path: "app-processworkflowtransitions",
    component: AppProcessworkflowtransitionsComponent
  }, {
    path: "app-processworkflowsstages",
    component: AppProcessworkflowsstagesComponent
  }, {
    path: "app-processworkflows",
    component: AppProcessworkflowsComponent
  }, {
    path: "app-performancescoring",
    component: AppPerformancescoringScalesComponent
  }, {
    path: "app-checklisttypes",
    component: AppChecklistTypesComponent
  }, {
    path: "app-checklistdefination",
    component: AppChecklistDefinationComponent
  }, {
    path: "app-documentrequirements",
    component: AppDocumentRequirementsComponent
  }, {
    path: "app-documenttypes",
    component: AppDocumentTypesComponent
  }, {
    path: "app-translationmanagement",
    component: AppTranslationmanagementComponent
  }, {
    path: "app-systemlanguages",
    component: AppSystemlanguagesComponent
  }, {
    path: "app-systemlabels",
    component: AppSystemlabelsmanagementComponent
  }, {
    path: "app-email-templates",
    component: EmailTemplatesComponent
  }, {
    path: "app-notification-types",
    component: NotificationTypesComponent
  }, {
    path: "app-useraccount-types",
    component: UserAccounttypesComponent
  }, {
    path: "app-systemdashboard-types",
    component: SystemDashbordtypesComponent
  }, {
    path: "app-usermanagement-dashboard",
    component: UsermanagementDashboardComponent
  }, {
    path: "app-ecredresource-dashboard",
    component: EcredResourcedashboardComponent
  }, {
    path: "app-knowledge-centerinfo",
    component: KnowledgeCenterinfomanagementComponent
  }, {
    path: "app-knowledgecenter-dashboard",
    component: KnowledgecenterDashboardComponent
  }, {
    path: "app-publication-dashboard",
    component: PublicationDashboardComponent
  }, {
    path: "app-nationalities",
    component: AppNationalitiesComponent
  },
  {
    path: "app-gender",
    component: AppGenderComponent

  },
  {
    path: "app-publication-types",
    component: AppPublicationTypesComponent
  },

  {
    path: "app-submissionmethods",
    component: AppSubmissionmethodsComponent
  }, {
    path: "disclaimer_statement_types",
    component: DisclaimerStatementTypesComponent
  }, {
    path: "disclaimer_statement",
    component: DisclaimerStatementsComponent
  },
  {
    path: "dms-docrequirements-appstatus",
    component: DmsDocrequirementsAppstatusComponent
  }, {
    path: 'app-applicationtypes',
    component: AppApplicationtypesComponent
  }, {
    path: "app-firewallips",
    component: AppFirewallipsComponent
  }, {
    path: "app-subscription-dashboard",
    component: SubscriptionDashComponent

  }, {
    path: 'app-myprofile',
    component: AppMyprofileComponent
  }, {
    path: 'app-systems-functionalities',
    component: SystemsFunctionalitiesComponent
  }, {
    path: 'app-systemguidelines-detail',
    component: SystemguidelinesDetailComponent
  }, {
    path: 'app-systemguidelines-dash',
    component: SystemguidelinesDashComponent
  }, {
    path: 'app-workflowsubmissionactions',
    component: AppWorkflowsubmissionactionsComponent
  }, {
    path: 'app-workflowstatusesactions',
    component: AppWorkflowstatusesactionsComponent
  }, {
    path: 'app-statusesactions',
    component: AppStatusesactionsComponent
  }, {
    path: 'app-userLogs',
    component: SyslogsComponent
  }, {
    path: 'app-locationparameter',
    component: LocationParametersComponent
  }, {
    path: 'systemmanual-configuration',
    component: SystemmanualConfigurationComponent
  }, {
    path: 'app-usersetup',
    component: UserSetupComponent
  }, {
    path: 'app-multilingualconfig',
    component: MultilingualConfigurationsComponent
  }, {
    path: 'app-navigation-setup',
    component: NavigationSetupComponent
  }, {
    path: 'app-workflows-setup',
    component: WorkflowsSetupComponent
  }, {
    path: 'app-workflows-setup',
    component: AppWorkflowactiontypesComponent
  }, {
    path: 'app-notification-management',
    component: NotificationManagementComponent
  }, {
    path: 'app-productconfiguration',
    component: ProductConfigurationComponent
  }, {
    path: 'app-documentchecklist-setup',
    component: DocumentchecklistSetupComponent
  }, {
    path: 'app-institutions-information',
    component: InstitutionsInformationComponent
  }, {

    path: 'not-slides-informations',
    component: NotSlidesInformationsComponent

  },
  {
    path: 'app-checklistmanagement-setup',
    component: ChecklistmanagementSetupComponent
  }, {
    path: 'app-workflowstatusesinterfaces',
    component: AppWorkflowstatusesinterfacesComponent
  }
    , {
    path: 'app-user-dashboard',
    component: UserDashboardComponent
  }
    , {
    path: 'app-finance-dashboard',
    component: FinanceDashboardComponent
  }
    , {
    path: 'app-external-dashboard',
    component: ExternalDashboardComponent
  },
  {
    path: 'app-product-dashboard',
    component: ProductDashboardComponent
  },
  {
    path: 'app-new-productapplication',
    component: NewProductapplicationComponent
  },

  {
    path: 'app-app-sections',
    component: AppSectionsComponent
  },
  {
    path: 'app-appeal-types',
    component: AppealTypesComponent
  },
  {
    path: 'app-modules',
    component: ModulesComponent
  },
  {
    path: 'app-sections',
    component: SectionsComponent
  },

  {
    path: 'app-annual-ceilconf',
    component: AnnualCeilconfComponent
  },
  {
    path: 'app-ctrl-drugsbasesalts',
    component: CtrlDrugsbasesaltsComponent
  },
  {
    path: 'app-ctrl-drugsconvfact',
    component: CtrlDrugsconvfactComponent
  },
  {
    path: 'app-ctrl-drugssalts',
    component: CtrlDrugssaltsComponent
  },
  {
    path: 'app-ctrl-drugssubstances',
    component: CtrlDrugssubstancesComponent
  },
  {
    path: 'app-ctrl-drugstype',
    component: CtrlDrugstypeComponent
  },
  {
    path: 'app-controlleddrugs-confsetup',
    component: ControlleddrugsConfsetupComponent
  },
  {
    path: 'app-shared-ctrldrugsconfiguration',
    component: SharedCtrldrugsconfigurationComponent
  },

  {
    path: 'app-import-exportconfsetup',
    component: ImportExportconfsetupComponent
  },
  {
    path: 'app-permit-reasons',
    component: PermitReasonsComponent
  },
  {
    path: 'app-permittype-categories',
    component: PermittypeCategoriesComponent
  },
  {
    path: 'app-portentry-exit',
    component: PortentryExitComponent
  },
  {
    path: 'app-shared-importexportconfig',
    component: SharedImportexportconfigComponent
  },
  {
    path: 'app-assessment-procedure',
    component: AssessmentProcedureComponent
  },
  {
    path: 'app-gmp-configsetup',
    component: GmpConfigsetupComponent
  },
  {
    path: 'app-gmp-productcategory',
    component: GmpProductcategoryComponent
  },
  {
    path: 'app-gmp-productline',
    component: GmpProductlineComponent
  },
  {
    path: 'app-shared-gmpconfigurations',
    component: SharedGmpconfigurationsComponent
  },

  // app-advertisement-types
  {
    path: 'app-advertisement-types',
    component: AdvertisementTypesComponent
  },
  {
    path: 'app-promotion-materials',
    component: PromotionMaterialsComponent
  },  {
    path: 'app-promotional-advertconfigsetup',
    component: PromotionalAdvertconfigsetupComponent
  },  {
    path: 'app-shared-promotion-advert-configurations',
    component: SharedPromotionAdvertConfigurationsComponent
  },
  {
    path: 'app-business-categories',
    component: BusinessCategoriesComponent
  },
  {
    path: 'app-business-scales',
    component: BusinessScalesComponent
  },
  {
    path: 'app-business-type-category',
    component: BusinessTypeCategoryComponent
  },
  {
    path: 'app-business-type-details',
    component: BusinessTypeDetailsComponent
  },
  {
    path: 'app-business-types',
    component: BusinessTypesComponent
  },
  {
    path: 'app-personnel-institutions',
    component: PersonnelInstitutionsComponent
  },
  {
    path: 'app-personnel-position',
    component: PersonnelPositionComponent
  },
  {
    path: 'app-personnel-qualifications',
    component: PersonnelQualificationsComponent
  },
  {
    path: 'app-personnelstudy-field',
    component: PersonnelstudyFieldComponent
  },
  {
    path: 'app-premise-configsetup',
    component: PremiseConfigsetupComponent
  },
  {
    path: 'app-premise-type',
    component: PremiseTypeComponent
  },
  {
    path: 'app-premiseinspect-recommendation',
    component: PremiseinspectRecommendationComponent
  },
  {
    path: 'app-shared-premisesconfigurations',
    component: SharedPremisesconfigurationsComponent
  },

  {
    path: 'app-pms-configsetup',
    component: PmsConfigsetupComponent
  },
    {
    path: 'app-pms-screeningdecisions',
    component: PmsScreeningdecisionsComponent
  },  
   {
    path: 'app-pmsanalysis-decision',
    component: PmsanalysisDecisionComponent
  },   {
    path: 'app-pmsapproval-decision',
    component: PmsapprovalDecisionComponent
  },  
   {
    path: 'app-pmsevaluation-decisions',
    component: PmsevaluationDecisionsComponent
  },  
   {
    path: 'app-pmssampling-stages',
    component: PmssamplingStagesComponent
  },  
   {
    path: 'app-pmstcmeeting-decision',
    component: PmstcmeetingDecisionComponent
  },  
   {
    path: 'app-sample-applicationtypes',
    component: SampleApplicationtypesComponent
  },  
   {
    path: 'app-sampling-reason',
    component: SamplingReasonComponent
  },  
   {
    path: 'app-shared-pmsconfigurations',
    component: SharedPmsconfigurationsComponent
  },

  {
    path: 'app-age-groups',
    component: AgeGroupsComponent
  },
  {
    path: 'app-clinical-trialpersonnel',
    component: ClinicalTrialpersonnelComponent
  },
    {
    path: 'app-clinicalallocation-sequence',
    component: ClinicalallocationSequenceComponent
  },  
   {
    path: 'app-clinicaldisease-conditions',
    component: ClinicaldiseaseConditionsComponent
   },
    {
    path: 'app-clinicalintervent-allocation',
    component: ClinicalinterventAllocationComponent
  },
    {
    path: 'app-clinicalintervent-types',
    component: ClinicalinterventTypesComponent
  },
    {
    path: 'app-clinicalintervention-assignment',
    component: ClinicalinterventionAssignmentComponent
  },
    {
    path: 'aapp-clinicalmasking-binding',
    component: ClinicalmaskingBindingComponent
  },
    {
    path: 'app-clinicalmasking-used',
    component: ClinicalmaskingUsedComponent
  },

    {
    path: 'app-clinicalnature-controls',
    component: ClinicalnatureControlsComponent
  },  
   {
    path: 'app-sharedclinical-trialconfigurations',
    component: SharedclinicalTrialconfigurationsComponent
  },  
    {
    path: 'app-clinicaltrial-configsetup',
    component: ClinicaltrialConfigsetupComponent
  },  
  
   {
    path: 'app-age-groups',
    component: ClinicalrecruitStatusesComponent
  },  
   {
    path: 'app-clinicalrecruit-statuses',
    component: ClinicalrecruitStatusesComponent
  },  
   {
    path: 'app-clinicalreport-types',
    component: ClinicalreportTypesComponent
  },  
   {
    path: 'app-clinicalsequence-generation',
    component: ClinicalsequenceGenerationComponent
  },  
   {
    path: 'app-clinicalstudy-phase',
    component: ClinicalstudyPhaseComponent
  },  
   {
    path: 'app-clinicalstudy-purposes',
    component: ClinicalstudyPurposesComponent
  },  
   {
    path: 'app-clinicalstudy-status',
    component: ClinicalstudyStatusComponent
  },  
   {
    path: 'app-clinicaltrial-designs',
    component: ClinicaltrialDesignsComponent
  },  
   {
    path: 'app-fundingsource-types',
    component: FundingsourceTypesComponent
  },  
   {
    path: 'app-sponsor-levels',
    component: SponsorLevelsComponent
  },  
   {
    path: 'app-sponsors-nature',
    component: SponsorsNatureComponent
  },  
   {
    path: 'app-study-sites',
    component: StudySitesComponent
  },  

  {
    path: 'app-local-agent',
    component: LocalAgentComponent
  },
  {
    path: 'app-certificate-condition',
    component: CertificateConditionComponent
  },
  {
    path: 'app-control-docmasterlist',
    component: ControlDocmasterlistComponent
  },
  {
    path: 'app-control-documentmanagement',
    component: ControlDocumentmanagementComponent
  },
  {
    path: 'app-document-controlsetup',
    component: DocumentControlsetupComponent
  },
  {
    path: 'app-registration-condition',
    component: RegistrationConditionComponent
  },
  {
    path: 'app-registration-regulation',
    component: RegistrationRegulationComponent
  },
  {
    path: 'app-sop-guidlines',
    component: SopGuidlinesComponent
  },
  {
    path: 'app-portal-terms',
    component: PortalTermsComponent
  },
  {
    path: 'app-portal-processes',
    component: PortalProcessesComponent
  },
  {
    path: 'app-portal-processguidelines',
    component: PortalProcessguidelinesComponent
  },
  {
    path: 'app-portal-statusactions',
    component: PortalStatusactionsComponent
  },
  {
    path: 'app-portal-services',
    component: PortalServicesComponent
  },
  {
    path: 'app-portal-processtransition',
    component: PortalProcesstransitionComponent
  },
  {
    path: 'app-portal-docdefination',
    component: PortalDocdefinationComponent
  },
  {
    path: 'app-integration-management',
    component: IntegrationManagementComponent
  }, {
    path: 'trader-account-management',
    component: TraderAccountManagementComponent
  }, {
    path: 'api-users',
    component: ApiUsersComponent
  }, {
    path: 'external-users',
    component: ExternalUsersComponent
  },  
  ]
}] 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingDashboardModule { }
