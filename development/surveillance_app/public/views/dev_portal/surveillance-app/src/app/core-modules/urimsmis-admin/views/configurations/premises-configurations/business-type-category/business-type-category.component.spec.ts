import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypeCategoryComponent } from './business-type-category.component';

describe('BusinessTypeCategoryComponent', () => {
  let component: BusinessTypeCategoryComponent;
  let fixture: ComponentFixture<BusinessTypeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTypeCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessTypeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
