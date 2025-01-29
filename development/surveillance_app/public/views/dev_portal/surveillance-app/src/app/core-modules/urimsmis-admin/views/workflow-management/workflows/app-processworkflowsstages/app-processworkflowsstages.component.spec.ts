import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProcessworkflowsstagesComponent } from './app-processworkflowsstages.component';

describe('AppProcessworkflowsstagesComponent', () => {
  let component: AppProcessworkflowsstagesComponent;
  let fixture: ComponentFixture<AppProcessworkflowsstagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProcessworkflowsstagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppProcessworkflowsstagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
