import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelsofExperienceComponent } from './app-levelsof-experience.component';

describe('AppLevelsofExperienceComponent', () => {
  let component: AppLevelsofExperienceComponent;
  let fixture: ComponentFixture<AppLevelsofExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLevelsofExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppLevelsofExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
