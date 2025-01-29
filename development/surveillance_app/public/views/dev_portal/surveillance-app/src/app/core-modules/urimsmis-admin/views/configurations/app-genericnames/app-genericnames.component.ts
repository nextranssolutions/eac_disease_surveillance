import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-genericnames',
  templateUrl: './app-genericnames.component.html',
  styleUrls: ['./app-genericnames.component.css']
})
export class AppGenericnamesComponent implements OnInit {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_generic_names';
    this.parameter_name = "generic_names_details";
  }
  
  ngOnInit() {
    // other initializations

  }
}
