import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-systemlanguages',
  templateUrl: './app-systemlanguages.component.html',
  styleUrl: './app-systemlanguages.component.css'
})
export class AppSystemlanguagesComponent  {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_system_languages';
    this.parameter_name = "System Languages";
    this.resetcolumns = 'email_template,notification_type_id,system_label_id,system_language_id,translation,performancescoring_scale_id,checklist_type_id,document_type_id';
  }
  ngOnInit() {
    // other initializations

  }
}
