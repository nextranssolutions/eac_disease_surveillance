
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  base_url: string;
  private baseUrl;
  config: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService, private encryptionService: EncryptionService) {
    this.baseUrl = AppSettings.base_url + '/api/configurations';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {

    this.config = {
      params: { module_id: module_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));
  }
  funcFetchPublicDetailsCounter() {

    this.config = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchPublicDetailsCounter', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

  }


  onEnableConfigurationsDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onEnableConfigurationsDetails', dataForm, this.config)
      .pipe(map(data => {
        return data;
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
    this.config = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }


  onLoadConfigurationData(data, action_url = 'onLoadConfigurationData') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getAppRegulatoryFunctionFeeConfig(data, action_url = 'getAppRegulatoryFunctionFeeConfig') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getFeesChargesConfigurations(data, action_url = 'getFeesChargesConfigurations') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  // getAppRegulatoryFunctionFeeConfig(regulatory_function_id) {
    
  //   this.config = {
  //     headers: { 'Accept': 'application/json' },
  //     params:{user_group_id:regulatory_function_id}
  //   };

  //   return this.HttpClient.get(this.baseUrl + '/getAppRegulatoryFunctionFeeConfig', this.config)
  //     .pipe(map(data => {
  //       return <any>data;
  //     }));
  // }

  onLoadApplicationtablsList(data, action_url = 'onLoadApplicationtablsList') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  

  onLoadTranslationManagement(data) {
    data.table_name = btoa(data.table_name);

    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadTranslationManagement', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onSaveConfigurationDetailsDetails(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.config)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteConfigurationsDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteConfigurationsDetails', dataForm, this.config)
      .pipe(map(data => {
        return data;
      }));
  }

  onSavingLanguageTranslationManagement(table_name, data, post_data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name, 'permission_data': post_data },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.config)
      .pipe(map(data => {
        return data;
      }));
  }

}
