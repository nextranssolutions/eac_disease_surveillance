import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-unifiedapp-dashboard',
  templateUrl: './unifiedapp-dashboard.component.html',
  styleUrl: './unifiedapp-dashboard.component.css'
})
export class UnifiedappDashboardComponent {

  data_record: any;
  regulatory_functionsdata: any;
  user_group_data: any;
  userGroupId: number;
  constructor(public config: ConfigurationsService, private router: Router, public workflowService:WokflowManagementService) {
   
    this.onLoadRegulatoryFunctions();
  }
  ngInit() {
  
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onLoadRegulatoryFunctions() {

    
    this.workflowService.getRegultoryFunctionUserAccess()
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatory_functionsdata = this.data_record.data;
          }
        },
        error => {

        });
  }
  onProceedToApplication(record){

    localStorage.setItem('regulatory_function', JSON.stringify(record));
    this.router.navigate(['./../' + record.router_url]);
    this.scrollToTop();
  }
}
