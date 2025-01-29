import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-checklist-types',
 
  templateUrl: './app-checklist-types.component.html',
  styleUrl: './app-checklist-types.component.css'
})
export class AppChecklistTypesComponent   {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'chk_checklist_types';
    this.parameter_name = "checklist_types";
    this.resetcolumns = 'marks_allocated, performancescoring_scale_id,is_default_language,email_template,notification_type_id,is_default_language,system_label_id,system_language_id,translation,performancescoring_scale_id,checklist_type_id,document_type_id';
  }
  ngOnInit() {
    // other initializations

  }
}
