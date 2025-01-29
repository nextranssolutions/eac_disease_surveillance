import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsystemguudelinesDetailsComponent } from './adminsystemguudelines-details.component';

describe('AdminsystemguudelinesDetailsComponent', () => {
  let component: AdminsystemguudelinesDetailsComponent;
  let fixture: ComponentFixture<AdminsystemguudelinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminsystemguudelinesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminsystemguudelinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
