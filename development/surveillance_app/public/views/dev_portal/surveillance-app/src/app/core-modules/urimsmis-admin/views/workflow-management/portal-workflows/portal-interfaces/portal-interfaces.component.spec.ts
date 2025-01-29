import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalInterfacesComponent } from './portal-interfaces.component';

describe('PortalInterfacesComponent', () => {
  let component: PortalInterfacesComponent;
  let fixture: ComponentFixture<PortalInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalInterfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
