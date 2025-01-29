// token-refresh-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve() {
    return this.authService.refreshAccessToken();
  }
}