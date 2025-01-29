import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsPublicationsmanagamentComponent } from './experts-publicationsmanagament.component';

describe('ExpertsPublicationsmanagamentComponent', () => {
  let component: ExpertsPublicationsmanagamentComponent;
  let fixture: ComponentFixture<ExpertsPublicationsmanagamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertsPublicationsmanagamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertsPublicationsmanagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
