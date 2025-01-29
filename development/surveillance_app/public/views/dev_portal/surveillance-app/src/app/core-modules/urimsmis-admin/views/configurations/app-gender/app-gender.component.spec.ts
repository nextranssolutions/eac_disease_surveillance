import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGenderComponent } from './app-gender.component';

describe('AppGenderComponent', () => {
  let component: AppGenderComponent;
  let fixture: ComponentFixture<AppGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppGenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
