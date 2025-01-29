import { Component, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxCheckBoxModule, DxDateBoxModule, DxSelectBoxModule, DxTemplateModule,
} from 'devextreme-angular';
import { DxCalendarModule, DxCalendarTypes } from 'devextreme-angular/ui/calendar';

@Component({
  selector: 'app-unifiedapp-calenderdetails',
  templateUrl: './unifiedapp-calenderdetails.component.html',
  styleUrl: './unifiedapp-calenderdetails.component.css'
})
export class UnifiedappCalenderdetailsComponent {
  now = new Date();
  currentDate: Date = new Date();
  currentValue = new Date();

  
}
