import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanchInstanceComponent } from './lanch-instance.component';

describe('LanchInstanceComponent', () => {
  let component: LanchInstanceComponent;
  let fixture: ComponentFixture<LanchInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanchInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanchInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
