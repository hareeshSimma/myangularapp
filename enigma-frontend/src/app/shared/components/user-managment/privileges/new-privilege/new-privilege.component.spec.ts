import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrivilegeComponent } from './new-privilege.component';

describe('NewPrivilegeComponent', () => {
  let component: NewPrivilegeComponent;
  let fixture: ComponentFixture<NewPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
