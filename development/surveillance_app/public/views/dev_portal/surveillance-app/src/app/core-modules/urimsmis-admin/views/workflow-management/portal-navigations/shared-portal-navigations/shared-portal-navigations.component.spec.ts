import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPortalNavigationsComponent } from './shared-portal-navigations.component';

describe('SharedPortalNavigationsComponent', () => {
  let component: SharedPortalNavigationsComponent;
  let fixture: ComponentFixture<SharedPortalNavigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPortalNavigationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPortalNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
