import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermaliciousaccessComponent } from './usermaliciousaccess.component';

describe('UsermaliciousaccessComponent', () => {
  let component: UsermaliciousaccessComponent;
  let fixture: ComponentFixture<UsermaliciousaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermaliciousaccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsermaliciousaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
