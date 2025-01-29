import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpProductcategoryComponent } from './gmp-productcategory.component';

describe('GmpProductcategoryComponent', () => {
  let component: GmpProductcategoryComponent;
  let fixture: ComponentFixture<GmpProductcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmpProductcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmpProductcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
