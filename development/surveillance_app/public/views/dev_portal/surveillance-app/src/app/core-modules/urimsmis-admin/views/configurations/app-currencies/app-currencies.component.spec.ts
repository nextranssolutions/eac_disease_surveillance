import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCurrenciesComponent } from './app-currencies.component';

describe('AppCurrenciesComponent', () => {
  let component: AppCurrenciesComponent;
  let fixture: ComponentFixture<AppCurrenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppCurrenciesComponent]
    });
    fixture = TestBed.createComponent(AppCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
