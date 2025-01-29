import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedappCalenderdetailsComponent } from './unifiedapp-calenderdetails.component';

describe('UnifiedappCalenderdetailsComponent', () => {
  let component: UnifiedappCalenderdetailsComponent;
  let fixture: ComponentFixture<UnifiedappCalenderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedappCalenderdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifiedappCalenderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
