import { Component, OnInit } from '@angular/core';
import { ShareusermanagementClassComponent } from '../shareusermanagement-class/shareusermanagement-class.component';

@Component({
  selector: 'app-api-users',
  templateUrl: './api-users.component.html',
  styleUrl: './api-users.component.css'
})
export class ApiUsersComponent extends ShareusermanagementClassComponent implements OnInit    {
 
  ngOnInit() {
   this.parameter_name = "external_users"

    this.fetchApiUserDetails();
  }
}
