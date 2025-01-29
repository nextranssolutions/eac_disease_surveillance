import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shared-footer',
  templateUrl: './shared-footer.component.html',
  styleUrl: './shared-footer.component.css'
})
export class SharedFooterComponent {
 constructor(
    public toastr: ToastrService,
    public translate: TranslateService
    ) {  }
}
