import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimeout: any;
  private readonly INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

  constructor(private router: Router,  public authService: AuthenticationService) {
    this.setupInactivityListeners();
  }

  setupInactivityListeners() {
    this.resetInactivityTimeout();

    document.body.addEventListener('mousemove', () => this.resetInactivityTimeout());
    document.body.addEventListener('keydown', () => this.resetInactivityTimeout());
    document.body.addEventListener('click', () => this.resetInactivityTimeout());
  }

  resetInactivityTimeout() {
    clearTimeout(this.inactivityTimeout);

    this.inactivityTimeout = setTimeout(() => {
      this.logoutUser();
    }, this.INACTIVITY_LIMIT);
  }

  logoutUser() {
    
    this.authService.funcUserLogOut();
  }
}
