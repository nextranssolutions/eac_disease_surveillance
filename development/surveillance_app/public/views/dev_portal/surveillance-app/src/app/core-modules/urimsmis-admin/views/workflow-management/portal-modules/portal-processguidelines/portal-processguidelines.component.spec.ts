import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalProcessguidelinesComponent } from './portal-processguidelines.component';

describe('PortalProcessguidelinesComponent', () => {
  let component: PortalProcessguidelinesComponent;
  let fixture: ComponentFixture<PortalProcessguidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalProcessguidelinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalProcessguidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
