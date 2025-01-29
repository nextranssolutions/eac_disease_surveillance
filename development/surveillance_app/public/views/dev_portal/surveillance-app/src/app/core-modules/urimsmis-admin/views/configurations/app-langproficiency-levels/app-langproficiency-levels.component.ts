import { Component } from '@angular/core';

@Component({
  selector: 'app-app-langproficiency-levels',
  templateUrl: './app-langproficiency-levels.component.html',
  styleUrl: './app-langproficiency-levels.component.css'
})
export class AppLangproficiencyLevelsComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_langproficiency_levels';
    this.parameter_name = "language_proficiency";
  }

  ngOnInit() {
    // other initializations

  }
}
