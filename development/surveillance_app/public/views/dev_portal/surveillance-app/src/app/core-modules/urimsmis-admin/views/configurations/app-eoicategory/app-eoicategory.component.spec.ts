import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEoicategoryComponent } from './app-eoicategory.component';

describe('AppEoicategoryComponent', () => {
  let component: AppEoicategoryComponent;
  let fixture: ComponentFixture<AppEoicategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEoicategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppEoicategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
