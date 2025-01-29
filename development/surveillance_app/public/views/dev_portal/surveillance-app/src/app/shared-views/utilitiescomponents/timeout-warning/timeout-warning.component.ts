// timeout-warning.component.ts
import { Component, OnInit } from '@angular/core';
import { IdleService } from 'src/app/core-services/idleService/idle.service';

@Component({
  selector: 'app-timeout-warning',
  template: `
    <!-- <div *ngIf="idleService.idleState.includes('time out in')" class="timeout-warning">
      <p>{{ idleService.idleState }}</p>
      <button (click)="stay()">Stay Logged In</button>
    </div> -->
  `,
  styles: [`
    .timeout-warning {
      position: fixed;
      top: 0;
      right: 0;
      background: white;
      border: 1px solid red;
      padding: 10px;
    }
  `]
})
export class TimeoutWarningComponent implements OnInit {
  constructor(public idleService: IdleService) {}

  ngOnInit(): void {}

  // stay() {
  //   this.idleService.reset();
  // }
}
