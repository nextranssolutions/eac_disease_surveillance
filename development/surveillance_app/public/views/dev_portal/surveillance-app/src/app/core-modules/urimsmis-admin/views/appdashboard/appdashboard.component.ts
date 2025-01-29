import { Component, ViewContainerRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-appdashboard',
  templateUrl: './appdashboard.component.html',
  styleUrls: ['./appdashboard.component.css']
})
export class AppdashboardComponent {
  
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
}
