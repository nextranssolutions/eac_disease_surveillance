import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-app-document-types',
  templateUrl: './app-document-types.component.html',
  styleUrl: './app-document-types.component.css'
})
export class AppDocumentTypesComponent {
  table_name: string;
  parameter_name: string;

  resetcolumns: string;

  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'dms_document_types';
    this.parameter_name = "document_types";
    this.resetcolumns = 'marks_allocated, performancescoring_scale_id,process_id,is_default_language,email_template,notification_type_id,is_default_language,system_label_id,system_language_id,translation,checklist_type_id,document_type_id,performancescoring_scale_id';
  }
  ngOnInit() {
    // other initializations

  }
}
