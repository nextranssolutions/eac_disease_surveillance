import { Component } from '@angular/core';
import { ExpertPerformanceEvaluationdashComponent } from '../../../expertsprofilemanagement/expert-performanceval/expert-performance-evaluationdash/expert-performance-evaluationdash.component';




@Component({
  selector: 'app-app-expertsperformancereport',
  templateUrl: './app-expertsperformancereport.component.html',
  styleUrl: './app-expertsperformancereport.component.css'
})



export class AppExpertsperformancereportComponent extends ExpertPerformanceEvaluationdashComponent {

  ngOnInit() {
    this.process_name = "third_evaluation_appraisal";
    this.appworkflowstatus_category_id = 18;
    this.onLoadEexpertsPerformanceEvalDashData(this.appworkflowstatus_category_id);
  }
  
}

