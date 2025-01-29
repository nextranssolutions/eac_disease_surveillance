import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExchangeratesComponent } from './app-exchangerates.component';

describe('AppExchangeratesComponent', () => {
  let component: AppExchangeratesComponent;
  let fixture: ComponentFixture<AppExchangeratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExchangeratesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppExchangeratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
