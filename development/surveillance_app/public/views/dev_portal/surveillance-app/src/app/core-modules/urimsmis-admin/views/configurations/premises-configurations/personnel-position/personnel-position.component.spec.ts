import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelPositionComponent } from './personnel-position.component';

describe('PersonnelPositionComponent', () => {
  let component: PersonnelPositionComponent;
  let fixture: ComponentFixture<PersonnelPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
