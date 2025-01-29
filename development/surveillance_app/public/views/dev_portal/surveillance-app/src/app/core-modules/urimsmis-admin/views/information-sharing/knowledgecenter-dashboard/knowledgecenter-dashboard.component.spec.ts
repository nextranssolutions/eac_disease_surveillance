import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgecenterDashboardComponent } from './knowledgecenter-dashboard.component';

describe('KnowledgecenterDashboardComponent', () => {
  let component: KnowledgecenterDashboardComponent;
  let fixture: ComponentFixture<KnowledgecenterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgecenterDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowledgecenterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
