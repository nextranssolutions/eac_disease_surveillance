import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalnatureControlsComponent } from './clinicalnature-controls.component';

describe('ClinicalnatureControlsComponent', () => {
  let component: ClinicalnatureControlsComponent;
  let fixture: ComponentFixture<ClinicalnatureControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalnatureControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalnatureControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
