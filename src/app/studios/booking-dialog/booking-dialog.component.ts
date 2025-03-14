import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-booking-dialog',
  standalone: false,
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.css'
})
export class BookingDialogComponent {
   dialogRef = inject(MatDialogRef<BookingDialogComponent>);
   data = inject(MAT_DIALOG_DATA);
   bookingForm = null;
   today= new Date();
   openingHour = '';
   closingHour = '';

   constructor() {
     this.openingHour = this.data?.Availability?.Open;
     this.closingHour = this.data?.Availability?.Close;
     this.bookingForm = new FormGroup({
       name: new FormControl(null, Validators.required),
       email: new FormControl(null, Validators.required),
       date: new FormControl(null, Validators.required),
       startTime: new FormControl(null, Validators.required),
       endTime: new FormControl(null, Validators.required)
     });
   }


  submitBooking() {
    console.log(this.bookingForm);
  }

  checkOperationalHours() {

  }
}
