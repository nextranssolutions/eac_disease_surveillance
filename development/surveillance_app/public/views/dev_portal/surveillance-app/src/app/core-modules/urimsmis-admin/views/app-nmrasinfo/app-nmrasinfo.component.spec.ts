import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNmrasinfoComponent } from './app-nmrasinfo.component';

describe('AppNmrasinfoComponent', () => {
  let component: AppNmrasinfoComponent;
  let fixture: ComponentFixture<AppNmrasinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppNmrasinfoComponent]
    });
    fixture = TestBed.createComponent(AppNmrasinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
