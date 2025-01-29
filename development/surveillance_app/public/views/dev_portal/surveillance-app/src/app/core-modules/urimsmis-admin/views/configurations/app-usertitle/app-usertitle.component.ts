import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-app-usertitle',
  templateUrl: './app-usertitle.component.html',
  styleUrls: ['./app-usertitle.component.css']
})
export class AppUserTitle {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'usr_users_title';
    this.parameter_name = "user_title_details";
  }
  ngOnInit() {
    // other initializations

  }
}
