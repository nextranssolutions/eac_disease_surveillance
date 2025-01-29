import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessScalesComponent } from './business-scales.component';

describe('BusinessScalesComponent', () => {
  let component: BusinessScalesComponent;
  let fixture: ComponentFixture<BusinessScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessScalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
