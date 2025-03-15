import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {timeRangeValidator} from '../../shared/custom-validator';

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
   isBooked = false;

   constructor() {
     this.openingHour = this.data?.Availability?.Open;
     this.closingHour = this.data?.Availability?.Close;
     this.bookingForm = new FormGroup({
       name: new FormControl(null, Validators.required),
       email: new FormControl(null, Validators.required),
       date: new FormControl(null, Validators.required),
       startTime: new FormControl(null, Validators.required),
       endTime: new FormControl(null, Validators.required)
     }, {validators: timeRangeValidator});
   }


  submitBooking() {
     console.log(this.bookingForm);
     if (this.bookingForm.invalid) {
       return;
     }
    this.isBooked = false;

    const booking = {
      id: crypto.randomUUID(),
      studioId: this.data.Id,
      studioName: this.data.Name,
      type: this.data.Type,
      location: `${this.data.Location.Area}, ${this.data.Location.City}`,
      name: this.bookingForm.value.name,
      email: this.bookingForm.value.email,
      date: this.bookingForm.value.date,
      startTime: this.bookingForm.value.startTime,
      endTime: this.bookingForm.value.endTime,
    };


    let bookings = []
    const bookingStorage = localStorage.getItem('bookings');
    if (bookingStorage) {
      bookings = JSON.parse(bookingStorage);
    }

    this.isBooked =  this.checkOverlappingTime(booking.date, booking.startTime, booking.endTime, bookings);
    if (this.isBooked) {
      return;
    }

    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    this.dialogRef.close({success: true, booking});
  }

  checkOverlappingTime(selectedDate, selectedStartTime, selectedEndTime, bookings) {
    selectedStartTime = new Date(selectedStartTime).getTime();
    selectedEndTime = new Date(selectedEndTime).getTime();

    // console.log('Selected start time ', selectedStartTime);
    // console.log('Selected end time ', selectedEndTime);

    const matchingDates = bookings.filter(booking =>
      new Date(booking.date).toDateString() === new Date(selectedDate).toDateString() );
    if (matchingDates.length > 0) {

      const studio = matchingDates.filter(booking => booking.studioId === this.data.Id);
      const isOverlapped = studio.some(booking => {
        // console.log('Booking start time ', new Date(booking.startTime).getTime())
        // console.log('Booking end time ', new Date(booking.endTime).getTime())
         return (selectedStartTime >= new Date(booking.startTime).getTime() && selectedStartTime < new Date(booking.endTime).getTime()) ||
           new Date(booking.startTime).getTime() > selectedStartTime  && new Date(booking.startTime).getTime() < selectedEndTime
      });
      return isOverlapped;
    }
    return false;
  }

}
