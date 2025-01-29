import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppActiveUserAccounts } from './app-activeuseraccounts.component';

describe('AppActiveUserAccounts', () => {
  let component: AppActiveUserAccounts;
  let fixture: ComponentFixture<AppActiveUserAccounts>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppActiveUserAccounts]
    });
    fixture = TestBed.createComponent(AppActiveUserAccounts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
