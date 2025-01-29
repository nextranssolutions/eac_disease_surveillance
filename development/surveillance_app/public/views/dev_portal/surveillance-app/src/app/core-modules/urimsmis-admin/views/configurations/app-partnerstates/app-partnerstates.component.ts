import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-app-partnerstates',
  templateUrl: './app-partnerstates.component.html',
  styleUrls: ['./app-partnerstates.component.css']
})
export class AppPartnerStates implements OnInit {
  parameter_name: string = "Member States";
  countriesinfoData: any[] = []; 
  table_name: string = "par_countries"; 
  actionsMenuItems: any[] = []; 
  hasReadpermissions: boolean = true; 
  decryptedPayload:any;

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private reportingAnalytics: ReportsService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    public encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    this.fetchConfigurationCountriesDetails();
  }

  fetchConfigurationCountriesDetails() {
    const data_submit = {
      table_name: this.table_name,
      is_member_state: 1
    };
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          if (data.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(data.data);
            this.countriesinfoData = this.decryptedPayload;
          }
        },
        error => {
          
        }
      );
  }

  funcActionColClick(event: any, data: any) {
    // Define your action column click logic here
  }

  onAddNewProduct() {
    // Define logic to add a new product
  }

  onCellPrepared(event: any) {
    // Define logic for cell preparation if needed
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }
}
