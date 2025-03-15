import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-list',
  standalone: false,
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  bookings= [];

  ngOnInit(){
    const bookingStorage = JSON.parse(localStorage.getItem('bookings'));
    if(bookingStorage){
      this.bookings = bookingStorage;
    }
  }
}
