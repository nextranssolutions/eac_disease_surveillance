import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserTitle } from './app-usertitle.component';

describe('AppUserTitle', () => {
  let component: AppUserTitle;
  let fixture: ComponentFixture<AppUserTitle>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppUserTitle]
    });
    fixture = TestBed.createComponent(AppUserTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
