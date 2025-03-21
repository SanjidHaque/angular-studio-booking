import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs';
import {StudioService} from './studio.service';
import {MatDialog} from '@angular/material/dialog';
import {BookingDialogComponent} from './booking-dialog/booking-dialog.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-studios',
  standalone: false,
  templateUrl: './studios.component.html',
  styleUrl: './studios.component.css'
})
export class StudiosComponent {
  searchInput = new FormControl('');
  defaultRadius = 6000;
  isLocationDenied = false;

  userLocation = {lat: 0, lon: 0};
  studios = [];
  studiosRepo = [];
  isLoading = false;

  endPoint = 'https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json';

  constructor(private http: HttpClient,
              private datePipe: DatePipe,
              private studioService: StudioService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getUserLocation();
    this.isLoading = true;
    this.http.get(this.endPoint).subscribe((response: any) => {
      this.isLoading = false;
      this.studiosRepo = response['Studios'];
      this.studios = this.studiosRepo.slice();
    });

    this.searchInput.valueChanges.pipe(
      filter((data) => data.trim().length > 0 || data === ''),
      debounceTime(500),
    ).subscribe((value: any) => {
      this.search(value, this.defaultRadius)
    });
  }

  search(textInput, radius) {
    textInput = textInput.trim().toLowerCase();
    this.studios = this.studiosRepo.filter(
      data => data.Location.Area.toLowerCase().includes(textInput)
        || data.Location.City.toLowerCase().includes(textInput)
        || data.Location.Address.toLowerCase().includes(textInput)
    );

    let studioLatitude = 0;
    let studioLongitude = 0;
    let distance = 0
    this.studios = this.studios.filter(studio => {
      studioLatitude =  studio.Location?.Coordinates?.Latitude ?? 0;
      studioLongitude =  studio.Location?.Coordinates?.Longitude ?? 0;
      distance = this.studioService.getDistance(this.userLocation.lat, this.userLocation.lon, studioLatitude, studioLongitude);
      return distance <= radius;
    })
  }

  searchByRadius(radius) {
    this.defaultRadius = +radius.value;
    this.search(this.searchInput.value, +radius.value);
  }

  getUserLocation() {
    this.studioService.getCurrentLocation().subscribe({
      next: (location: { lat: number; lon: number  }) => {
        console.log(location);
        this.userLocation = Object.assign(location);
      },
      error: (error) => {
        this.isLocationDenied = true;
        alert(error.message);
      },
    })
  }

  bookStudio(studio) {
    const dialogRef = this.dialog.open(
      BookingDialogComponent,
      { data: studio, hasBackdrop: true, height: '650', width: '500px', autoFocus: false},
    );
    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      const date = this.datePipe.transform(result.booking.date, 'dd-MM-yyyy');
      const startTime = this.datePipe.transform(result.booking.startTime, 'hh:mm a');
      const endTime = this.datePipe.transform(result.booking.endTime, 'hh:mm a');
      const message = `Booking confirms at ${result.booking.studioName} on ${date} from ${startTime} to ${endTime}`;
      alert(message);
    });
  }
}
