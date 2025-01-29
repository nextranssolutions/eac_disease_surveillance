import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyslogsUsersaccessComponent } from './syslogs-usersaccess.component';

describe('SyslogsUsersaccessComponent', () => {
  let component: SyslogsUsersaccessComponent;
  let fixture: ComponentFixture<SyslogsUsersaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyslogsUsersaccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SyslogsUsersaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
