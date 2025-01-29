import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpreviewexpertprofiledetailsComponent } from './sharedpreviewexpertprofiledetails.component';

describe('SharedpreviewexpertprofiledetailsComponent', () => {
  let component: SharedpreviewexpertprofiledetailsComponent;
  let fixture: ComponentFixture<SharedpreviewexpertprofiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedpreviewexpertprofiledetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedpreviewexpertprofiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
