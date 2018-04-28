import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGenerationComponent } from './template-generation.component';

describe('TemplateGenerationComponent', () => {
  let component: TemplateGenerationComponent;
  let fixture: ComponentFixture<TemplateGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
