import { Component, HostListener } from '@angular/core';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';


@Component({
  selector: 'app-controlleddrugs-confsetup',
  templateUrl: './controlleddrugs-confsetup.component.html',
  styleUrl: './controlleddrugs-confsetup.component.css'
})
export class ControlleddrugsConfsetupComponent {
table_name: string;
  parameter_name: string = "controlled_drugs_configurations";
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;

  constructor(){
    this.checkScreenSize();

    
  }
  ngOnInit(){
    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void{
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize(): void{
    if(this.screenWidth < 768){
      this.tabsPosition = 'left';
    }else{
      this.tabsPosition = 'left';
    }
  }
  onFuncSaveNavigationData(){

  }
}
