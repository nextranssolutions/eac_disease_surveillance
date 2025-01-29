import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNationalitiesComponent } from './app-nationalities.component';

describe('AppNationalitiesComponent', () => {
  let component: AppNationalitiesComponent;
  let fixture: ComponentFixture<AppNationalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppNationalitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppNationalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
