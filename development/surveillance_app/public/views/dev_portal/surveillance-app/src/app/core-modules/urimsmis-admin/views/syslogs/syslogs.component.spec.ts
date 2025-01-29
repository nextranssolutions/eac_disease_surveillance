import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyslogsComponent } from './syslogs.component';

describe('SyslogsComponent', () => {
  let component: SyslogsComponent;
  let fixture: ComponentFixture<SyslogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyslogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SyslogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
