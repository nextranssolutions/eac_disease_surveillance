import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypeDetailsComponent } from './business-type-details.component';

describe('BusinessTypeDetailsComponent', () => {
  let component: BusinessTypeDetailsComponent;
  let fixture: ComponentFixture<BusinessTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
