let app_connection = 'development',
  base_url = '',
  assets_url = '',
  mis_url = '',
  siteKey = ''
  ;  // dev 
// var app_connection = 'production'; // production 
if (window.location.hostname == 'localhost') {
  //var app_connection = 'development';
}
if (app_connection == 'development') {
  //nextrans-solutions\comesa-sws\development\web-application

  base_url = 'http://localhost:82/nextrans-solutions/eac_disease_surveillance/development/surveillance_app/public/index.php';
  assets_url = 'http://localhost:82/nextrans-solutions/eac_disease_surveillance\development\surveillance_app/public/index.php';
  
  // base_url = 'http://localhost:82/uRIMS/nextrans-solutions/nextrans-solutions/unified-rims/development/urims-mis/public/index.php';
  // assets_url = 'http://localhost:82/uRIMS/nextrans-solutions/nextrans-solutions/unified-rims/development/urims-mis/public/index.php';
  // siteKey = '6LcoH54UAAAAAOqpAGCXC4cmup6N2c5KseVHmv1c';
}
else if (app_connection == 'fixed_acess') {
  base_url = ''
  assets_url = '';
  mis_url = '';
}
else if (app_connection == 'production') {
  base_url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + window.location.pathname + "index.php";

  assets_url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + window.location.pathname + "public/resources/";
  mis_url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/mis/';
}

export class AppSettings {
  //* on production mode localhost:4200
  public static irimshelpdesk_url = '';
  public static base_url = base_url;
  public static assets_url = assets_url;
  public static mis_url = mis_url;
  public static siteKey = "6LdIjbsUAAAAAOhQtlHVuK8kpSdbBXAtX3K5pYQb";
  public static system_title = 'URIMS ';
  public static system_website = '';
  public static system_version = '';
  public static session_timeoutcheck = 6000;
  public static SecureKey = "CqCcUxA0fb9hFCASWtJCjpq4uhUY5mMN9noVgDlQ8Yg="
  public static idleTimeout = 6000;
  public static timeoutWarning = 6000;
  public static encryptSecretKey = 'kPJks1MrdXE03n8H';
} 