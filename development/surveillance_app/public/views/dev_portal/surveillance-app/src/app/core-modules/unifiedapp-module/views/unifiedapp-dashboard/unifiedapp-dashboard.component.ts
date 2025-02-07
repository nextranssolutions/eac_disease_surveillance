import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-unifiedapp-dashboard',
  templateUrl: './unifiedapp-dashboard.component.html',
  styleUrl: './unifiedapp-dashboard.component.css'
})
export class UnifiedappDashboardComponent {
  loadingVisible: boolean;
  spinnerMessage: string;
  data_record: any;
  regulatory_functionsdata: any;
  user_group_data: any;
  userGroupId: number;
  pandemicDiseasesInformationData: any;
  diseasepandemicGraphData: any;
  reportFilterFrm: FormGroup;
  pandemicDiseaseData: any;
  partnerStateData: any;
  pandemicDiseaseSourceData: any;
  constructor(public configService: ConfigurationsService, public reportingAnalytics: ReportsService,
    public translate: TranslateService, public infoService: InformationSharingService, public config: ConfigurationsService, private router: Router, public workflowService: WokflowManagementService) {
    this.reportFilterFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      pandemic_prioritydisease_id: new FormControl('', Validators.compose([])),
      partner_state_id: new FormControl('', Validators.compose([])),
      source_of_infection_id: new FormControl('', Validators.compose([]))
    });
    this.onLoadRegulatoryFunctions();
    this.onLoaddiseasepandemicGraphData();
    this.onviewReportedpandemics();
    this.onLoadpandemicDiseaseData();
    this.onLoadpandemicDiseaseSourceData();
    this.fetchPartnerStateData();

  }
  ngInit() {

  }
  onFilterDataSelectionChange($event) {
    this.onLoaddiseasepandemicGraphData();
    this.onviewReportedpandemics();
  }
  onLoadpandemicDiseaseData() {

    var data_submit = {
      'table_name': 'cfg_pandemic_prioritydiseases',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.pandemicDiseaseData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  onLoadpandemicDiseaseSourceData() {

    var data_submit = {
      'table_name': 'cfg_source_of_infections',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.pandemicDiseaseSourceData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  fetchPartnerStateData() {

    var data_submit = {
      'table_name': 'cfg_countries',
      'is_partner_state': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.partnerStateData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  customizeTooltip(arg: any) {
    return {
      text: `${arg.seriesName} : ${arg.valueText}`
    };
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onLoadRegulatoryFunctions() {
    this.spinnerShow('Loading...')
    this.workflowService.getRegultoryFunctionUserAccess()
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatory_functionsdata = this.data_record.data;
          }
          this.spinnerHide();
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
  onProceedToApplication(record) {

    localStorage.setItem('regulatory_function', JSON.stringify(record));
    this.router.navigate(['./../' + record.router_url]);
    this.scrollToTop();
  }
  onLoaddiseasepandemicGraphData() {
    this.spinnerShow('Loading...........');
    this.pandemicDiseasesInformationData = {};
    let form_data = this.reportFilterFrm.value;
    var data_submit = {
      'table_name': 'txn_diseasespandemics_information',
      partner_state_id: this.reportFilterFrm.get('partner_state_id')?.value,
      pandemic_prioritydisease_id: this.reportFilterFrm.get('pandemic_prioritydisease_id')?.value,
      source_of_infection_id: this.reportFilterFrm.get('source_of_infection_id')?.value,
    }

    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onGetdiseasepandemicGraphInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.diseasepandemicGraphData = this.data_record.data;

            this.spinnerHide();
          }
        },
        error => {
          console.error('Error fetching stock levels products information data:', error);
          this.spinnerHide();
        });


  }
  onviewReportedpandemics() {
    this.spinnerShow('Loading...........');
    this.pandemicDiseasesInformationData = {};
    let form_data = this.reportFilterFrm.value;

    var data_submit = {
      'table_name': 'txn_diseasespandemics_information',
      partner_state_id: this.reportFilterFrm.get('partner_state_id')?.value,
      pandemic_prioritydisease_id: this.reportFilterFrm.get('pandemic_prioritydisease_id')?.value,
      source_of_infection_id: this.reportFilterFrm.get('source_of_infection_id')?.value,
    }

    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onGetreportedDiseasesPandemicDetails')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.pandemicDiseasesInformationData = this.data_record.data;

            this.spinnerHide();
          }
        },
        error => {
          console.error('Error fetching stock levels products information data:', error);
          this.spinnerHide();
        });
  }
  showDataGrid(e: any) {

  }
  onAdvancePandemicRegistrySearch(e) {
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
  show_advancesearch: boolean;
  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  } getTranslation(key: string): string {
    let translation: string = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
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
