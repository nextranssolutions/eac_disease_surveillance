import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './custom-translate-loader';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class CompositeTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    return new CustomTranslateLoader(this.http).getTranslation(lang)
      .pipe(
        catchError(() => {
          return new TranslateHttpLoader(this.http, './assets/i18n/', '.json').getTranslation(lang)
            .pipe(
              catchError((error) => {
                console.error('Failed to load translations from custom and default loader', error);
                return throwError('Failed to load translations');
              })
            );
        })
      );
  }
}