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
  nav_data: any;

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
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  getUserNavigationItems() {
    this.spinnerShow('Initialisation of the Surveillance Solution........')
    this.publicService.getUserNavigationItems(this.navigation_type_id)
      .subscribe(
        data => {
          this.response = data;
          if (this.response.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.response.navigation_items);
            // this.navigation_items = this.decryptedPayload;
            this.navigation_items = this.response.navigation_items;
          }
          this.spinnerHide();
        },
        error => {

        });

  }

  navigationClickEvent(childGroup: any): void {

    let navigation_id = childGroup.id,
      navigation_name = childGroup.name,
      routerlink = childGroup.routerlink,
      user_group_id = childGroup.user_group_id,
      is_super_admin = childGroup.is_super_admin,
      access_level_id = childGroup.user_access_levels_id;
    this.nav_data = {
      navigation_id: navigation_id,
      navigation_name: navigation_name,
      user_group_id: user_group_id,
      is_super_admin: is_super_admin,
      access_level_id: access_level_id
    };
    
    localStorage.setItem('nav_data', JSON.stringify(this.nav_data));
    this.router.navigate(['./public/' + routerlink]);
    this.scrollToTop();
   
  }

  getTranslation(key: string): string {
    if(key){
      let translation: string = '';
      this.translate.get(key).subscribe((res: string) => {
        translation = res;
      });
      return translation;
    }else{
      return '';
    }
  }

  toggleSubMenu(item: any) {
    item.open = !item.open;
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
}



