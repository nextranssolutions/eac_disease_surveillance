import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelQualificationsComponent } from './personnel-qualifications.component';

describe('PersonnelQualificationsComponent', () => {
  let component: PersonnelQualificationsComponent;
  let fixture: ComponentFixture<PersonnelQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelQualificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
