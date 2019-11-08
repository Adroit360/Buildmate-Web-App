import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdescComponent } from './productdesc.component';

describe('ProductdescComponent', () => {
  let component: ProductdescComponent;
  let fixture: ComponentFixture<ProductdescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
