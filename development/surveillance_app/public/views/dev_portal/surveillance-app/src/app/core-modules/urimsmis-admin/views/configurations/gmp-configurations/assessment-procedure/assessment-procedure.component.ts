import { Component } from '@angular/core';

@Component({
  selector: 'app-assessment-procedure',
  templateUrl: './assessment-procedure.component.html',
  styleUrl: './assessment-procedure.component.css'
})
export class AssessmentProcedureComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_assessment_procedures';
    this.parameter_name = "assessment_procedures";
  }
}
