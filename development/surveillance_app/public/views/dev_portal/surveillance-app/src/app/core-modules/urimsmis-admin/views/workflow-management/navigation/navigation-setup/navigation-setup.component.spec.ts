import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSetupComponent } from './navigation-setup.component';

describe('NavigationSetupComponent', () => {
  let component: NavigationSetupComponent;
  let fixture: ComponentFixture<NavigationSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
