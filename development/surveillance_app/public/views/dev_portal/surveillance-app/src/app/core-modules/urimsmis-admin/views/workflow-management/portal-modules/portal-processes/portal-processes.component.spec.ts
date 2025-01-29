import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalProcessesComponent } from './portal-processes.component';

describe('PortalProcessesComponent', () => {
  let component: PortalProcessesComponent;
  let fixture: ComponentFixture<PortalProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalProcessesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
