import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDocdefinationComponent } from './portal-docdefination.component';

describe('PortalDocdefinationComponent', () => {
  let component: PortalDocdefinationComponent;
  let fixture: ComponentFixture<PortalDocdefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalDocdefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalDocdefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
