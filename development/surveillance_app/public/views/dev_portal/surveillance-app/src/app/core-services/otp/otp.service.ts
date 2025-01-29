import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  base_url: string;
  user: any;
  data_submit: any;
  private baseUrl;

  constructor(
    private http: HttpClient) {
    this.baseUrl = AppSettings.base_url + '/api/otp';
  }

  onUserOtpRequest(data, action_url) {
    // data.email_address = btoa(data.email_address)
    this.user = {
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, {
      email_address: btoa(data.email_address)
    }, this.user)
      .pipe(map(data => {
        return data;
      }));
  }

  onUserLoginOtpRequest(data, action_url) {
    this.user = {
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, {
      email_address: btoa(data.email_address),
      password: btoa(data.password),
      otp_value: btoa(data.otp_value)
    }, this.user)
      .pipe(map(returndata => {
        this.data_submit = [];
        return returndata;
      }));
  }
}
