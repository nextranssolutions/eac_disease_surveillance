import { Component, HostListener } from '@angular/core';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { DxTabsTypes } from 'devextreme-angular/ui/tabs';

@Component({
  selector: 'app-portal-workflowsetup',

  templateUrl: './portal-workflowsetup.component.html',
  styleUrl: './portal-workflowsetup.component.css'
})
export class PortalWorkflowsetupComponent {
     parameter_name: string = "workflow_setup"
      tabsPositions: DxTabPanelTypes.Position[] = [
        'left', 'top', 'right', 'bottom',
      ];
      tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[1];
      stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
      stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
      screenWidth: any;
    
      constructor(){
        this.checkScreenSize();
      }
      @HostListener('window:resize', ['$event'])
      onResize(event: Event): void{
        this.screenWidth = window.innerWidth;
        this.checkScreenSize();
      }
    
      checkScreenSize(): void{
        if(this.screenWidth < 768){
          this.tabsPosition = 'top';
        }else{
          this.tabsPosition = 'top';
        }
      }
}
