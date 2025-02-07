import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AppdashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/appdashboard/appdashboard.component';
import { AppCitiesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-countries/app-countries.component';
import { AppActiveUserAccounts } from 'src/app/core-modules/urimsmis-admin/views/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { UserGroupsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-groups/user-groups.component';
import { UserAccessLevelsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-access-levels/user-access-levels.component';
import { AppUserTitle } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from 'src/app/core-modules/urimsmis-admin/views/app-institutiondepartments/app-institutiondepartments.component';
import { AppAuditTrail } from 'src/app/core-modules/urimsmis-admin/views/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-partnerstates/app-partnerstates.component';
import { SystemAdministratorsComponent } from 'src/app/core-modules/urimsmis-admin/views/user-management/admins/system-administrators/system-administrators.component';
import { NavigationsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationInterfacesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { NavigationTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-types/navigation-types.component';
import { AppProcessworkflowstatusesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppstageStatusesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/appstage-statuses/appstage-statuses.component';
import { AppSystemlabelsmanagementComponent } from 'src/app/core-modules/urimsmis-admin/views/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { AppSystemlanguagesComponent } from 'src/app/core-modules/urimsmis-admin/views/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppTranslationmanagementComponent } from 'src/app/core-modules/urimsmis-admin/views/language-management/app-translationmanagement/app-translationmanagement.component';
import { UserAccounttypesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsTypesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-types/institutions-types.component';
import { InstitutionsDetailsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-details/institutions-details.component';
import { InstitutionsDepartmentsComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-departments/institutions-departments.component';
import { UsermanagementDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { PublicationDashboardComponent } from 'src/app/core-modules/urimsmis-admin/views/information-sharing/publication-dashboard/publication-dashboard.component';
import { AppGenderComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-gender/app-gender.component';
import { AppFirewallipsComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/app-firewallips/app-firewallips.component';
import { AppMyprofileComponent } from 'src/app/core-modules/urimsmis-admin/views/user-management/app-myprofile/app-myprofile.component';
import { SystemsFunctionalitiesComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { AppWorkflowsubmissionactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { SyslogsComponent } from 'src/app/core-modules/urimsmis-admin/views/syslogs/syslogs.component';
import { LocationParametersComponent } from 'src/app/core-modules/urimsmis-admin/views/configurations/location-parameters/location-parameters.component';
import { MultilingualConfigurationsComponent } from 'src/app/core-modules/urimsmis-admin/views/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { WorkflowsSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/workflows-setup/workflows-setup.component';

import { InstitutionsInformationComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/institutions-information/institutions-information.component';
import { UserSetupComponent } from 'src/app/core-modules/urimsmis-admin/views/system-administration/user-setup/user-setup.component';

import { AppWorkflowactiontypesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from 'src/app/core-modules/urimsmis-admin/views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { AppLayoutComponent } from 'src/app/core-modules/urimsmis-admin/views/system-layout/app-layout/app-layout.component';
import { AppFormsComponent } from './views/configurations/forms/app-forms-setup/app-forms.component';
import { FormTypesComponent } from './views/configurations/forms/form-types/form-types.component';
import { FormFieldsComponent } from './views/configurations/forms/form-fields/form-fields.component';
import { IntegrationManagementComponent } from './views/integration-management/integration-management.component';
import { ProcessConfsetupComponent } from './views/configurations/process-configuration/process-confsetup/process-confsetup.component';
import { ModulesComponent } from './views/configurations/process-configuration/modules/modules.component';
import { ApiUsersComponent } from './views/user-management/api-users/api-users.component';
import { InitiateDiseaseoutbreakReportingComponent } from './views/pandemic-informationsharing/initiate-diseaseoutbreak-reporting/initiate-diseaseoutbreak-reporting.component';
import { SubmittedDiseaseoutbreakRptdashComponent } from './views/pandemic-informationsharing/submitted-diseaseoutbreak-rptdash/submitted-diseaseoutbreak-rptdash.component';

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
    path: 'app-user-access-levels',
    component: UserAccessLevelsComponent
  },
  {
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
    path: 'app-institutions-departments',
    component: InstitutionsDepartmentsComponent
  }, {
    path: "app-mis-audit-trail",
    component: AppAuditTrail
  }, {
    path: "app-partner-states",
    component: AppPartnerStates
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
    path: "app-translationmanagement",
    component: AppTranslationmanagementComponent
  }, {
    path: "app-systemlanguages",
    component: AppSystemlanguagesComponent
  }, {
    path: "app-systemlabels",
    component: AppSystemlabelsmanagementComponent
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
    path: "app-publication-dashboard",
    component: PublicationDashboardComponent
  },
  {
    path: "app-gender",
    component: AppGenderComponent

  },

  {
    path: "app-firewallips",
    component: AppFirewallipsComponent
  }, {
    path: 'app-myprofile',
    component: AppMyprofileComponent
  }, {
    path: 'app-systems-functionalities',
    component: SystemsFunctionalitiesComponent
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
    path: 'app-institutions-information',
    component: InstitutionsInformationComponent
  }, {
    path: 'app-workflowstatusesinterfaces',
    component: AppWorkflowstatusesinterfacesComponent
  },


  {
    path: 'app-modules',
    component: ModulesComponent
  },{
    path: 'app-integration-management',
    component: IntegrationManagementComponent
  }, {
    path: 'api-users',
    component: ApiUsersComponent
  }, {
    path: 'initiate_diseaseoutbreak_reporting',
    component: InitiateDiseaseoutbreakReportingComponent
  }, {
    path: 'submitted-diseaseoutbreak-rptdash',
    component: SubmittedDiseaseoutbreakRptdashComponent
  }]
}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingDashboardModule { }
