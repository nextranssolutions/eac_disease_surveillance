import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class DashbordManagementService {
  base_url: string;

  private baseUrl;
  dashboard: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private authService: AuthenticationService) { 
      this.baseUrl = AppSettings.base_url + '/api/dashboardmanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {
    
    this.dashboard = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.dashboard)
      .pipe(map(dashboardData => {

        return dashboardData;
      }));
  }
  onGetDashboardProcessInformation(data, action_url) {
    data.table_name = btoa(data.table_name);
    const loggedInUserId = localStorage.getItem('id');
    data.user_information_id = loggedInUserId; 
    this.dashboard = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.dashboard)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  funcFetchPublicDetailsCounter() {
    this.dashboard = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchPublicDetailsCounter', this.dashboard)
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
    this.dashboard = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.dashboard)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  onLoadWorkflowConfig(data) {
    data.table_name = btoa(data.table_name);
    this.dashboard = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadWorkflowData', this.dashboard)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onLoadWorkflowData(data) {
    data.table_name = btoa(data.table_name);
    this.dashboard = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadDashboardData', this.dashboard)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onSaveDashboardDetails(table_name,data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.dashboard = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.dashboard)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteDashboardDetails(dataForm,table_name,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.dashboard = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json',"Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteDashboardDetails', dataForm, this.dashboard)
      .pipe(map(data => {
        return data;
      }));
  }
}
