import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',

  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  formConfig: any = null; // Configuration data for the form
  formData: any = {}; // Holds user input data

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Simulated form configuration fetched from an API
    this.formConfig = {
      fields: [
        {
          name: 'country',
          type: 'dropdown',
          placeholder: 'Select a Country',
          optionsEndpoint: '/api/dropdown-options/country', // Dynamic API
          options: [], // To be populated dynamically
          validationRules: [
            { type: 'required', message: 'Country is required' },
          ],
        },
      ],
    };

    // Load dropdown options dynamically
    this.loadDropdownOptions();
  }

  loadDropdownOptions() {
    this.formConfig.fields.forEach((field: any) => {
      if (field.type === 'dropdown' && field.optionsEndpoint) {
        this.http.get(field.optionsEndpoint).subscribe((data: any) => {
          field.options = data; // Populate dropdown options
        });
      }
    });
  }

  onDropdownChange(event: any, fieldName: string) {
    
    // Additional handling for dependent fields or validations
  }
}
