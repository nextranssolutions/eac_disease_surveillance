import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedappLayoutComponent } from './unifiedapp-layout.component';

describe('UnifiedappLayoutComponent', () => {
  let component: UnifiedappLayoutComponent;
  let fixture: ComponentFixture<UnifiedappLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedappLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifiedappLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
