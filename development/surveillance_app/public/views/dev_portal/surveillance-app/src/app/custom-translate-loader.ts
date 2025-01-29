import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './app-settings';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  public getTranslation(locale: string): Observable<any> {
    const apiUrl = AppSettings.base_url +  `/api/onLoadTranslation/${locale}`;
    return this.http.get(apiUrl);
  }
}