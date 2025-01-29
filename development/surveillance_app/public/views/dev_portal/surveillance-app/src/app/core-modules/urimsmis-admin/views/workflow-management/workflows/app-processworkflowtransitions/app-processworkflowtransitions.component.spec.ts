import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProcessworkflowtransitionsComponent } from './app-processworkflowtransitions.component';

describe('AppProcessworkflowtransitionsComponent', () => {
  let component: AppProcessworkflowtransitionsComponent;
  let fixture: ComponentFixture<AppProcessworkflowtransitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProcessworkflowtransitionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppProcessworkflowtransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
