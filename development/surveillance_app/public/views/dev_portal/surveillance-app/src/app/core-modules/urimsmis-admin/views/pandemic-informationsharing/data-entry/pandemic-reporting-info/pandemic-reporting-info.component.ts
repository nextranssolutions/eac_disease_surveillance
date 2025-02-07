import { Component, input, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgWizardService } from 'ng-wizard';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-pandemic-reporting-info',
  templateUrl: './pandemic-reporting-info.component.html',
  styleUrl: './pandemic-reporting-info.component.css'
})
export class PandemicReportingInfoComponent {
  @Input() ReportingInfoForm:FormGroup;
  @Input() is_readonlyfield:boolean;
  loadingVisible: boolean;
  show_advancesearch:boolean =false;
  spinnerMessage: string;
  PartnerStateData:any;
  ReportingPeriodTypeData:any;
  PandemicReportingTypeData:any;
  PandemicSourceofInformationData:any;
  reportingInstitutionData:any;
  data_record:any;
 constructor(
    private router: Router,
    public toastr: ToastrService,
    public configService: ConfigurationsService,
    private formBuilder: FormBuilder,
    private reportingAnalytics: ReportsService,
    public translate: TranslateService, 
    public ngWizardService: NgWizardService
  ) {
    this.fetchPartnerStateData();
    this.onLoadReportingPeriodTypeData();
    this.fetchInstitutionData();
    this.onLoadPandemicSourceofInformationData();
    this.onLoadPandemicReportingTypeData();


  }


  onLoadReportingPeriodTypeData() {

    var data_submit = {
      'table_name': 'cfg_reporting_period',
      is_enabled: true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.ReportingPeriodTypeData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching institutions information data:', error);
        });
  }
  fetchInstitutionData() {

    var data_submit = {
      'table_name': 'cfg_reporting_institutionstypes',
      is_enabled: true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.reportingInstitutionData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching institutions information data:', error);
        });
  }
  onLoadPandemicSourceofInformationData() {

    var data_submit = {
      'table_name': 'cfg_pandemic_informationsources',
      is_enabled: true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.PandemicSourceofInformationData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching institutions information data:', error);
        });
  }
  onLoadPandemicReportingTypeData() {

    var data_submit = {
      'table_name': 'cfg_pandemicreporting_types',
      is_enabled: true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.PandemicReportingTypeData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching institutions information data:', error);
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
            this.PartnerStateData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
}
