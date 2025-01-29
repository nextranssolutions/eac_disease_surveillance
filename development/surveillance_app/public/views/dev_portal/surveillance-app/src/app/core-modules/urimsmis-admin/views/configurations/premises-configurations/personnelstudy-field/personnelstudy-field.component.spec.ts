import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelstudyFieldComponent } from './personnelstudy-field.component';

describe('PersonnelstudyFieldComponent', () => {
  let component: PersonnelstudyFieldComponent;
  let fixture: ComponentFixture<PersonnelstudyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelstudyFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelstudyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
