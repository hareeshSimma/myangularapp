import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCloudComponent } from './google-cloud.component';

describe('GoogleCloudComponent', () => {
  let component: GoogleCloudComponent;
  let fixture: ComponentFixture<GoogleCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
