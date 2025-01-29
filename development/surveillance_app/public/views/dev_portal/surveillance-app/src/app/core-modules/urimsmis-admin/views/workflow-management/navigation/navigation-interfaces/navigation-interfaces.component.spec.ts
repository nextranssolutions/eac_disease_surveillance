import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationInterfacesComponent } from './navigation-interfaces.component';

describe('NavigationInterfacesComponent', () => {
  let component: NavigationInterfacesComponent;
  let fixture: ComponentFixture<NavigationInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationInterfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
