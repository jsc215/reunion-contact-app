import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiFormComponent } from './regi-form.component';

describe('RegiFormComponent', () => {
  let component: RegiFormComponent;
  let fixture: ComponentFixture<RegiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
