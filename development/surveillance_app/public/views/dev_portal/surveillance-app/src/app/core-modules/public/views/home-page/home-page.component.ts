
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

@Component({
  selector: 'app-home-page',

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  // Map options

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
  constructor(
    public reportingAnalytics: ReportsService) {

  }

  // Layers for markers, polygons, etc.
  layers: L.Layer[] = [];
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© EAC Disease Survaillance' })
    ],
    zoom: 5,
    center: L.latLng([-1.9441, 31.0619]),
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© EAC Disease Survaillance' }),
      'Open Cycle Map': L.tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© EAC Disease Survaillance' })
    },
    overlays: {
      'Big Circle': L.circle([-1.9441, 31.0619], { radius: 5000 }),
      'Big Square': L.polygon([[-1.9441, 31.0619], [-1.9441, 31.0619], [-1.9441, 31.0619], [-1.9441, 31.0619]])
    }
  }
  countryData: any = [{
    name: 'Kenya', service_description: ''
  }, {
    name: 'United REpublic of Tanzania', service_description: ''
  }, {
    name: 'Uganda', service_description: ''
  }, {
    name: 'South Sudan', service_description: ''
  }, {
    name: 'Burundi', service_description: ''
  }, {
    name: 'DRC', service_description: ''
  }, {
    name: 'Rwanda', service_description: ''
  }, {
    name: 'Somalia', service_description: ''
  }]
  reportingPeriodData: any = [{
    name: 'Annual'
  }, {
    name: 'Quater'
  }, {
    name: 'Monthly'
  }, {
    name: 'Weekly'
  }]
  regulatory_functionsdata: any = [{
    name: 'Ebola', service_description: ''
  }, {
    name: 'Marburg', service_description: ''
  }, {
    name: 'MPOX', service_description: ''
  }, {
    name: 'RVF', service_description: ''
  }]
  // Handle map ready event 
  onMapReady(map: L.Map) {
    console.log('Map is ready!', map);
    const DefaultIcon = L.Icon.Default;
    DefaultIcon.prototype.options.imagePath = 'assets/assets/images/leaflet/';
    // Example: Add a marker for the EAC headquarters in Arusha, Tanzania
    const markerIcon = L.icon({
      iconUrl: 'assets/images/leaflet/marker-icon.png',
      shadowUrl: 'assets/images/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    this.surveillanceDetailsData = [
      {
        position: [-3.3675, 36.6347] as L.LatLngTuple, // EAC Headquarters, Tanzania
        description: 'EAC Headquarters, Arusha, Tanzania',
        action: () => alert('Welcome to the EAC Headquarters in Arusha, Tanzania!')
      },
      {
        position: [-1.9577, 30.1127] as L.LatLngTuple, // Rwanda (Kigali)
        description: 'Rwanda - Kigali', diseases: 'Marburg',

        cases: '5',
        action: () => alert('You clicked on Rwanda - Kigali!')
      },
      {
        position: [0.3136, 32.5811] as L.LatLngTuple, // Uganda (Kampala)
        description: 'Uganda - Kampala', diseases: 'Ebola',

        cases: '50',
        action: () => alert('You clicked on Uganda - Kampala!')
      },
      {
        position: [-4.4419, 15.2663] as L.LatLngTuple, // DR Congo (Kinshasa)
        description: 'Democratic Republic of Congo - Kinshasa',
        diseases: 'Ebola',
        cases: '10',
        action: () => alert('You clicked on DR Congo - Kinshasa!')
      },
      {
        position: [-6.1749, 39.2245] as L.LatLngTuple, // Tanzania (Dar es Salaam)
        description: 'Tanzania - Dar es Salaam',
        diseases: 'Marburg',

        cases: '20',
        action: () => alert('You clicked on Tanzania - Dar es Salaam!')
      },
      {
        position: [-3.3614, 29.3599] as L.LatLngTuple, // Burundi (Bujumbura)
        description: 'Burundi - Bujumbura',
        diseases: 'MPOX',

        cases: '100',
        action: () => alert('You clicked on Burundi - Bujumbura!')
      },
      {
        position: [1.2864, 36.8172] as L.LatLngTuple, // Kenya (Nairobi)
        description: 'Kenya - Nairobi',
        diseases: 'RVF',

        cases: '150',
        action: () => alert('You clicked on Kenya - Nairobi!')
      },
      {
        position: [4.8594, 31.5713] as L.LatLngTuple, // South Sudan (Juba)
        description: 'South Sudan - Juba',
        diseases: 'Ebola',

        cases: '20',
        action: () => alert('You clicked on South Sudan - Juba!')
      }
    ];
    // Define an array of EAC country markers with coordinates, descriptions, and actions
    const eacMarkers: { position: L.LatLngTuple; description: string; action: () => void }[] = [
      {
        position: [-3.3675, 36.6347] as L.LatLngTuple, // EAC Headquarters, Tanzania
        description: 'EAC Headquarters, Arusha, Tanzania',
        action: () => alert('Welcome to the EAC Headquarters in Arusha, Tanzania!')
      },
      {
        position: [-1.9577, 30.1127] as L.LatLngTuple, // Rwanda (Kigali)
        description: 'Rwanda - Kigali',
        action: () => alert('You clicked on Rwanda - Kigali!')
      },
      {
        position: [0.3136, 32.5811] as L.LatLngTuple, // Uganda (Kampala)
        description: 'Uganda - Kampala',
        action: () => alert('You clicked on Uganda - Kampala!')
      },
      {
        position: [-4.4419, 15.2663] as L.LatLngTuple, // DR Congo (Kinshasa)
        description: 'Democratic Republic of Congo - Kinshasa',
        action: () => alert('You clicked on DR Congo - Kinshasa!')
      },
      {
        position: [-6.1749, 39.2245] as L.LatLngTuple, // Tanzania (Dar es Salaam)
        description: 'Tanzania - Dar es Salaam',
        action: () => alert('You clicked on Tanzania - Dar es Salaam!')
      },
      {
        position: [-3.3614, 29.3599] as L.LatLngTuple, // Burundi (Bujumbura)
        description: 'Burundi - Bujumbura',
        action: () => alert('You clicked on Burundi - Bujumbura!')
      },
      {
        position: [1.2864, 36.8172] as L.LatLngTuple, // Kenya (Nairobi)
        description: 'Kenya - Nairobi',
        action: () => alert('You clicked on Kenya - Nairobi!')
      },
      {
        position: [4.8594, 31.5713] as L.LatLngTuple, // South Sudan (Juba)
        description: 'South Sudan - Juba',
        action: () => alert('You clicked on South Sudan - Juba!')
      }
    ];

    // Add markers to the map
    eacMarkers.forEach(marker => {
      const mapMarker = L.marker(marker.position, { icon: markerIcon })
        .bindPopup(`<b>${marker.description}</b> <br><button onclick="alert('${marker.description}')">Click Me</button>`);

      this.layers.push(mapMarker);
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

}
