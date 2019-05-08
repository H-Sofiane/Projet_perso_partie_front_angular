import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiresttestComponent } from './apiresttest.component';

describe('ApiresttestComponent', () => {
  let component: ApiresttestComponent;
  let fixture: ComponentFixture<ApiresttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiresttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiresttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
