import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualCeilconfComponent } from './annual-ceilconf.component';

describe('AnnualCeilconfComponent', () => {
  let component: AnnualCeilconfComponent;
  let fixture: ComponentFixture<AnnualCeilconfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualCeilconfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualCeilconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
