import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalworkflowsComponent } from './portalworkflows.component';

describe('PortalworkflowsComponent', () => {
  let component: PortalworkflowsComponent;
  let fixture: ComponentFixture<PortalworkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalworkflowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalworkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
