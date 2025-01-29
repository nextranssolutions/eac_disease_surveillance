import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseTypeComponent } from './premise-type.component';

describe('PremiseTypeComponent', () => {
  let component: PremiseTypeComponent;
  let fixture: ComponentFixture<PremiseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiseTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
