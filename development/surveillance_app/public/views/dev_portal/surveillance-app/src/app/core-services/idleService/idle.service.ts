import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, timer } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppSettings } from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  idleTimeout = AppSettings.idleTimeout; // 5 minutes
  timeoutWarning = AppSettings.timeoutWarning; // 1 minute
  private userIdle$ = new BehaviorSubject<boolean>(false);
  //this.appService.funcUserLogOut() 
  constructor(private ngZone: NgZone, private router: Router, private appService: AuthenticationService) {
    this.startWatching();
  }

  get userIdle() {
    return this.userIdle$.asObservable();
  }

  private startWatching(): void {
    let has_activesession = this.appService.checkAuthenticationState();
   
    if (has_activesession) {
     
      this.ngZone.runOutsideAngular(() => {
        const idle$ = merge(
          fromEvent(document, 'mousemove'),
          fromEvent(document, 'click'),
          fromEvent(document, 'keydown')
        ).pipe(mapTo(false));

        const timer$ = timer(this.idleTimeout * 1000).pipe(mapTo(true));

        idle$.pipe(
          switchMap(() => {
            this.userIdle$.next(false);
            return timer$;
          })
        ).subscribe((isIdle) => {
          if (isIdle) {
            this.ngZone.run(() => this.userIdle$.next(true));
          }
        });
      //  alert('test');
        this.userIdle$.subscribe(isIdle => {
          if (isIdle) {
            setTimeout(() => this.appService.funcUserLogOut(), this.timeoutWarning * 100);
          }
        });
      });


    }




  }
}
