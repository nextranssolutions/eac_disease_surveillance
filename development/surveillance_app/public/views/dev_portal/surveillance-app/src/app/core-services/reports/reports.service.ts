import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportExcel } from 'devextreme/excel_exporter';
import { ExportingEvent } from 'devextreme/ui/data_grid';
import { Workbook } from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import saveAs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  base_url: string;

  private baseUrl;
  report: any;
  data:any;
  config:any;
  key:string= 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private authService: AuthenticationService) { 
    this.baseUrl = AppSettings.base_url + '/api/reports';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {
    
    this.report = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.report)
      .pipe(map(navigations => {

        return navigations;
      }));
  }
  
  getSafeUrl(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  onLoadAppSubmissionGuidelines(sub_module_id,section_id){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.report = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.report)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadReportData(data) {
    data.table_name = btoa(data.table_name);
    this.report = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadReportData', this.report)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onLoadUserCountryOfOriginCountData(data) {
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.http.get(this.base_url + '/onLoadUserCountryOfOriginCountData', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onSaveReportDetailsDetails(table_name,data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.report = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.report)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteReportsDetails(dataForm,table_name,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.report = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json',"Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteReportsDetails', dataForm, this.report)
      .pipe(map(data => {
        return data;
      }));
  }
  onExportingPDF(e: DxDataGridTypes.ExportingEvent) {
    // const doc = new jsPDF();
    const doc = new jsPDF({
      orientation: 'landscape' // Set landscape orientation
    });
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 0,
      columnWidths: [15,30,25,30,30,20,20,25,25,30,30,30,30,30,30]
    }).then(() => {
      doc.save('Report.pdf');
    });
  }

  onExportingExcelData(e: ExportingEvent) {
    const workbook = new Workbook();    
    const worksheet = workbook.addWorksheet('Main sheet');
    exportExcel({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function(options) {
            options.excelCell.font = { name: 'Arial', size: 12 };
            options.excelCell.alignment = { horizontal: 'left' };
        } 
    }).then(function() {
        workbook.xlsx.writeBuffer()
            .then(function(buffer: BlobPart) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Report.xlsx');
            });
    });
  }
  onLoadInformationSharingDataUrl(data, action_url) {
    // data.table_name = btoa(data.table_name);
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const userpartner_state_id = localStorage.getItem('partner_state_id');

    data.user_id = loggedInUserId;
    data.account_type_id = (account_type_id);
    data.userpartner_state_id = (userpartner_state_id);
    this.report = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.report)
      .pipe(map(data => {
        return <any>data;
      }));
  }
}