import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccessKeyComponent } from './create-access-key.component';

describe('CreateAccessKeyComponent', () => {
  let component: CreateAccessKeyComponent;
  let fixture: ComponentFixture<CreateAccessKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccessKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccessKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
