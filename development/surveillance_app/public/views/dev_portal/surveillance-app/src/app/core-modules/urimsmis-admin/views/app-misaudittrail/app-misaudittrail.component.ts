import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuditTrailManagementService } from 'src/app/core-services/audit-trail-management/audit-trail-management.service';
import { AppSettings } from 'src/app/app-settings';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';


@Component({
  selector: 'app-app-misaudittrail',
  templateUrl: './app-misaudittrail.component.html',
  styleUrls: ['./app-misaudittrail.component.css']
})
export class AppAuditTrail {
  parameter_name = 'system_audit_trail';
  table_name: string;
  AuditTrailData: any[] = [];
  loadingVisible: boolean;
  show_advancesearch: boolean;
  data_record: any;
  spinnerMessage: string;
  auditTrailDtaDetails: any;
  auditTrailDtaDetails2: any;
  combinedauditTrailDetails: any;

  constructor(
    public toastr: ToastrService,
    private auditService: AuditTrailManagementService,
    private reportingAnalytics: ReportsService,
  ) {
    this.table_name = 'aud_audit_trail';
    const base_url = AppSettings.base_url;
  }

  ngOnInit(): void {
    this.getAuditTrailInfo();
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  getAuditTrailInfo() {
    this.spinnerShow('Loading Audit Trail Information...........');

    var data_submit = {
      'table_name': this.table_name
    }
    this.auditService.onLoadAuditTrailDataUrl(data_submit, 'getAuditTrailInfo')
      .subscribe(
        data => {
          
          this.data_record = data;
          if (this.data_record.success) {
            this.AuditTrailData = this.data_record.data;
          }
          this.spinnerHide();
        },
      );
  }

  selectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    let audit_trail_id = e.currentSelectedRowKeys[0];
    this.onGetAuditTrailPrevCurrentData(audit_trail_id);
  }


  onGetAuditTrailPrevCurrentData(audit_trail_id) {
    this.spinnerShow('Loading ...........');

    var data_submit = {
      'audit_trail_id': audit_trail_id,
    }
    this.auditService.onLoadAuditTrailDataUrl(data_submit, 'onGetAuditTrailPrevCurrentData')
      .subscribe(
        data => {
          
          this.data_record = data;
          if (this.data_record.success) {
            this.auditTrailDtaDetails = this.data_record.current_tabledata;
            this.auditTrailDtaDetails = this.data_record.prev_tabledata;

            // this.combinedauditTrailDetails = this.auditTrailDtaDetails.concat(this.auditTrailDtaDetails2);
          }
          this.spinnerHide();
        },
      );
  }

  onAdvanceProductRegistrySearch(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxCheckBox',
      options: {
        icon: 'select',
        text: 'Show Advanced Search',
        value: this.show_advancesearch,
        onValueChanged: this.onActivatetheAdvanceSearch.bind(this)
      }
    });
  }

  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

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
