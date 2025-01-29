import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimerStatementsComponent } from './disclaimer-statements.component';

describe('DisclaimerStatementsComponent', () => {
  let component: DisclaimerStatementsComponent;
  let fixture: ComponentFixture<DisclaimerStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisclaimerStatementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisclaimerStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
