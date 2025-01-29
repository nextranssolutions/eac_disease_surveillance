import { Component } from '@angular/core';

@Component({
  selector: 'app-portentry-exit',
  templateUrl: './portentry-exit.component.html',
  styleUrl: './portentry-exit.component.css'
})
export class PortentryExitComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_ports_information';
    this.parameter_name = "port_entry_exit";
  }
}
