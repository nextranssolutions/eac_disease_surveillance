import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { LanguagesService } from 'src/app/core-services/languages/languages.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';

@Component({
  selector: 'app-shared-toppanel',
  templateUrl: './shared-toppanel.component.html',
  styleUrl: './shared-toppanel.component.css'
})
export class SharedToppanelComponent {
  dashboard_type_id: number = 2;
  process_id: number=0;
  systems_functionality_id: number;
  is_closablewin: boolean = true;
  userGroupName: string = '';
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  userOtherNames: string = '';
  isLoggedIn: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  translations: any;
  response: any;
  changePaswordWFrm: FormGroup
  is_changepasswordwin: boolean;

  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  constructor(public translate: TranslateService,
    public toastr: ToastrService,
    public AuthService: AuthenticationService,
    private translationService: LanguagesService,
    public userservice: UserManagementService,
    private router: Router,
  ) {

    this.changePaswordWFrm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required])),
      new_password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required]))
    });

    this.selectionLanguage('English');
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  switchLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.loadTranslations(lang);
  }

  switchClickLang( language: string): void {
      this.loadTranslations(language);
    }

  ngOnInit(): void {
    
    this.onCheckUserPWDRequestDetails();

  }

  selectionLanguage(locale: string) {
    // this.translate.use(lang);
    this.translate.addLangs(['English', 'French', 'Swahili', 'Arabic', 'Portuguese']);
    //translation  
    this.spinnerShow('Loading system Language Translation')
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.spinnerHide()
        this.translations = translations;
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {

      }
    );
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onFuncChangePassword() {
    this.is_changepasswordwin = true;
  }

  loadTranslations(locale: string) {
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.translations = translations;
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {

      }
    );
  }

  // funclogOut(){
  //     this.AuthService.funcUserLogOut();
  //   }

  funcUserLogOut() {
    this.spinnerShow('Logging Out');
    this.AuthService.funcUserLogOut();
  }

  funcViewUserProfiledetails() {
    this.router.navigate(['./admin-ecres/app-myprofile']);
    this.scrollToTop();
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  onFuncChangePasswordRequest() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.changePaswordWFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.changePaswordWFrm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning');

      return;
    }
    let old_password = this.changePaswordWFrm.get('password')?.value;
    let new_password = this.changePaswordWFrm.get('new_password')?.value;
    let confirm_password = this.changePaswordWFrm.get('confirm_password')?.value;
    if (new_password != confirm_password) {

      this.toastr.warning('Password MistMatch.', 'Warning');

      return;
    }
    if(old_password == new_password || old_password == confirm_password)
      {
        this.toastr.error('Old Password cannot be your new password', 'Error', { timeOut: 10000 });
        return;
      }
    this.spinnerShow('Change User Password........');

    this.userservice.onsaveUserData('usr_users_information', this.changePaswordWFrm.value, 'onUserChangePassword').subscribe(
      (data) => {

        this.response = data;
        if (this.response.success) {
          this.toastr.success(this.response.message, 'Success');
          this.is_changepasswordwin = false;
          this.AuthService.funcUserLogOut();
        } else {
          this.toastr.error(this.response.message, 'Info');
        }

        this.spinnerHide()
      },
      (error) => {
        this.toastr.error('Password Update failed: ' + error.error.message, 'Error', { timeOut: 10000 });
        this.spinnerHide()
      }
    );

  }

    onCheckUserPWDRequestDetails() {
      const loggedInUserId = localStorage.getItem('id');
      const email_address = localStorage.getItem('email_address');
      this.spinnerShow('Validating User Account........');
  
      this.userservice.onsaveUserData('usr_users_information', { user_id: loggedInUserId, email_address: email_address }, 'onCheckUserPWDRequestDetails').subscribe(
        (data) => {
          this.response = data;
          if (this.response.success) {
            if (this.response.is_initiatepassword_change == 1) {
              this.toastr.info(this.response.message, 'Info');
              this.is_changepasswordwin = true;
              this.is_closablewin = false;
            }
          } else {
            this.toastr.success(this.response.message, 'Success');
  
          }
  
          this.spinnerHide()
        },
        (error) => {
          this.toastr.error('Registration failed: ' + error.error.message, 'Error', { timeOut: 10000 });
          this.spinnerHide()
        }
      );
    }
    switchTheme(theme: string) {
      const linkElement = document.getElementById('theme-link') as HTMLLinkElement;
      if (linkElement) {
        linkElement.href = theme === 'light' 
          ? 'node_modules/devextreme/dist/css/dx.light.css' 
          : 'node_modules/devextreme/dist/css/dx.dark.css';
      }
    }
}