import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalmaskingUsedComponent } from './clinicalmasking-used.component';

describe('ClinicalmaskingUsedComponent', () => {
  let component: ClinicalmaskingUsedComponent;
  let fixture: ComponentFixture<ClinicalmaskingUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalmaskingUsedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalmaskingUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
