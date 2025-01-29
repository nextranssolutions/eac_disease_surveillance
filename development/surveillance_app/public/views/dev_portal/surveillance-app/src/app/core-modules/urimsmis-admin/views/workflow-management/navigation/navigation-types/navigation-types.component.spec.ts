import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTypesComponent } from './navigation-types.component';

describe('NavigationTypesComponent', () => {
  let component: NavigationTypesComponent;
  let fixture: ComponentFixture<NavigationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
