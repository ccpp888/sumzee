import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../shared/material.module';

import { AdditionComponent } from '../addition/addition.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ROUTES } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { UtilsService } from '../../shared/utils.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdditionComponent', () => {
  let component: AdditionComponent;
  let fixture: ComponentFixture<AdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ MaterialModule,
        BrowserAnimationsModule, 
        FormsModule, 
        ReactiveFormsModule,
        RouterModule.forRoot([]) ],
      declarations: [ AdditionComponent ],
      providers: [UtilsService, {provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
