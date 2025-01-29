import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccounttypesComponent } from './user-accounttypes.component';

describe('UserAccounttypesComponent', () => {
  let component: UserAccounttypesComponent;
  let fixture: ComponentFixture<UserAccounttypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccounttypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccounttypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
