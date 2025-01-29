
import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { TasksallocationManagementService } from 'src/app/core-services/tasksallocation/tasksallocation-management.service';

@Component({
  selector: 'app-task-assigmentsdetails',
  templateUrl: './task-assigmentsdetails.component.html',
  styleUrl: './task-assigmentsdetails.component.css'
})
export class TaskAssigmentsdetailsComponent {
  @Input() application_code: number;
  data_record:any;
  applicationWorkflowSubmissionCommetns:any;
  loadingVisible:any;
  spinnerMessage:string;
  workallocationsAssignmentsData:any;
  show_advancesearch:boolean;
  constructor(http: HttpClient,
    private infoService: InformationSharingService,
    private tasksallocationService: TasksallocationManagementService
    
  ) {


  }
  ngOnChanges(changes: SimpleChanges): void {
    //wf_workflow_transitions
    this.onLoadworkallocationsAssignmentsData(this.application_code);

}
  
onLoadworkallocationsAssignmentsData(application_code) {
  this.spinnerShow('Loading Information ...........');

  var data_submit = {
    'table_name': 'tra_workallocations_assignments',
    'application_code': application_code
  }
  this.tasksallocationService.onLoadTasksAllocationDataUrl(data_submit, 'onLoadworkallocationsAssignmentsData')
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workallocationsAssignmentsData = this.data_record.data;
        }
        this.spinnerHide();
      },
      error => {

        this.spinnerHide();
      });

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
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

}
