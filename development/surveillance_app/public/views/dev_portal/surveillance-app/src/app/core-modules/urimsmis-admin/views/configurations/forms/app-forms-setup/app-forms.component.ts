import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';

@Component({
  selector: 'app-app-forms',
  templateUrl: './app-forms.component.html',
  styleUrl: './app-forms.component.css'
})
export class AppFormsComponent {


  table_name: string;
  parameter_name: string = "forms"
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

 

  ngOnInit(){
    
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


  onFuncSaveNavigationData(){

  }
}


