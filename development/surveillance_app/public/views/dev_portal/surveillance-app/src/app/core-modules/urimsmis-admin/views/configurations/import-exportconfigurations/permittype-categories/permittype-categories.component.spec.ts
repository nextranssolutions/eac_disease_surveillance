import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermittypeCategoriesComponent } from './permittype-categories.component';

describe('PermittypeCategoriesComponent', () => {
  let component: PermittypeCategoriesComponent;
  let fixture: ComponentFixture<PermittypeCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermittypeCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermittypeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
