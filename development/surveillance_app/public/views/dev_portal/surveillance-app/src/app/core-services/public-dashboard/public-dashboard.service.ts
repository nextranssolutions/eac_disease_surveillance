import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { EncryptionService } from '../encryption/encryption.service';
@Injectable({
  providedIn: 'root'
})
export class PublicDashboardService {
  base_url: string;

  private baseUrl;
  info: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';
  information:any;
  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private encryptionService: EncryptionService) { 
      this.baseUrl = AppSettings.base_url + '/api/publicinfomanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {
    
    this.info = {
      params:  {module_id:module_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.info)
      .pipe(map(navigations => {

        return navigations;
      }));

  }

  onLoadPublicInfoConfig(data) {
    data.table_name = btoa(data.table_name);
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadPublicInfoConfig', this.information)
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
  
  getSafeUrl(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  onLoadAppSubmissionGuidelines(sub_module_id,section_id){
    var headers = new HttpHeaders({
      "Accept": "application/json"
    });
    this.info = {
      params: { sub_module_id: sub_module_id, section_id:section_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.info)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  
  onSearchExpertsProfile(data, action_url) {
    this.information = {
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, data, this.information)
      .pipe(map(data => {
        return data;
      }));
  }
  getUserNavigationItems(navigation_type_id) {

    this.info = {
      headers: { 'Accept': 'application/json' },
      params: {  navigation_type_id:navigation_type_id },
    };

    return this.http.get(this.baseUrl + '/getSystemNavigationItems', this.info)
      .pipe(map(navigations => {
        return navigations;
      }));


  }
}
