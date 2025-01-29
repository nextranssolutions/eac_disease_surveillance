import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessLevelsComponent } from './user-access-levels.component';

describe('UserAccessLevelsComponent', () => {
  let component: UserAccessLevelsComponent;
  let fixture: ComponentFixture<UserAccessLevelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccessLevelsComponent]
    });
    fixture = TestBed.createComponent(UserAccessLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
