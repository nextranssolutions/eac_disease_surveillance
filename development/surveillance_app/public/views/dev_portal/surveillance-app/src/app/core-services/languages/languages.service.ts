import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  base_url: string;

  private baseUrl;
  private apiUrl = AppSettings.base_url +  '/api/onLoadTranslation';
  lang: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private authService: AuthenticationService) { 
    this.baseUrl = AppSettings.base_url + '/api/languages';
    
  }


  getTranslations(locale: string): Observable<any> {
    const url = `${this.apiUrl}/${locale}`;
    return this.http.get<any>(url);
  }

  
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {
    
    this.lang = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.lang)
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
    this.lang = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.lang)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  
  onLoadLanguageData(data) {
    data.table_name = btoa(data.table_name);
    this.lang = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadLanguageData', this.lang)
      .pipe(map(data => {
            return <any>data;
      }));
  }
  onSaveLanguageDetails(table_name,data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.lang = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.lang)
      .pipe(map(data => {
        return data;
      }));
  }

}