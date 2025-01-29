import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelsofStudyComponent } from './app-levelsof-study.component';

describe('AppLevelsofStudyComponent', () => {
  let component: AppLevelsofStudyComponent;
  let fixture: ComponentFixture<AppLevelsofStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLevelsofStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppLevelsofStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
