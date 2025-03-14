import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

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
   openingHour = '';
   closingHour = '';

   constructor() {
     console.log(this.data);
     this.openingHour = this.data?.Availability?.Open;
     this.closingHour = this.data?.Availability?.Close;
     this.bookingForm = new FormGroup({
       name: new FormControl(null),
       email: new FormControl(null),
       date: new FormControl(null),
       startTime: new FormControl(null),
       endTime: new FormControl(null)
     });
   }


  submitBooking() {
    console.log(this.bookingForm);
  }

  checkOperationalHours() {

  }
}
