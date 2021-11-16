import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObraComponent } from './list-obra.component';

describe('ListObraComponent', () => {
  let component: ListObraComponent;
  let fixture: ComponentFixture<ListObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
