import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsScreeningdecisionsComponent } from './pms-screeningdecisions.component';

describe('PmsScreeningdecisionsComponent', () => {
  let component: PmsScreeningdecisionsComponent;
  let fixture: ComponentFixture<PmsScreeningdecisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsScreeningdecisionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmsScreeningdecisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
