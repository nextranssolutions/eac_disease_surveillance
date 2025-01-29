import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMyprofileComponent } from './app-myprofile.component';

describe('AppMyprofileComponent', () => {
  let component: AppMyprofileComponent;
  let fixture: ComponentFixture<AppMyprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppMyprofileComponent]
    });
    fixture = TestBed.createComponent(AppMyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
