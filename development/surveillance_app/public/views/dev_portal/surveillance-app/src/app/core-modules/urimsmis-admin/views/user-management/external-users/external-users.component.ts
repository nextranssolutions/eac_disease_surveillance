import { Component, OnInit } from '@angular/core';
import { ShareusermanagementClassComponent } from '../shareusermanagement-class/shareusermanagement-class.component';

@Component({
  selector: 'app-external-users',
  templateUrl: './external-users.component.html',
  styleUrl: './external-users.component.css'
})
export class ExternalUsersComponent extends ShareusermanagementClassComponent implements OnInit {
  ngOnInit() {
   
   this.parameter_name = "external_users"

    this.fetchExternalUserDetails();
  }
}
