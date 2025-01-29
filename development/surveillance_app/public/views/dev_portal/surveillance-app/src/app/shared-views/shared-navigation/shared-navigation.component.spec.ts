import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNavigationComponent } from './shared-navigation.component';

describe('SharedNavigationComponent', () => {
  let component: SharedNavigationComponent;
  let fixture: ComponentFixture<SharedNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
