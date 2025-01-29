import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalNavigationsComponent } from './portal-navigations.component';

describe('PortalNavigationsComponent', () => {
  let component: PortalNavigationsComponent;
  let fixture: ComponentFixture<PortalNavigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalNavigationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
