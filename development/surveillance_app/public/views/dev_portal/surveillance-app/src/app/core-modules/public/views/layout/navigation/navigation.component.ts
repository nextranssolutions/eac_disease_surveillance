import { Component } from '@angular/core';
import { AuthService } from 'src/app/core-services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggedIn: any;
  navigation_type_id: number = 1;
  response: any;
  navigation_items: any;
  decryptedPayload:any;

  toolbarItems: any[] = [
    {
      location: 'center',
      template: 'menuTemplate',
    },
  ];

  loadingVisible: boolean;
  spinnerMessage: string;
  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public publicService: PublicDashboardService,
    public encryptionService: EncryptionService
  ) {
    translate.addLangs(['English', 'French', 'Swahili', 'Arabic', 'Portuguese']);
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.getUserNavigationItems();
  }

  // onLogout() {
  //   this.authService.logout()
  //     .then(() => {
  //       setTimeout(() => {
  //         this.authService.handleLogoutSuccess();
  //         this.authService.logout();
  //         this.isLoggedIn = this.authService.isLoggedIn; 
  //       }, 500); 
  //     })
  //     .catch(() => {
  //       this.authService.handleLogoutError();
  //     });
  // }
  getUserNavigationItems() {
    this.spinnerShow('Initialisation of the E-CRES Solution........')
    this.publicService.getUserNavigationItems(this.navigation_type_id)
      .subscribe(
        data => {
          this.response = data;
          if (this.response.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.response.navigation_items);
            this.navigation_items = this.response.navigation_items;
          }
          this.spinnerHide();
        },
        error => {

        });

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
}



