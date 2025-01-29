import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstitutionDepartments } from './app-institutiondepartments.component';

describe('AppInstitutionDepartments', () => {
  let component: AppInstitutionDepartments;
  let fixture: ComponentFixture<AppInstitutionDepartments>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppInstitutionDepartments]
    });
    fixture = TestBed.createComponent(AppInstitutionDepartments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
