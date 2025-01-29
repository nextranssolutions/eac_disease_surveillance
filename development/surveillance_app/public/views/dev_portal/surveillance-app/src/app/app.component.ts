import { Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core-services/auth.service';
import { AuthenticationService } from './core-services/authentication/authentication.service';
import { IdleService } from './core-services/idleService/idle.service';
import Popup from "devextreme/ui/popup";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auda-ecressolution';
  translations: any;
  idleState: string;
  constructor(
    public translate: TranslateService,
    public authService:AuthService,
    private _elementRef: ElementRef,
    private authenticationService:AuthenticationService,
    private idleService: IdleService
    ) { Popup.defaultOptions({
      device: { deviceType: "desktop" },
      options: {
          showCloseButton: true
      }
  }); }

  ngOnInit() {
    this.authService.checkAuthenticationState();
    let has_activesession = this.authenticationService.checkAuthenticationState();
    if (has_activesession) {
    
      this.idleService.userIdle.subscribe(isIdle => {
        if (isIdle) {
          alert('You will be logged out soon due to inactivity.');
          this.idleState = 'You will be logged out soon due to inactivity.';
        } else {
          this.idleState = 'Active';
        }
      });
    }
    this._elementRef.nativeElement.removeAttribute("ng-version");
  }
  
}


