import { Component, HostListener } from '@angular/core';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';

@Component({
  selector: 'app-app-firewallips',
  templateUrl: './app-firewallips.component.html',
  styleUrl: './app-firewallips.component.css'
})
export class AppFirewallipsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;
  constructor(
    // private http: HttpClient,
    
  ) {
    this.checkScreenSize();
    this.table_name = 'firewall_ips';
    this.parameter_name = "firewall_ips";
   
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
      this.tabsPosition = 'left';
    }
  }
  ngOnInit() {
    // other initializations

  }
}
