import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-app-performancescoring-scales',
  templateUrl: './app-performancescoring-scales.component.html',
  styleUrl: './app-performancescoring-scales.component.css'
})
export class AppPerformancescoringScalesComponent    {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_performancescoring_scales';
    this.parameter_name = "perfomance_scoring";
    
    this.resetcolumns = 'marks_allocated, performancescoring_scale_id,process_id,is_default_language,email_template,notification_type_id,is_default_language,system_label_id,system_language_id,translation,performancescoring_scale_id,checklist_type_id,document_type_id';
  }
  ngOnInit() {
    // other initializations

  }
}
