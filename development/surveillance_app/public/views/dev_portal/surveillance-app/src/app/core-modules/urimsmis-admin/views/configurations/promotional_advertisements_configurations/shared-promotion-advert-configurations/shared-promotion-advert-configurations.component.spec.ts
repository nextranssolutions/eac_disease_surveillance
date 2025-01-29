import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPromotionAdvertConfigurationsComponent } from './shared-promotion-advert-configurations.component';

describe('SharedPromotionAdvertConfigurationsComponent', () => {
  let component: SharedPromotionAdvertConfigurationsComponent;
  let fixture: ComponentFixture<SharedPromotionAdvertConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPromotionAdvertConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPromotionAdvertConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
