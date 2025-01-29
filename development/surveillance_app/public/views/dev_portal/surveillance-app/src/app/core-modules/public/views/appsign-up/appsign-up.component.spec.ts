import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsignUpComponent } from './appsign-up.component';

describe('AppsignUpComponent', () => {
  let component: AppsignUpComponent;
  let fixture: ComponentFixture<AppsignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsignUpComponent]
    });
    fixture = TestBed.createComponent(AppsignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
