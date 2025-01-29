import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProcessconfigurationComponent } from './shared-processconfiguration.component';

describe('SharedProcessconfigurationComponent', () => {
  let component: SharedProcessconfigurationComponent;
  let fixture: ComponentFixture<SharedProcessconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedProcessconfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedProcessconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
