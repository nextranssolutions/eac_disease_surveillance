import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserIdentificationType } from './app-useridentificationtype.component';

describe('AppUserIdentificationType', () => {
  let component: AppUserIdentificationType;
  let fixture: ComponentFixture<AppUserIdentificationType>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppUserIdentificationType]
    });
    fixture = TestBed.createComponent(AppUserIdentificationType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
