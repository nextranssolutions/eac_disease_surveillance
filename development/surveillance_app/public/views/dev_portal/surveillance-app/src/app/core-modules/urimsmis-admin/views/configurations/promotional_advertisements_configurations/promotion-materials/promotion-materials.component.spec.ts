import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionMaterialsComponent } from './promotion-materials.component';

describe('PromotionMaterialsComponent', () => {
  let component: PromotionMaterialsComponent;
  let fixture: ComponentFixture<PromotionMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
