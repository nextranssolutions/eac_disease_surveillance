import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, lastValueFrom } from "rxjs";
import { AppSettings } from "../app-settings";


export class Change<T> {
  type: 'update'

  key: any;

  data: Partial<T>;
}


@Injectable({
  providedIn: 'root',
})
export class AppmenuService {

  base_url: string;

  private baseUrl;
  private groupAccessNavPermissionsUrl;
  url: any;
  orders$: any;


  constructor(private http: HttpClient,) {
    this.base_url = AppSettings.base_url;
    this.baseUrl = this.base_url;
    this.groupAccessNavPermissionsUrl = this.base_url + '/api/sysadministration/onSaveGroupNavPermissions';
  }

// For assigning user group a nav and access level for it
  async saving(change: Change<any>): Promise<any> {
    const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await lastValueFrom(this.http.post<any>(`${this.groupAccessNavPermissionsUrl}`, change.data));
  }
}


