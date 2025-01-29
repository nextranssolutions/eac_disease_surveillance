import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PortalConfigurationsService {


  base_url: string;
  portalconfiguration: any;
  private baseUrl;

  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService) {
    this.baseUrl = AppSettings.base_url + '/api/portalconfiguration';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  getPortalConfigWorkflow(data) {
    data.table_name = btoa(data.table_name);
    this.portalconfiguration = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/getPortalWorkflowConfig', this.portalconfiguration)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  
  getallNavigationItems(level_no) {
    this.portalconfiguration = {
      headers: { 'Accept': 'application/json' },
      params:{level:level_no}
    };

    return this.HttpClient.get(this.baseUrl + '/getAllPortalNavigationItems', this.portalconfiguration)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getAppPortalNavigationMenus() {
    this.portalconfiguration = {
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppPortalNavigationMenus', this.portalconfiguration)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onDeletePortalWorkflowsDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.portalconfiguration = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeletePortalWorkflowsDetails', dataForm, this.portalconfiguration)
      .pipe(map(data => {
        return data;
      }));
  }
}


