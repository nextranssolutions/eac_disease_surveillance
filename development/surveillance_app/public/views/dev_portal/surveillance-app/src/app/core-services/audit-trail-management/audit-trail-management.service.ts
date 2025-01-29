import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuditTrailManagementService {
  base_url: string;

  private baseUrl;
  config: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private authService: AuthenticationService) { 
    this.baseUrl = AppSettings.base_url + '/api/audittrailmanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {
    
    this.config = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.config)
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
    this.config = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  
  onLoadAuditTrailData(data) {
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadAuditTrailData', this.config)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onSaveAuditTrailDetailsDetails(table_name,data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.config)
      .pipe(map(data => {
        return data;
      }));
  }

  onLoadAuditTrailDataUrl(data, action_url) {
    data.table_name = btoa(data.table_name);
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onDeleteAuditTrailsDetails(dataForm,table_name,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json',"Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteAuditTrailsDetails', dataForm, this.config)
      .pipe(map(data => {
        return data;
      }));
  }
}