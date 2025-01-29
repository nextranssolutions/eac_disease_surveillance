import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseinspectRecommendationComponent } from './premiseinspect-recommendation.component';

describe('PremiseinspectRecommendationComponent', () => {
  let component: PremiseinspectRecommendationComponent;
  let fixture: ComponentFixture<PremiseinspectRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiseinspectRecommendationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiseinspectRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
