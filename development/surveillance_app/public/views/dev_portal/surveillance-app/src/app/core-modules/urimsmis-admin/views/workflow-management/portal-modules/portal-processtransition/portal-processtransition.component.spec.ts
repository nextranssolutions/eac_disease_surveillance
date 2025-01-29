import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalProcesstransitionComponent } from './portal-processtransition.component';

describe('PortalProcesstransitionComponent', () => {
  let component: PortalProcesstransitionComponent;
  let fixture: ComponentFixture<PortalProcesstransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalProcesstransitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalProcesstransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
