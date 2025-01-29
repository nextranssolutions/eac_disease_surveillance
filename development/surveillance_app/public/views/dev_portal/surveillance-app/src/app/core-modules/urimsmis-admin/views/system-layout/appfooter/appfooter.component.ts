import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.css']
})
export class AppfooterComponent {
  constructor(
    public toastr: ToastrService,
    public translate: TranslateService
    ) {  }

}
