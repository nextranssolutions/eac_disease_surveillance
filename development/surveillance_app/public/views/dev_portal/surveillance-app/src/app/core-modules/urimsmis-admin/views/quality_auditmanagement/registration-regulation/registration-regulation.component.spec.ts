import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRegulationComponent } from './registration-regulation.component';

describe('RegistrationRegulationComponent', () => {
  let component: RegistrationRegulationComponent;
  let fixture: ComponentFixture<RegistrationRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationRegulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
