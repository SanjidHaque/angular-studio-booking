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
    this.bookings = JSON.parse(localStorage.getItem('bookings'));
    console.log(this.bookings);
  }
}
