import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemguidelinesDetailComponent } from './systemguidelines-detail.component';

describe('SystemguidelinesDetailComponent', () => {
  let component: SystemguidelinesDetailComponent;
  let fixture: ComponentFixture<SystemguidelinesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemguidelinesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemguidelinesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
