import { Component, OnChanges } from '@angular/core';
import { SharedapplicationdocumentuploadsComponent } from 'src/app/shared-views/sharedutilities/sharedapplicationdocumentuploads/sharedapplicationdocumentuploads.component';


@Component({
  selector: 'app-preview-appdocumentuploads',
  templateUrl: './preview-appdocumentuploads.component.html',
  styleUrl: './preview-appdocumentuploads.component.css'
})
export class PreviewAppdocumentuploadsComponent  extends SharedapplicationdocumentuploadsComponent implements OnChanges{
  
}
