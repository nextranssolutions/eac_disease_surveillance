import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeCenterinfomanagementComponent } from './knowledge-centerinfomanagement.component';

describe('KnowledgeCenterinfomanagementComponent', () => {
  let component: KnowledgeCenterinfomanagementComponent;
  let fixture: ComponentFixture<KnowledgeCenterinfomanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeCenterinfomanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowledgeCenterinfomanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
