import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealTypesComponent } from './appeal-types.component';

describe('AppealTypesComponent', () => {
  let component: AppealTypesComponent;
  let fixture: ComponentFixture<AppealTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppealTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
