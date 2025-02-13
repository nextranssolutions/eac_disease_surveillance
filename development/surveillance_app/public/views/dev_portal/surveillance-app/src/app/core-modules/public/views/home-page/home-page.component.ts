
import { Component } from '@angular/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import * as L from 'leaflet';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
const eacCountriesGeoJSON = {
  type: 'FeatureCollection',
  features: [
    // Add GeoJSON features for each EAC country
  ],
};
import { faExpand, faCompress, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { Router } from '@angular/router';
import { latLng, tileLayer, marker, icon, Map } from 'leaflet';
@Component({
  selector: 'app-home-page',

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  // Map options
  map!: Map;
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[1];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];

  show_advancesearch: boolean;
  surveillanceDetailsData: any;
  regionaData: any;
  districtData: any;
  diseasesData: any;
  mapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© EAC Disease Survaillance',
      }),
    ],
    zoom: 6,
    center: L.latLng([-1.9441, 31.0619]), // Centered on the EAC region (Rwanda as an example)
  };

  layers: L.Layer[] = [];
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© EAC Disease Survaillance' })
    ],
    zoom: 5,
    center: L.latLng([-1.9441, 31.0619]),
  };


  // Handle map ready event 
  onMapReady(map: L.Map) {
    this.map = map;
    this.onviewReportedpandemics();
  }
  updateLayers(outbreaks: any[]) {
    this.layers = outbreaks.map(outbreak =>
      L.marker([outbreak.geo_latitude, outbreak.geo_longitude], {
        icon: L.icon({
          iconSize: [15, 24],
          iconAnchor: [7, 25],
          iconUrl: 'assets/images/leaflet/marker-icon.png',
          shadowUrl: 'assets/images/leaflet/marker-shadow.png',
        })
      }).bindPopup(`<b>${outbreak.pandemic_prioritydisease}</b><br>Reported cases: ${outbreak.confirmed_cases}`)
    );
  }
  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }
  sections: { [key: string]: boolean } = {
    left: true,
    right: true,
    mapFull: false,
    leftFull: false,
    rightFull: false
  };

  faExpand = faExpand;
  faCompress = faCompress;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }

  toggleFullScreen(section: string) {
    // Ensure only one section is fullscreen at a time
    if (section === 'mapFull') {
      this.sections['leftFull'] = false;
      this.sections['rightFull'] = false;
    } else if (section === 'leftFull' || section === 'rightFull') {
      this.sections['mapFull'] = false;
    }

    this.sections[section] = !this.sections[section];
  }
  onViewDeseaseInformation(rec) {

  }
  data_record: any;
  loadingVisible: Boolean;
  spinnerMessage: string;
  pandemicDiseasesInformationData: any;
  diseasepandemicGraphData: any;
  reportFilterFrm: FormGroup;
  pandemicDiseaseData: any;
  partnerStateData: any;
  pandemicDiseaseSourceData: any;
  constructor(public configService: ConfigurationsService, public reportingAnalytics: ReportsService,
    public translate: TranslateService, public infoService: InformationSharingService, public config: ConfigurationsService, private router: Router) {
    this.reportFilterFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      pandemic_prioritydisease_id: new FormControl('', Validators.compose([])),
      partner_state_id: new FormControl('', Validators.compose([])),
      source_of_infection_id: new FormControl('', Validators.compose([]))
    });
    this.onLoaddiseasepandemicGraphData();

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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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
            this.updateLayers(this.pandemicDiseasesInformationData);
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
  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  } getTranslation(key: string): string {
    let translation: string = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }


}
