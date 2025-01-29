import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimerStatementTypesComponent } from './disclaimer-statement-types.component';

describe('DisclaimerStatementTypesComponent', () => {
  let component: DisclaimerStatementTypesComponent;
  let fixture: ComponentFixture<DisclaimerStatementTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisclaimerStatementTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisclaimerStatementTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
