import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsDocrequirementsAppstatusComponent } from './dms-docrequirements-appstatus.component';

describe('DmsDocrequirementsAppstatusComponent', () => {
  let component: DmsDocrequirementsAppstatusComponent;
  let fixture: ComponentFixture<DmsDocrequirementsAppstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsDocrequirementsAppstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsDocrequirementsAppstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
