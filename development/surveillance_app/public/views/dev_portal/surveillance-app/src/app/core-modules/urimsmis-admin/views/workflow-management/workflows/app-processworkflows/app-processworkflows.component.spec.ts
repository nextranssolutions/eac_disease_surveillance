import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProcessworkflowsComponent } from './app-processworkflows.component';

describe('AppProcessworkflowsComponent', () => {
  let component: AppProcessworkflowsComponent;
  let fixture: ComponentFixture<AppProcessworkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProcessworkflowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppProcessworkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
