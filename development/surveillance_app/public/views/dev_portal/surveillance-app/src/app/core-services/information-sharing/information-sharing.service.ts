import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { EncryptionService } from '../encryption/encryption.service';
@Injectable({
  providedIn: 'root'
})
export class InformationSharingService {
  base_url: string;

  private baseUrl;
  information: any;
  data: any;
  config: any;
  key: string = 'kPJks1MrdXE03n8H';
  uploadUrl: string;
  infobaseUrl: string;
  application_details: any;

  constructor(
    private HttpClient: HttpClient, 
    private http: HttpClient, 
    private sanitizer: DomSanitizer, 
    private authService: AuthenticationService,
    private encryptionService: EncryptionService) {
    this.baseUrl = AppSettings.base_url + '/api/informationsharing';
    this.uploadUrl = AppSettings.base_url + '/api/documentmanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(data) {
    data.table_name = btoa(data.table_name);

    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadInformationSharingConfig', this.information)
      .pipe(map(navigations => {
        return navigations;
      }));
  }

  onLoadInformationSharingConfig(data) {
    data.table_name = btoa(data.table_name);

    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadInformationSharingConfig', this.information)
      .pipe(map(navigations => {
        return navigations;
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
    this.information = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadInformationSharingDataUrl(data, action_url) {
    data.table_name = btoa(data.table_name);
    data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onSaveInformationSharingDetails(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, data, this.information)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteInformationSharingDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteInfoSharingData', dataForm, this.information)
      .pipe(map(data => {
        return data;
      }));
  }

  uploadApplicationDMSDocument(uploadData, application_code, action_url) {

    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, application_code: application_code },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };

    return this.http.post(this.uploadUrl + '/' + action_url, uploadData, this.information)
      .pipe(map(data => {
        return data;
      }));
  }

  
  funcFetchKnowledgeCenterCounter() {
    this.information = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchKnowledgeCenterCounter', this.information)
      .pipe(map(navigations => {
        return navigations;
      }));
  }

  funcFetchExpertPublicationsCounter() {
    this.information = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchExpertPublicationsCounter', this.information)
      .pipe(map(navigations => {
        return navigations;
      }));
  }
  funcFetchResourcesCounter() {
    this.information = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchResourcesCounter', this.information)
      .pipe(map(navigations => {
        return navigations;
      }));
  }

}