// auth.guard.ts
import { Injectable } from '@angular/core';
import { AuthService } from '../core-services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core-services/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  canActivate(): boolean {
    if (this.authService.isLoggednIn()) { // Implement isLoggedIn() in your AuthService
      
      return true;
    } else {
      this.router.navigate(['/public/index']); // Redirect to home if not authenticated
      this.scrollToTop();
      return false;
    }
  }
}
