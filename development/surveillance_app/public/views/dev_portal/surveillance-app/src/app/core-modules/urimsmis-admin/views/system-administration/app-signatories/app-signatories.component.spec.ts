import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSignatoriesComponent } from './app-signatories.component';

describe('AppSignatoriesComponent', () => {
  let component: AppSignatoriesComponent;
  let fixture: ComponentFixture<AppSignatoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSignatoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSignatoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
