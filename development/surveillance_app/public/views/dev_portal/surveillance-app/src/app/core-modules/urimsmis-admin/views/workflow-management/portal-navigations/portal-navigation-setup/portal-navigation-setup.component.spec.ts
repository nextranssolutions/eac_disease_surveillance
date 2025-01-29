import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNavigationSetupComponent } from './portal-navigation-setup.component';

describe('PortalNavigationSetupComponent', () => {
  let component: PortalNavigationSetupComponent;
  let fixture: ComponentFixture<PortalNavigationSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalNavigationSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalNavigationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
