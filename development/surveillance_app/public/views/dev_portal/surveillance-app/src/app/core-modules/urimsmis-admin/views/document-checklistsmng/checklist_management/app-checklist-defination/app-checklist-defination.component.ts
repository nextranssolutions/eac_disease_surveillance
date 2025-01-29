import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-checklist-defination',
 
  templateUrl: './app-checklist-defination.component.html',
  styleUrl: './app-checklist-defination.component.css'
})
export class AppChecklistDefinationComponent   {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'chk_checklist_definations';
    this.parameter_name = "checklist_definations";
    this.resetcolumns = 'process_id,is_default_language,email_template,notification_type_id,is_default_language,system_label_id,system_language_id,translation,document_type_id,performancescoring_scale_id';
  }
  ngOnInit() {
    // other initializations

  }
}
