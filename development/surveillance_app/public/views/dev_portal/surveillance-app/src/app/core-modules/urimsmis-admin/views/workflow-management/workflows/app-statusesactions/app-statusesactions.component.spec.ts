import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStatusesactionsComponent } from './app-statusesactions.component';

describe('AppStatusesactionsComponent', () => {
  let component: AppStatusesactionsComponent;
  let fixture: ComponentFixture<AppStatusesactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStatusesactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppStatusesactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
