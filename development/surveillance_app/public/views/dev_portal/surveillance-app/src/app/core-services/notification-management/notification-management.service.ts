import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationManagementService {
  base_url: string;

  private baseUrl;
  notification: any;
  noti:any;
  key:string= 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private authService: AuthenticationService) { 
    this.baseUrl = AppSettings.base_url + '/api/notificationmanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {
    
    this.noti = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.noti)
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
    this.noti = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.noti)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  
  onLoadNotificationData(data) {
    data.table_name = btoa(data.table_name);
    this.noti = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadNotificationData', this.noti)
      .pipe(map(data => {
            return <any>data;
      }));
  }

  onLoadNotificationProcesses(data) {
    data.table_name = btoa(data.table_name);
    this.noti = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadNotificationProcesses', this.noti)
      .pipe(map(data => {
            return <any>data;
      }));
  }

  

  onSaveNotificationDetailsDetails(table_name,data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.noti = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.noti)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteNotificationsDetails(dataForm,table_name,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.noti = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json',"Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteNotificationsDetails', dataForm, this.noti)
      .pipe(map(data => {
        return data;
      }));
  }
}