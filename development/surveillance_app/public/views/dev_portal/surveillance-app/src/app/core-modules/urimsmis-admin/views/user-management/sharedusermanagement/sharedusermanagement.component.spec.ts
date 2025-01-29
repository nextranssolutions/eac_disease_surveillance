import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedusermanagementComponent } from './sharedusermanagement.component';

describe('SharedusermanagementComponent', () => {
  let component: SharedusermanagementComponent;
  let fixture: ComponentFixture<SharedusermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedusermanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedusermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
