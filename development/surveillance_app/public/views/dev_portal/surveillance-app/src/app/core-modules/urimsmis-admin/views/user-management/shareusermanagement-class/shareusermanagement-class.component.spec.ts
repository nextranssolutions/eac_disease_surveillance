import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareusermanagementClassComponent } from './shareusermanagement-class.component';

describe('ShareusermanagementClassComponent', () => {
  let component: ShareusermanagementClassComponent;
  let fixture: ComponentFixture<ShareusermanagementClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareusermanagementClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareusermanagementClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
