import { Component } from '@angular/core';

@Component({
  selector: 'app-app-levelsof-experience',
  templateUrl: './app-levelsof-experience.component.html',
  styleUrl: './app-levelsof-experience.component.css'
})
export class AppLevelsofExperienceComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_levelsof_experience';
    this.parameter_name = "levelsof_experience";
  }

  ngOnInit() {
    // other initializations

  }
}
