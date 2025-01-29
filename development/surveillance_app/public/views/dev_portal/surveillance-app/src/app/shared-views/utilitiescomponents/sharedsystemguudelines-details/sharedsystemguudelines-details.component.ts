import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';

@Component({
  selector: 'app-sharedsystemguudelines-details',
  templateUrl: './sharedsystemguudelines-details.component.html',
  styleUrl: './sharedsystemguudelines-details.component.css'
})
export class SharedsystemguudelinesDetailsComponent {
  @Input() dashboard_type_id: number;
  @Input() process_id: number;
  @Input() systems_functionality_id: number;
  systemGuidelinesProcesses: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  table_name: string;
  parameter_name: string;
  data_record: any;
  systemGuidelineData: any;
  is_viewhowtonavigation: boolean;
  decryptedPayload:any;
  constructor(
    private admnistrationService: ServiceAdmnistrationService, private router: Router,public encryptionService: EncryptionService
  ) {
    this.table_name = 'sys_systemguidelines_detail';
    this.parameter_name = "ecres_system_manual";
  }

  funcViewHowToAccessSystem() {

    this.onLoadSystemGuideline(this.dashboard_type_id, this.process_id, this.systems_functionality_id);
   
  }
  ngOnInit(): void {

   this.onLoadsystemGuidelinesProcesses();
  }
  ngOnChanges(changes: SimpleChanges): void {
   // this.onLoadSystemGuideline(this.dashboard_type_id, this.process_id, this.systems_functionality_id);
    this.onLoadsystemGuidelinesProcesses();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  spinnerShow(spinnerMessage: string) { 
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }

  spinnerHide() {
    this.loadingVisible = false;
  }

  onLoadSystemGuideline(dashboard_type_id, process_id, systems_functionality_id) {
    
    var data_submit = {
      'table_name': this.table_name,
      'dashboard_type_id': dashboard_type_id,
      'process_id': process_id,
      'systems_functionality_id': systems_functionality_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'onLoadSystemManualGuidelines')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemGuidelineData = this.decryptedPayload;
            this.is_viewhowtonavigation = true;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
          // Handle error
        }
      );
  }

  onLoadsystemGuidelinesProcesses() {
    var data_submit = {
      'table_name': 'wf_processes',
      'dashboard_type_id': this.dashboard_type_id,
      'process_id': this.process_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'onLoadsystemGuidelinesProcesses')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemGuidelinesProcesses = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        }
      );
  }
  onSystemProcessChange($event) {
    if ($event.selectedItem) {
      let processdata_id = $event.selectedItem.id;
      this.onLoadsystemGuidelinesFunctionaliites(processdata_id);
      this.onLoadSystemGuideline(this.dashboard_type_id, processdata_id, this.systems_functionality_id);
    }
  }

  onSystemFunctionalityChange($event) {
    if ($event.selectedItem) {
      let systems_functionality_id = $event.selectedItem.id;
      this.onLoadSystemGuideline(this.dashboard_type_id, this.process_id, systems_functionality_id);
      this.onLoadSystemGuideline(this.dashboard_type_id, this.process_id, systems_functionality_id);
    }
  }
  onSystemGuidelinesRest() {
    this.onLoadSystemGuideline(this.dashboard_type_id, this.process_id, this.systems_functionality_id);
  }
  onLoadsystemGuidelinesFunctionaliites(process_id) {
    var data_submit = {
      'table_name': 'par_systems_functionalities',
      'dashboard_type_id': process_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'onLoadsystemGuidelinesFunctionaliites')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemGuidelinesProcesses = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        }
      );
  }

}
