import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideodescComponent } from './videodesc.component';

describe('VideodescComponent', () => {
  let component: VideodescComponent;
  let fixture: ComponentFixture<VideodescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideodescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideodescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
