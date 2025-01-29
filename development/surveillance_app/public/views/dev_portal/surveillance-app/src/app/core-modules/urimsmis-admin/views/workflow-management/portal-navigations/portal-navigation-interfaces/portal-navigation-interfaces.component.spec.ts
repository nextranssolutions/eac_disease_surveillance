import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNavigationInterfacesComponent } from './portal-navigation-interfaces.component';

describe('PortalNavigationInterfacesComponent', () => {
  let component: PortalNavigationInterfacesComponent;
  let fixture: ComponentFixture<PortalNavigationInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalNavigationInterfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalNavigationInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
