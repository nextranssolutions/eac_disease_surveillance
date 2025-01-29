import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalStatusactionsComponent } from './portal-statusactions.component';

describe('PortalStatusactionsComponent', () => {
  let component: PortalStatusactionsComponent;
  let fixture: ComponentFixture<PortalStatusactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalStatusactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalStatusactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
