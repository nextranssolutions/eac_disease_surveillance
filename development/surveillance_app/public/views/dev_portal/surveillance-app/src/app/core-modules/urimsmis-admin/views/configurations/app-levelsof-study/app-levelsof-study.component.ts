import { Component } from '@angular/core';

@Component({
  selector: 'app-app-levelsof-study',
  templateUrl: './app-levelsof-study.component.html',
  styleUrl: './app-levelsof-study.component.css'
})
export class AppLevelsofStudyComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_levelsof_study';
    this.parameter_name = "Level of Study";
  }

  ngOnInit() {
    // other initializations

  }
}
