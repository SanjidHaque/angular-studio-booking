import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudiosComponent } from './studios/studios.component';
import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { BookingDialogComponent } from './studios/booking-dialog/booking-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';

import {provideNativeDateAdapter} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import { BookingListComponent } from './booking-list/booking-list.component';


@NgModule({
  declarations: [
    AppComponent,
    StudiosComponent,
    BookingDialogComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTimepickerModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideNativeDateAdapter(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
