import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedappUserprofileComponent } from './unifiedapp-userprofile.component';

describe('UnifiedappUserprofileComponent', () => {
  let component: UnifiedappUserprofileComponent;
  let fixture: ComponentFixture<UnifiedappUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedappUserprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifiedappUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
