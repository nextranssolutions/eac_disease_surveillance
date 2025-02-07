import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from 'src/app/core-services/languages/languages.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.css']
})
export class TopSectionComponent {

  translations: any;
  userData: any;
  userFirstName: string = '';
  loadingVisible: boolean;
  spinnerMessage: string;
  
  dashboard_type_id:number =1;
  process_id:number;
  systems_functionality_id:number;

  constructor(
    public translate: TranslateService,
    public authService: AuthenticationService,
    private translationService: LanguagesService,
    private router: Router,
    private spinner: SpinnerVisibilityService,
  ) {
    this.spinner.hide();
    translate.addLangs(['English', 'French', 'Swahili', 'Arabic', 'Portuguese']);
  }

  ngOnInit() {
    this.authService.checkAuthenticationState();
    this.loadTranslations(this.translate.currentLang || 'English');
    // this.selectionLanguage('English');
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  selectionLanguage(locale: string) {
    // this.translate.addLangs(['English', 'French', 'Swahili']);
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.translations = translations;
        // this.translate.setDefaultLang(locale);
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {

      }
    );

  }

  switchLang(event: Event, language: string): void {
    event.preventDefault(); 
    this.loadTranslations(language);
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


  funcRedirectToDashboard() {
    
    this.userData = localStorage.getItem('user');
    let user_data = JSON.parse(this.userData);
    this.router.navigate([user_data.dashboard_link]);
    this.scrollToTop();
  }
  funcRedirectSignIn(){
    this.router.navigate(['./sign-in']);
    this.scrollToTop();
  }
  funcRedirectSignUp(){
    this.router.navigate(['./sign-up']);
    this.scrollToTop();
  }
  funcUserLogOut() {
    this.spinnerShow('Logging Out');
    this.authService.funcUserLogOut();
  }
  showSignInForm: boolean = false;
  showCreateAccountForm: boolean = false;

  toggleSignInForm() {
    this.showSignInForm = !this.showSignInForm;
    this.showCreateAccountForm = false; // Hide Create Account form when Sign In form is shown
  }

  toggleCreateAccountForm() {
    this.showCreateAccountForm = !this.showCreateAccountForm;
    this.showSignInForm = false; // Hide Sign In form when Create Account form is shown
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
}

