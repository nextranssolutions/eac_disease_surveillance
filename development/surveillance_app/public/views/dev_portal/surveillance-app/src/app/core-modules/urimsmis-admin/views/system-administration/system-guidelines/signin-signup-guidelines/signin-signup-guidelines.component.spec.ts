import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSignupGuidelinesComponent } from './signin-signup-guidelines.component';

describe('SigninSignupGuidelinesComponent', () => {
  let component: SigninSignupGuidelinesComponent;
  let fixture: ComponentFixture<SigninSignupGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninSignupGuidelinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninSignupGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
