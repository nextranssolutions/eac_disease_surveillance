import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugsConfsetupComponent } from './controlleddrugs-confsetup.component';

describe('ControlleddrugsConfsetupComponent', () => {
  let component: ControlleddrugsConfsetupComponent;
  let fixture: ComponentFixture<ControlleddrugsConfsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlleddrugsConfsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlleddrugsConfsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
