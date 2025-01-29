import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSystemlanguagesComponent } from './app-systemlanguages.component';

describe('AppSystemlanguagesComponent', () => {
  let component: AppSystemlanguagesComponent;
  let fixture: ComponentFixture<AppSystemlanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSystemlanguagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSystemlanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
