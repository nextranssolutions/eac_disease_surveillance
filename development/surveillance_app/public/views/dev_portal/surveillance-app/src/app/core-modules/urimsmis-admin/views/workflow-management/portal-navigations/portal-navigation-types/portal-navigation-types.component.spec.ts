import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNavigationTypesComponent } from './portal-navigation-types.component';

describe('PortalNavigationTypesComponent', () => {
  let component: PortalNavigationTypesComponent;
  let fixture: ComponentFixture<PortalNavigationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalNavigationTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalNavigationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
