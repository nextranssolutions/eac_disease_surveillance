import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification-types',
  templateUrl: './notification-types.component.html',
  styleUrl: './notification-types.component.css'
})
export class NotificationTypesComponent  {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'ntf_notification_types';
    this.parameter_name = "notification_types";
    this.resetcolumns = 'marks_allocated, performancescoring_scale_id,process_id,is_default_language,email_template,notification_type_id,system_label_id,system_language_id,translation,performancescoring_scale_id,checklist_type_id,document_type_id';
  }
  ngOnInit() {
    // other initializations

  }
}