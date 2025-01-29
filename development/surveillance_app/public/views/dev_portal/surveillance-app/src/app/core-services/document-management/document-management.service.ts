import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class DocumentManagementService {
  base_url: string;

  private baseUrl;
  document: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService) {
    this.baseUrl = AppSettings.base_url + '/api/documentmanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onConfigurationItemswithUrl(data, action_url) {

    this.document = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.document)
      .pipe(map(documentData => {

        return documentData;
      }));
  }
  getApplicationDocumentDownloadurl(application_code, node_ref, document_id) {
    const loggedInUserId = localStorage.getItem('id');
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.document = {
      params: { user_id: loggedInUserId, 'application_code': application_code, node_ref: node_ref, uploadeddocuments_id: document_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getApplicationDocumentDownloadurl', this.document)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  onLoadAppSubmissionGuidelines(sub_module_id, section_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.document = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.document)
      .pipe(map(data => {
        return <any>data;
      }));
  }


  onLoadDocumentData(data) {
    data.table_name = btoa(data.table_name);
    this.document = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadonLoadDocumentDataConfig', this.document)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPreviewDocumentData(data) {
    data.table_name = btoa(data.table_name);
    this.document = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadonLoadDocumentDataConfig', this.document)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onSaveDocumentDetailsDetails(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.document = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.document)
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteUploadedDocumentDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.document = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteUploadedDocumentDetails', dataForm, this.document)
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteDocumentDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.document = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteDocumentDetails', dataForm, this.document)
      .pipe(map(data => {
        return data;
      }));
  }
  uploadApplicationDMSDocument(uploadData, application_code, action_url) {

    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.document = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, application_code: application_code },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };

    return this.http.post(this.baseUrl + '/' + action_url, uploadData, this.document)
      .pipe(map(data => {
        return data;
      }));
  }
  onCellPrepared(e) {
    
    if(e.rowType === "data" && e.column.dataField === "uploaded_on") {
      let uploadeddocuments_id =e.data.uploadeddocuments_id;

       
        if(uploadeddocuments_id >0){
          e.cellElement.style.color = 'black';
          e.cellElement.style.backgroundColor = '#228B22';    
        }
        else{
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#913831';  
        
        }
          
    }
}
}