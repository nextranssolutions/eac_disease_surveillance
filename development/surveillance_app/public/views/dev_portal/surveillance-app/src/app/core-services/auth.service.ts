import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from "../app-settings";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false; 
  userCountryOfOrigin: string;


  base_url: string;
  constructor(
    public toastr: ToastrService,
  ) {

    this.base_url = AppSettings.base_url;

  }

  checkAuthenticationState() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }
}