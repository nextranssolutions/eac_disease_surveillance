import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-disease-outbreaks-info',
  templateUrl: './disease-outbreaks-info.component.html',
  styleUrl: './disease-outbreaks-info.component.css'
})
export class DiseaseOutbreaksInfoComponent {
  @Input() pandemic_reportinginformation_id: number;
  @Input() ReportingInfoForm:FormGroup;

  table_name: string = 'txn_diseasespandemics_information';
  parameter_name: string = 'diseasespandemics';
  is_readonlyfield: boolean;
  provinceInformData: any;
  districtInfoData: any;

  is_adddiseasepandemicDetailsWin: boolean
  pandemicDiseasesInfoFrm: FormGroup;
  show_advancesearch: boolean;
  data_record: any;
  pandemicDiseasesInformationData: any;
  loadingVisible: boolean;
  spinnerMessage: string;

  pandemicPrioritydiseasesData: any;
  suspectedSourceofInfectionData: any;
  pandemicIntenventionData: any;
  confirmedData: any;

  dataMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Report Case", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete Case", action: 'delete_record', icon: 'fa fa-edit' },

      ]
    }
  ];
  PartnerStateData: any;
  constructor(
    private router: Router,
    public toastr: ToastrService,
    public configService: ConfigurationsService,
    private formBuilder: FormBuilder,
    private infoService: InformationSharingService,
    private reportingAnalytics: ReportsService,
    public translate: TranslateService,
  ) {
    this.pandemicDiseasesInfoFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      pandemic_prioritydisease_id: new FormControl('', Validators.compose([Validators.required])),
      source_of_infection_id: new FormControl('', Validators.compose([Validators.required])),
      geographic_location: new FormControl('', Validators.compose([Validators.required])),
      is_vaccinatable_disease: new FormControl('', Validators.compose([])),
      date_of_confirmation: new FormControl('', Validators.compose([])),
      date_of_lastcase_reported: new FormControl('', Validators.compose([Validators.required])),
      suspected_cases: new FormControl('', Validators.compose([Validators.required])),
      testsundertaken: new FormControl('', Validators.compose([Validators.required])),
      confirmed_cases: new FormControl('', Validators.compose([Validators.required])),
      recovered_cases: new FormControl('', Validators.compose([Validators.required])),
      no_ofdeaths: new FormControl('', Validators.compose([Validators.required])),
      vaccine_dosesadministered: new FormControl('', Validators.compose([Validators.required])),
      pandemic_intenvention_id: new FormControl('', Validators.compose([Validators.required])),
      challenges: new FormControl('', Validators.compose([Validators.required])),
      other_comments: new FormControl('', Validators.compose([Validators.required])),
      pandemic_reportinginformation_id: new FormControl('', Validators.compose([])),
      expected_enddate: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      province_id: new FormControl('', Validators.compose([])),
      partner_state_id: new FormControl('', Validators.compose([])),



      action_id: new FormControl(null),
      status_id: new FormControl('')
    });
    this.onviewReportedpandemics(this.pandemic_reportinginformation_id);
    this.onLoadconfirmedData();
    this.onLoadpandemicIntenventionData();
    this.onLoadsuspectedSourceofInfectionData();
    this.onLoadpandemicPrioritydiseasesData();
    this.fetchPartnerStateData();

  }
  onPartnerStateChange($event) {

    if ($event.selectedItem) {
      let partner_state = $event.selectedItem;
      let partner_state_id = partner_state.id;
      this.onLoadprovinceInformData(partner_state_id);
    }
  }
  onProvinceSelectionChange($event) {

    if ($event.selectedItem) {
      let partner_state = $event.selectedItem;
      let province_id = partner_state.id;
      this.onLoaddistrictInfoData(province_id);
    }
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
  onLoaddistrictInfoData(region_id) {

    var data_submit = {
      'table_name': 'cfg_districts',
      'region_id':region_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.districtInfoData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  onLoadprovinceInformData(country_id) {

    var data_submit = {
      'table_name': 'cfg_regions',
      country_id:country_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.provinceInformData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  onLoadconfirmedData() {

    var data_submit = {
      'table_name': 'cfg_confirmation_data',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.confirmedData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  onLoadpandemicIntenventionData() {

    var data_submit = {
      'table_name': 'cfg_pandemic_intenventions',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.pandemicIntenventionData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  onLoadsuspectedSourceofInfectionData() {

    var data_submit = {
      'table_name': 'cfg_source_of_infections',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.suspectedSourceofInfectionData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
  }
  onLoadpandemicPrioritydiseasesData() {

    var data_submit = {
      'table_name': 'cfg_pandemic_prioritydiseases',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.pandemicPrioritydiseasesData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching countries information data:', error);
        });
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
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  is_onviewreported_diseases: boolean;
  onviewReportedpandemics(pandemic_reportinginformation_id) {
    this.spinnerShow('Loading...........');
    this.pandemicDiseasesInformationData = {};
    var data_submit = {
      'table_name': 'txn_diseasespandemics_information',
      'pandemic_reportinginformation_id': pandemic_reportinginformation_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onGetreportingDiseasesPandemicDetails')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.pandemicDiseasesInformationData = this.data_record.data;
            this.is_onviewreported_diseases = true;
            this.spinnerHide();
          }
        },
        error => {
          console.error('Error fetching stock levels products information data:', error);
          this.spinnerHide();
        });
  }

  dataActionStockClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDiseasePandemicDetails(data);
    } else if (action_btn.action === 'delete_record') {
      this.funcProductsDeleteDetails(data);
    }
  }
  funcEditDiseasePandemicDetails(data) {

    this.pandemicDiseasesInfoFrm.patchValue(data.data);
let partner_state_id = this.ReportingInfoForm.get('partner_state_id')?.value
    this.pandemicDiseasesInfoFrm.get('partner_state_id')?.setValue(partner_state_id)
    this.is_adddiseasepandemicDetailsWin = true;
  }
  funcProductsDeleteDetails(data) {
    // this.pandemicDiseasesInfoFrm.patchValue(data.data);
    // this.config_record = data.data.brand_name;
    // this.deleteStockLvlReportingPopupVisible = true;
  }

  response: any;

  onFuncSaveDiseasePandemicDetails() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.pandemicDiseasesInfoFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.pandemicDiseasesInfoFrm.invalid) {
      return;
    }
    // Copy the value of stock_id to pandemic_reportinginformation_id
    this.pandemicDiseasesInfoFrm.get('pandemic_reportinginformation_id')?.setValue(this.pandemic_reportinginformation_id);

    this.spinnerShow('Saving Disease Pandemic Details');

    // this.table_name = 'tra_stocklevels_productinformation';
    this.infoService.onSavePandemicReportingInformation(this.table_name, this.pandemicDiseasesInfoFrm.value, 'onFuncSaveDiseasePandemicDetails')
      .subscribe(
        response => {

          this.response = response;
          //the details 
          if (this.response.success) {
            this.onviewReportedpandemics(this.pandemic_reportinginformation_id);
            this.is_adddiseasepandemicDetailsWin = false;
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
    return window.innerHeight * percentage_height / 100;
  }


  onPandemicCellPrepared(e) {

    if (e.rowType === "data" && e.column.dataField === "is_pandemic_reported") {
      let diseasespandemics_information_id = e.data.diseasespandemics_information_id;

      if (diseasespandemics_information_id > 0) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#e31919';

      } else {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#57504d';

      }
    }

  }
}
