import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationConditionComponent } from './registration-condition.component';

describe('RegistrationConditionComponent', () => {
  let component: RegistrationConditionComponent;
  let fixture: ComponentFixture<RegistrationConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
