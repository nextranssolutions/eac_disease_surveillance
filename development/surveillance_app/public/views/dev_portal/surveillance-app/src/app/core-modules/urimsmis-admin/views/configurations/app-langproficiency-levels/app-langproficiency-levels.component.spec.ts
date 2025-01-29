import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLangproficiencyLevelsComponent } from './app-langproficiency-levels.component';

describe('AppLangproficiencyLevelsComponent', () => {
  let component: AppLangproficiencyLevelsComponent;
  let fixture: ComponentFixture<AppLangproficiencyLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLangproficiencyLevelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppLangproficiencyLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
