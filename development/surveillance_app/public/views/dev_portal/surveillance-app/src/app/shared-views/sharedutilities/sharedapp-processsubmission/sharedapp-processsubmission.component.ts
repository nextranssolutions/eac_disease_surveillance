import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpertsprofileserviceService } from 'src/app/core-services/expertprofile/expertsprofileservice.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-sharedapp-processsubmission',
  templateUrl: './sharedapp-processsubmission.component.html',
  styleUrl: './sharedapp-processsubmission.component.css'
})
export class SharedappProcesssubmissionComponent {
  @Input() application_code: number;
  @Input() process_id: number;
  @Input() app_reference_no: any;
  @Input() appworkflow_status_id: number;
  loadingVisible: boolean;
  spinnerMessage: string;
  @Input() dashboard_url: string;
  has_reporting_remarks:boolean = false;
  userInformationData: any;
  processData: any;
  workflowStatusActionsData: any;
  workflowStatusData: any;
  response: any;
  appProcessSubmissionFrm: FormGroup;
  data_record: any;
  workflowStageData: any;
  constructor(
    private router: Router, 
    public toastr: ToastrService, http: HttpClient,
    public expertService: ExpertsprofileserviceService, 
    public workflowService: WokflowManagementService
  ) {

  }
  ngOnInit() {

    this.appProcessSubmissionFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      remarks: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      workflow_id: new FormControl('', Validators.compose([])),
      prevworkflow_stage_id: new FormControl('', Validators.compose([])),
      nextworkflow_stage_id: new FormControl('', Validators.compose([Validators.required])),
      workflow_status_id: new FormControl('', Validators.compose([])),
      user_to_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      app_reference_no: new FormControl('', Validators.compose([])),
      expected_completion_date: new FormControl('', Validators.compose([])),
      delivery_timeline: new FormControl('', Validators.compose([])),
      workflowstatus_action_id: new FormControl('', Validators.compose([Validators.required])),
      isdone: new FormControl('', Validators.compose([])),
    });

    this.appProcessSubmissionFrm.get('application_code')?.setValue(this.application_code);
    this.appProcessSubmissionFrm.get('process_id')?.setValue(this.process_id);
    this.appProcessSubmissionFrm.get('app_reference_no')?.setValue(this.app_reference_no);
    this.appProcessSubmissionFrm.get('appworkflow_status_id')?.setValue(this.appworkflow_status_id);


    this.onLoadworkflowStatusData()
    this.onLoadprocessData();
    this.onLoadworkflowStageData(this.process_id);
    this.onLoadWorkflowStatusActions();

  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['application_code']) {
    // if(this.application_code >0){

      this.onLoadWorkflowStatusActions();

    // }
    
    }
    if (changes['appworkflow_status_id']) {
      // if(this.application_code >0){
        this.onLoadWorkflowStatusActions();
  
      }
  }
  //all stages per a workflow and loaded per process
  onLoadworkflowStageData(process_id) {
    var data_submit = {
      'table_name': 'wf_workflow_stages',
      'process_id': process_id
    }
    this.workflowService.getWorkflowConfigsUrl(data_submit, 'onLoadworkflowStageData')
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

  onWorkflowStatusActionSelect($event) {

    if ($event.selectedItem) {

      let data = $event.selectedItem;
      let workflow_action_id = data.id;
      this.onLoadWorkflowTransitionData(workflow_action_id);
      
      if(workflow_action_id == 2){
       // this.has_reporting_remarks = false;
        
      this.appProcessSubmissionFrm.get('remarks')?.clearValidators();
      this.appProcessSubmissionFrm.get('remarks')?.setValidators([]);
      }
      else{
        this.has_reporting_remarks = true;
        
        this.appProcessSubmissionFrm.get('remarks')?.setValidators([Validators.required]);

      }
    }
  }

  // onWorkflowStatusActionSelect($event) {

  //   if ($event.selectedItem) {

  //     let data = $event.selectedItem;
  //     let workflow_action_id = data.id;
  //     this.onLoadWorkflowTransitionData(workflow_action_id);

  //   }
  // }
  // 
  onLoadWorkflowTransitionData(workflow_action_id) {
    var data_submit = {
      'table_name': 'wf_workflow_transitions',
      'workflow_action_id': workflow_action_id
    }
    this.workflowService.getWorkflowConfigsUrl(data_submit, 'onLoadWorkflowTransitionData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            let workflow_transition = this.data_record.data;
            this.appProcessSubmissionFrm.patchValue(workflow_transition);
            this.onLoaduserInformationData(workflow_transition.nextworkflow_stage_id);
        }
      },
      error => {
        
      });
}
  onLoadWorkflowStatusActions(){
    var data_submit = {
      'table_name': 'wf_workflowsubmission_actions',
      'workflow_status_id': this.appworkflow_status_id,
      'process_id': this.process_id
    }
    this.workflowService.getWorkflowConfigsUrl(data_submit, 'onLoadWorkflowStatusActions')
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

  onLoadprocessData() {
    var data_submit = {
      'table_name': 'wf_processes'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
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
  onLoadworkflowStatusData() {
    var data_submit = {
      'table_name': 'wf_workflow_statuses'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.workflowStatusData = this.data_record.data;
          }
        },
        error => {
          
        });

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onLoaduserInformationData(workflow_stage_id) {
    var data_submit = {
      'table_name': 'usr_users_information'
    }
    //  this.spinnerShow('Loading User Information') 
    this.expertService.getProcessessFilteredUsers(workflow_stage_id)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userInformationData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  onApplicationProcessSubmission() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.appProcessSubmissionFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.appProcessSubmissionFrm.invalid) {
      this.toastr.error('Please fill in all mandatory fields.', 'Alert');
      return;
    }

    this.spinnerShow('Application/Process Submission .........');

    this.workflowService.onSaveWorkflowDetailsDetails('', this.appProcessSubmissionFrm.value, 'onApplicationProcessSubmission')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');
            this.router.navigate([this.dashboard_url]);
            this.scrollToTop();
            this.spinnerHide();
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        });

  }
} 
