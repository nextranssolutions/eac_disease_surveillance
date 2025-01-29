
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap, catchError } from 'rxjs/operators';
import { AppSettings } from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: boolean = false; 
  userCountryOfOrigin: string;
  userData: any;
  config:any;
  base_url: string;
  userGroupId:number;
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    private http: HttpClient 
  ) {

    // this.base_url = AppSettings.base_url;
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.base_url = AppSettings.base_url+ '/api/authentication';
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  getAccessToken() {
    let userDetails = this.userData;
    if (userDetails) {
      return userDetails.access_token;
    } else {
      return '';
    }

  }
  getUserDetails() {
    let userDetails = this.userData;
    if (userDetails) {
      return userDetails;
    } else {
      return '';
    }
  }
  isLoggednIn() {
    return this.getAccessToken() !== null;
  }

  // funcUserLogOut() {
  //   this.spinner.show();

  //   var headers: Object = {
  //     headers: new HttpHeaders({
  //       "Accept": "application/json",
  //       //"Authorization": "Bearer " + this.getAccessToken(),
  //     }),
  //     responseType: 'text'
  //   };
  //   let user = this.getUserDetails();
    
  //   localStorage.removeItem("LoggedInUser");
  //   localStorage.clear(); //usr_loggedin_id
  //   return this.http.post(this.base_url + '/funcUserLogOut', {usr_loggedin_id: user.usr_loggedin_id, email_address: user.email_address, userId:user.userId }, headers)
  //     .pipe(map(data => {
  //       localStorage.removeItem("LoggedInUser");
  //       localStorage.clear();
        
  //       this.router.navigate(["../"]);
  //        this.scrollToTop();

  //       location.reload();
  //       this.spinner.hide();
  //     })).subscribe();
  // }

  funcUserLogOut() {
    this.spinner.show();
    const headers = new HttpHeaders({ "Accept": "application/json" });
    const user = this.getUserDetails();
  
    return this.http.post(this.base_url + '/funcUserLogOut', { 
      usr_loggedin_id: user.usr_loggedin_id, 
      email_address: user.email_address, 
      userId: user.userId 
    }, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(() => {
          this.clearSession();
          this.router.navigate(["../"]);
          this.scrollToTop();
        }),
        catchError(error => {
          this.toastr.error('Logout failed. Please try again.');
          return of(error);
        }),
        tap(() => this.spinner.hide())
      ).subscribe();
  }
  
  clearSession() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.toastr.success('Logged out successfully');
  }
  
  onFuncChangePassword(data) {

    const httpHeaders: HttpHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });// Step 2

    let user = this.getUserDetails();
    const options = { params: { 'trader_user_id': user.trader_user_id, 'email_address': user.email_address }, headers: httpHeaders };
    return this.http.post(this.base_url + '/onFuncChangePassword', data, options)
      .pipe(map(data => {
        return data;
      }));
  }

  onFuncRecoverPasswordRequest(data) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.getAccessToken(),
    });// Step 2
    const options = { params: { 'recover': '' }, headers: httpHeaders };
    return this.http.post(this.base_url  + '/onFuncRecoverPasswordRequest', data, options)
      .pipe(map(data => {
        return data;
      }));
  }
  pass_complexcheck(newpassword) {
    var aLowerCase = /[a-z]/,
      aNumber = /[0-9]/;
    if (newpassword.length < 6 || newpassword.search(aLowerCase) == -1 || newpassword.search(aNumber) == -1) {
      return false;

    } else {
      return true;

    }
  }
  login(email_address: string, password: string, otp_value:number) {
    // var user_password = this.EncrDecr.set(AppSettings.encryptSecretKey, user_password);
    var headers: Object = {
      headers: new HttpHeaders({
        "Accept": "application/json",
      })
    };
    return this.http.post(this.base_url + '/onUserLogin',
      {
        email_address: email_address,
        password: password,
        otp_value: otp_value
      }, headers
    ).pipe(map(user => {
        return user;
      }));
  }
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  handleLoginResponse(response: any) {
    if (response.status === 'success') {
      const token = response.authorisation.token;
      this.storeToken(token);

      localStorage.setItem('id', response.id);
      localStorage.setItem('user_group_name', response.user_group_name);
      localStorage.setItem('first_name', response.first_name);

      localStorage.setItem('country_of_origin_id', response.country_of_origin);

      localStorage.setItem('other_names', response.other_names);
      localStorage.setItem('userGroupId', response.userGroupId);
      // Fetch the country name using the service method
      // this.getCountryNameById(response.country_of_origin).subscribe((countryName: string) => {
      //   localStorage.setItem('userCountryOfOrigin', countryName);
      //   this.userCountryOfOrigin = countryName;
      // });

      this.toastr.success(response.message);

      this.isLoggedIn = true;
      this.router.navigate(['./admin-ecres/app-dashboard']);
      this.scrollToTop();
    } else {
      // Handle other status conditions if needed
      this.router.navigate(['./admin-ecres/app-dashboard']);
      this.scrollToTop();
    }
  }

  getUserId(): Observable<string> {
    // Fetch user id logic, assuming it's stored in localStorage
    const userId = localStorage.getItem('id');
    return of(userId || ''); // Return an observable with a default empty string if category name is null
  }

  getUserGroupName(): Observable<string> {
    // Fetch user group name logic, assuming it's stored in localStorage
    const groupName = localStorage.getItem('user_group_name');
    return of(groupName || ''); // Return an observable with a default empty string if category name is null
  }

  getUserFirstName(): Observable<string> {
    const userFirstName = localStorage.getItem('first_name');
    return of(userFirstName || ''); // Return an observable with a default empty string if category name is null
  }

  getCountryOfOrigin(): Observable<string> {
    const userCountryOfOrigin = localStorage.getItem('country_of_origin_id');
    return of(userCountryOfOrigin || ''); // Return an observable with a default empty string if category name is null
  }

  getUserOtherNames(): Observable<string> {
    const userOtherNames = localStorage.getItem('other_names');
    return of(userOtherNames || ''); // Return an observable with a default empty string if category name is null
  }


  handleLoginError(error: any) {
    if (error.status === 401) {
      if (error.error && error.error.error === 'Invalid User Login and System Access, kindly relogin with the correct credentials to proceed or Contact the system Admin') {
        this.toastr.error('Invalid User Login and System Access, kindly relogin with the correct credentials to proceed or Contact the system Admin');
      } else if (error.error && error.error.error === 'Your account was blocked! Kindly contact Admin for help') {
        this.toastr.error('Your account was blocked! Kindly contact Admin for help');
      } else {
        this.toastr.error('Invalid email or password');
      }
    }
  }


  clearToken() {
    // Implement logic to clear the stored token, for instance:
    localStorage.removeItem('token'); // since token stored in localStorage
  }

  //clear everything
  handleLogoutSuccess(): void {
    localStorage.clear(); // Clear all items in local storage
    this.toastr.success('Logged out successfully');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
    this.scrollToTop();
  }


  handleLogoutError(): void {
    this.toastr.error('Logout failed. Please try again.');
  }


  // function to check is the user is still logged in on page reload/refresh
  checkAuthenticationState() {
    const token = localStorage.getItem('token');
    if (token) {
      // Set authenticated state and user details
      return this.isLoggedIn = true;
      // You might want to decode the token to get user details
      // Example: this.currentUser = this.decodeToken(token);
      // ...
    }
    else{
      return this.isLoggedIn = false;
    }
  }
  checkAuthenticationState1() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }

  // LOGOUT METHOD ENDS HERE


  // refresh token starts here
  // Refresh Token method
  refreshAccessToken(): Observable<any> {
    // Endpoint to refresh the token
    const refreshTokenUrl = this.base_url + '/api/refresh';

    // Fetch the refresh token from local storage
    const refreshToken = localStorage.getItem('refreshToken');

    // Make a POST request to refresh the token
    return this.http.post(refreshTokenUrl, { refreshToken }).pipe(
      tap((response: any) => {
        // Handle the response from the server after token refresh
        if (response && response.token) {
          // If the token is refreshed successfully, update the stored token
          this.storeToken(response.token);
        }
      }),
      catchError((error: any) => {
        // Handle any errors that occur during token refresh
        // For example, log out the user or handle the error as needed
        console.error('Token refresh failed:', error);
        // Perform logout or any other necessary action
       
        return of(error); // Return an observable with the error
      })
    );
  }

  // refresh token ends here


  // USER ACCOUNT CREATION STARTS HERE


  register(userData: any, uploadData: any): Observable<any> {
    if (uploadData != '') {

    }
    const apiUrl = this.base_url + '/api/register';
    return this.http.post(apiUrl, userData);
  }



  getUserGroups(): Observable<any> {
    const apiUrl = this.base_url + '/api/user-group/user-roles';
    return this.http.get(apiUrl);
  }


  getUserTitles(): Observable<any> {
    const apiUrl = this.base_url + '/api/user-title/user-titles';
    return this.http.get(apiUrl);
  }

  getUserIdentificationType(): Observable<any> {
    const apiUrl = this.base_url + '/api/user-identification-type/identification';
    return this.http.get(apiUrl);
  }

  getUserCountryOfOrigin(): Observable<any> {
    const apiUrl = this.base_url + '/api/user-country-of-origin/country';
    return this.http.get(apiUrl);
  }

  getInstitution(): Observable<any> {
    const apiUrl = this.base_url + '/api/institutions/institutions';
    return this.http.get(apiUrl);
  }

  getInstitutionDepartment(): Observable<any> {
    const apiUrl = this.base_url + '/api/institutions-department/institutions';
    return this.http.get(apiUrl);
  }


  // totoal count starts here

  getUserCountryOfOriginCount(): Observable<any> {
    const apiUrl = this.base_url + '/api/user-country-of-origin/country';
    return this.http.get(apiUrl);
  }



  getCountryNameById(countryId: string): Observable<string> {
    const apiUrl = this.base_url + `/api/countries/${countryId}/name`;

    return this.http.get(apiUrl).pipe(
      map((response: any) => response.name)
    );
  }



  //  MIS AUDIT TRAIL  STARTS HERE
  getAuditTrailInfo(): Observable<any> {
    const apiUrl = this.base_url + '/api/audit-trail/system-management-mis-audit-trail-api';
    return this.http.get(apiUrl);
  }

  private tokenRequestCount: number = 0;

  requestToken() {
    // Simulate token request logic
    this.tokenRequestCount++;
    
    // Here you would typically make an HTTP request to your backend
    // to request a verification token.
  }

  getTokenRequestCount(): number {
    return this.tokenRequestCount;
  }
}