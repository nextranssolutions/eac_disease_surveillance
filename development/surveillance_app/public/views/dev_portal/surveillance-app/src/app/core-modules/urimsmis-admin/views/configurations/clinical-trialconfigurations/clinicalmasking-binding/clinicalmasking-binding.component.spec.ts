import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalmaskingBindingComponent } from './clinicalmasking-binding.component';

describe('ClinicalmaskingBindingComponent', () => {
  let component: ClinicalmaskingBindingComponent;
  let fixture: ComponentFixture<ClinicalmaskingBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalmaskingBindingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalmaskingBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
