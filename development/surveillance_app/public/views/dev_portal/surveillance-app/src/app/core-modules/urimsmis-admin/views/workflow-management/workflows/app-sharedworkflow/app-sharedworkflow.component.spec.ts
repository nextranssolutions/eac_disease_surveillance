import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSharedworkflowComponent } from './app-sharedworkflow.component';

describe('AppSharedworkflowComponent', () => {
  let component: AppSharedworkflowComponent;
  let fixture: ComponentFixture<AppSharedworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSharedworkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSharedworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
