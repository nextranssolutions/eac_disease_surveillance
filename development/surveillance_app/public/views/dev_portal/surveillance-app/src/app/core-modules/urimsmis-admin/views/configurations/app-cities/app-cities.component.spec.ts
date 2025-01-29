import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCitiesComponent } from './app-cities.component';

describe('AppCitiesComponent', () => {
  let component: AppCitiesComponent;
  let fixture: ComponentFixture<AppCitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCitiesComponent]
    });
    fixture = TestBed.createComponent(AppCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
