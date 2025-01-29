
import { Component } from '@angular/core';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.css'
})
export class EmailTemplatesComponent  {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'ntf_email_templates';
    this.parameter_name = "emails_templates";
    this.resetcolumns = 'marks_allocated, performancescoring_scale_id,process_id,is_default_language,system_label_id,system_language_id,translation,performancescoring_scale_id,checklist_type_id,document_type_id';
  }
  ngOnInit() {
    // other initializations

  }
}