import { Component, HostListener } from '@angular/core';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';

@Component({
  selector: 'app-premise-configsetup',

  templateUrl: './premise-configsetup.component.html',
  styleUrl: './premise-configsetup.component.css'
})
export class PremiseConfigsetupComponent {
table_name: string;
  parameter_name: string = "premise_configurations";
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
