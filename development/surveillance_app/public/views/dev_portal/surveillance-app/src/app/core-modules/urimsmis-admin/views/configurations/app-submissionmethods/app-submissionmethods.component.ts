import { Component } from '@angular/core';

@Component({
  selector: 'app-app-submissionmethods',
  templateUrl: './app-submissionmethods.component.html',
  styleUrl: './app-submissionmethods.component.css'
})
export class AppSubmissionmethodsComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_submission_methods';
    this.parameter_name = "submission_methods";
  }

  ngOnInit() {
  
  }
}
