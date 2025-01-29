import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalAdvertconfigsetupComponent } from './promotional-advertconfigsetup.component';

describe('PromotionalAdvertconfigsetupComponent', () => {
  let component: PromotionalAdvertconfigsetupComponent;
  let fixture: ComponentFixture<PromotionalAdvertconfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionalAdvertconfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionalAdvertconfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
