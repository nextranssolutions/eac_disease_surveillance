import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-systemlabelsmanagement',
  templateUrl: './app-systemlabelsmanagement.component.html',
  styleUrl: './app-systemlabelsmanagement.component.css'
})
export class AppSystemlabelsmanagementComponent  {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_system_labels';
    this.parameter_name = "system_labels";
    this.resetcolumns = 'email_template,notification_type_id,is_default_language,system_label_id,performancescoring_scale_id,checklist_type_id,document_type_id';
  }
  ngOnInit() {
    // other initializations

  }
}
