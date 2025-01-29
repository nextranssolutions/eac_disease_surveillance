import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelInstitutionsComponent } from './personnel-institutions.component';

describe('PersonnelInstitutionsComponent', () => {
  let component: PersonnelInstitutionsComponent;
  let fixture: ComponentFixture<PersonnelInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelInstitutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
