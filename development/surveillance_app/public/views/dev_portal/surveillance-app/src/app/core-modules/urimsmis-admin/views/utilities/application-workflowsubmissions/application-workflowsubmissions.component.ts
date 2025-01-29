import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {  DxDiagramComponent } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
@Component({
  selector: 'app-application-workflowsubmissions',
  templateUrl: './application-workflowsubmissions.component.html',
  styleUrl: './application-workflowsubmissions.component.css'
})
export class ApplicationWorkflowsubmissionsComponent {
  @ViewChild(DxDiagramComponent, { static: false }) diagram: DxDiagramComponent;
  @Input() application_code: number;
  @Input() process_id: number;
  @Input() document_type_id: number;
  @Input() workflow_status_id: number;
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  workflowItemsData:any;
  processData:any;
  show_advancesearch: boolean;
  data_record:any;
  workflowData:any;
  workflowAllStageData:any;
  table_name:string;
  applicationWorkflowSubmissionFrm:FormGroup;
  workflowStageData:any;
  workflowStatusData:any;
  workflowStatusActionsData:any;
  constructor(
    private reportingAnalytics: ReportsService,
    private infoService: InformationSharingService
    
  ) {

    this.applicationWorkflowSubmissionFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      remarks: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      workflow_id: new FormControl('', Validators.compose([])),
      prevworkflow_stage_id: new FormControl('', Validators.compose([])),
      nextworkflow_stage_id: new FormControl('', Validators.compose([])),
      workflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      workflowstatus_action_id: new FormControl('', Validators.compose([Validators.required])),
    });
    this.onLoadprocessData();
    this.onLoadWorkflowStatusActions();
  }
  ngOnChanges(changes: SimpleChanges): void {
      //wf_workflow_transitions
      this.onLoadworkflowStageData(this.process_id);

  }
  onSaveAppWorkflowSubmission(){


  }
  onWorkflowStatusActionSelect($event) {

    if ($event.selectedItem) {

      let data = $event.selectedItem;
      let workflowstatus_action_id = data.id;
      this.onLoadWorkflowTransitionData(workflowstatus_action_id);
      
    }
  }
 // 
 onLoadWorkflowTransitionData(workflowstatus_action_id){
  var data_submit = {
    'table_name': 'wf_workflow_transitions',
    'workflow_status_id': workflowstatus_action_id
  }
  this.infoService.onLoadServicesDataset(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          let workflow_transition = this.data_record.data[0];
                this.applicationWorkflowSubmissionFrm.patchValue(workflow_transition);

        }
      },
      error => {
        
      });
}
  onLoadWorkflowStatusActions(){
    var data_submit = {
      'table_name': 'wf_workflowsubmission_actions',
      'workflow_status_id': this.workflow_status_id,
      'process_id': this.process_id
    }
    this.infoService.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowStatusActionsData = this.data_record.data;
          }
        },
        error => {
          
        });

  }
  onAdvanceProductRegistrySearch(e){
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

  onActivatetheAdvanceSearch(e){

    this.show_advancesearch =  e.value;

}

  onLoadprocessData(){
    var data_submit = {
      'table_name': 'wf_processes'
    }
    this.infoService.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.processData = this.data_record.data;
          }
        },
        error => {
          
        });

  }
  onLoadworkflowStageData(process_id){
    var data_submit = {
      'table_name': 'wf_workflow_stages',
      'process_id':process_id
    }
    this.infoService.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowStageData = this.data_record.data;
          }
        },
        error => {
          
        });

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
