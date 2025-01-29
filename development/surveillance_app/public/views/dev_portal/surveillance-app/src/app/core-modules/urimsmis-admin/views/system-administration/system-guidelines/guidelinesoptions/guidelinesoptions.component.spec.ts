import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesoptionsComponent } from './guidelinesoptions.component';

describe('GuidelinesoptionsComponent', () => {
  let component: GuidelinesoptionsComponent;
  let fixture: ComponentFixture<GuidelinesoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidelinesoptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidelinesoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
