import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-reporting-submission-comments',

  templateUrl: './reporting-submission-comments.component.html',
  styleUrl: './reporting-submission-comments.component.css'
})
export class ReportingSubmissionCommentsComponent {
  @Input() application_code: number;
  data_record:any;
  applicationWorkflowSubmissionCommetns:any;
  loadingVisible:any;
  spinnerMessage:string;
  decryptedPayload:any;
  constructor(http: HttpClient,
    private infoService: InformationSharingService,
    private encryptionService: EncryptionService
    
  ) {


  }
  ngOnChanges(changes: SimpleChanges): void {
    //wf_workflow_transitions
    this.onloadapplicationWorkflowSubmissionCommetns(this.application_code);

}
  onloadapplicationWorkflowSubmissionCommetns(application_code){
   
    var data_submit = {
      'application_code': application_code
    };

    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onloadapplicationWorkflowSubmissionCommetns')
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.applicationWorkflowSubmissionCommetns = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          console.error('Error fetching stock level reporting information data:', error); // Log the error
          this.spinnerHide();
        }
      );
  }
  
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

}
