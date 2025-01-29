import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitReasonsComponent } from './permit-reasons.component';

describe('PermitReasonsComponent', () => {
  let component: PermitReasonsComponent;
  let fixture: ComponentFixture<PermitReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitReasonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
