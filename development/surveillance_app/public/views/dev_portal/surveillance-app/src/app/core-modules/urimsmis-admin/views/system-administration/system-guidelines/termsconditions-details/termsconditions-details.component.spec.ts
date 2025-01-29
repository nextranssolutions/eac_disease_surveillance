import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsconditionsDetailsComponent } from './termsconditions-details.component';

describe('TermsconditionsDetailsComponent', () => {
  let component: TermsconditionsDetailsComponent;
  let fixture: ComponentFixture<TermsconditionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsconditionsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsconditionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
