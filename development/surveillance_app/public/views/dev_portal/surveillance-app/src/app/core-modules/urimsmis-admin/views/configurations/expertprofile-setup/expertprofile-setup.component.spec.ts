import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertprofileSetupComponent } from './expertprofile-setup.component';

describe('ExpertprofileSetupComponent', () => {
  let component: ExpertprofileSetupComponent;
  let fixture: ComponentFixture<ExpertprofileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertprofileSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertprofileSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
