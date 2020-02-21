import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowBarComponent } from './below-bar.component';

describe('BelowBarComponent', () => {
  let component: BelowBarComponent;
  let fixture: ComponentFixture<BelowBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelowBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelowBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
