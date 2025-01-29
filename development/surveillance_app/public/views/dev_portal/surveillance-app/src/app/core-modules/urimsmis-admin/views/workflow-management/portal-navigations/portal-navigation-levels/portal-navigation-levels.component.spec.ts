import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNavigationLevelsComponent } from './portal-navigation-levels.component';

describe('PortalNavigationLevelsComponent', () => {
  let component: PortalNavigationLevelsComponent;
  let fixture: ComponentFixture<PortalNavigationLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalNavigationLevelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalNavigationLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
