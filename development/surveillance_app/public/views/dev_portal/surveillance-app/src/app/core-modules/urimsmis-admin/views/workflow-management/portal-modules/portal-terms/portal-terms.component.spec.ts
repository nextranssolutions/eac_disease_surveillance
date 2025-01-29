import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalTermsComponent } from './portal-terms.component';

describe('PortalTermsComponent', () => {
  let component: PortalTermsComponent;
  let fixture: ComponentFixture<PortalTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalTermsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
