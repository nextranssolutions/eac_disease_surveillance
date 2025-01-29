import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedappNavigationComponent } from './unifiedapp-navigation.component';

describe('UnifiedappNavigationComponent', () => {
  let component: UnifiedappNavigationComponent;
  let fixture: ComponentFixture<UnifiedappNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedappNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifiedappNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
