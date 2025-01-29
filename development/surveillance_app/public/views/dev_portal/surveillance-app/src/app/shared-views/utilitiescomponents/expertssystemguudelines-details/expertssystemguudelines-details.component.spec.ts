import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertssystemguudelinesDetailsComponent } from './expertssystemguudelines-details.component';

describe('ExpertssystemguudelinesDetailsComponent', () => {
  let component: ExpertssystemguudelinesDetailsComponent;
  let fixture: ComponentFixture<ExpertssystemguudelinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertssystemguudelinesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertssystemguudelinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
