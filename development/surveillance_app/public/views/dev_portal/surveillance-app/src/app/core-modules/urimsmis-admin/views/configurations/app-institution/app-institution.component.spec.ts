import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstitution } from './app-institution.component';

describe('AppInstitution', () => {
  let component: AppInstitution;
  let fixture: ComponentFixture<AppInstitution>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppInstitution]
    });
    fixture = TestBed.createComponent(AppInstitution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
