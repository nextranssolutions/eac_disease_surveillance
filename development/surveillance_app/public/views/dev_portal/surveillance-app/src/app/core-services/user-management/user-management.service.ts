import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppSettings } from 'src/app/app-settings';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  base_url: string;

  private baseUrl;
  user: any;
  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService) {
    this.baseUrl = AppSettings.base_url + '/api/usermanagement';
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
  onLoadAppSubmissionGuidelines(sub_module_id, section_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.user = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.user)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onGetUserInformation(data, action_url) {
    data.table_name = btoa(data.table_name);
    this.user = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.user)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  //onLoadExpertsProfilesStatusCounters
  onLoadUserAccountStatusCounters() {
    
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.user = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id,member_state_id:member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadUserAccountStatusCounters', this.user)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  //onLoadExpertsConfigData
  onLoadUserData(data) {
    data.table_name = btoa(data.table_name);
    this.user = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadUserData', this.user)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPortalUserData(data) {
    data.table_name = btoa(data.table_name);
    this.user = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadPortalUserData', this.user)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onGetSingleUserProfileDetails(data) {
    
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    data.table_name = btoa(data.table_name);
    data.user_profile_id   = loggedInUserId;
    data.user_profile_name   = loggedInUserName;
    
    this.user = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onGetSingleUserProfileDetails', this.user)
      .pipe(map(data => {
        return <any>data;
      }));
  }  
  onGetTraderInformation(data) {
    
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    data.table_name = btoa(data.table_name);
    data.user_profile_id   = loggedInUserId;
    data.user_profile_name   = loggedInUserName;
    
    this.user = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onGetTraderInformation', this.user)
      .pipe(map(data => {
        return <any>data;
      }));
  }  
  


  
  
  onsaveUserData(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.user = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.user)
      .pipe(map(data => {
        return data;
      }));
  }
  

  onDeleteUserData(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.user = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteUserData', dataForm, this.user)
      .pipe(map(data => {
        return data;
      }));
  }
  onUserAccountApproval(dataForm, appworkflow_status_id, decision_description) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.user = {
      params: { 'loggedInUserId': loggedInUserId, 'appworkflow_status_id': appworkflow_status_id, 'user_name': loggedInUserName, decision_description: decision_description },
      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onUserAccountApproval', dataForm, this.user)
      .pipe(map(data => {
        return data;
      }));
  }


  // onconfirmInitiateSelectionAndAppoitment


  onconfirmInitiateSelectionAndAppoitment(dataForm, appworkflow_status_id, decision_description) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.user = {
      params: { 'loggedInUserId': loggedInUserId, 'appworkflow_status_id': appworkflow_status_id, 'user_name': loggedInUserName, decision_description: decision_description },
      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onconfirmInitiateSelectionAndAppoitment', dataForm, this.user)
      .pipe(map(data => {
        return data;
      }));
  }

  onUserAccountRejection(dataForm, appworkflow_status_id, decision_description) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.user = {
      params: { 'loggedInUserId': loggedInUserId, 'appworkflow_status_id': appworkflow_status_id, 'user_name': loggedInUserName, decision_description: decision_description },
      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onUserAccountRejection', dataForm, this.user)
      .pipe(map(data => {
        return data;
      }));
  }

  //
  onUserAccountRegistration(data, action_url) {

    this.user = {
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, data, this.user)
      .pipe(map(data => {
        return data;
      }));
  }

  onUserSubscriptionRequest(data, action_url) {

    this.user = {
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, data, this.user)
      .pipe(map(data => {
        return data;
      }));
  }
}
