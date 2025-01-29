import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEoidocumentcategoryComponent } from './app-eoidocumentcategory.component';

describe('AppEoidocumentcategoryComponent', () => {
  let component: AppEoidocumentcategoryComponent;
  let fixture: ComponentFixture<AppEoidocumentcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEoidocumentcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppEoidocumentcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
