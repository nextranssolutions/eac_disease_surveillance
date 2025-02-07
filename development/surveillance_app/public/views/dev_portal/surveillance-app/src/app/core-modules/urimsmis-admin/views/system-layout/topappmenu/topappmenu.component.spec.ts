import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopappmenuComponent } from './topappmenu.component';

describe('TopappmenuComponent', () => {
  let component: TopappmenuComponent;
  let fixture: ComponentFixture<TopappmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopappmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopappmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
