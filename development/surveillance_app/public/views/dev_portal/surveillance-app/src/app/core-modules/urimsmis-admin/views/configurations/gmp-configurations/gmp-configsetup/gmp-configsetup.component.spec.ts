import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpConfigsetupComponent } from './gmp-configsetup.component';

describe('GmpConfigsetupComponent', () => {
  let component: GmpConfigsetupComponent;
  let fixture: ComponentFixture<GmpConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmpConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmpConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
