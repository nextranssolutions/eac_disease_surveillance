import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcredResourcedashboardComponent } from './ecred-resourcedashboard.component';

describe('EcredResourcedashboardComponent', () => {
  let component: EcredResourcedashboardComponent;
  let fixture: ComponentFixture<EcredResourcedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcredResourcedashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcredResourcedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
