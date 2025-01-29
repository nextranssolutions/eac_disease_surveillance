import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppstageStatusesComponent } from './appstage-statuses.component';

describe('AppstageStatusesComponent', () => {
  let component: AppstageStatusesComponent;
  let fixture: ComponentFixture<AppstageStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppstageStatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppstageStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
