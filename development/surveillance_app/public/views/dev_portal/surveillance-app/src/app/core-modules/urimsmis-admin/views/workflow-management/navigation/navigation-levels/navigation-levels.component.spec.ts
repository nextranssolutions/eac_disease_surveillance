import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLevelsComponent } from './navigation-levels.component';

describe('NavigationLevelsComponent', () => {
  let component: NavigationLevelsComponent;
  let fixture: ComponentFixture<NavigationLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationLevelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
