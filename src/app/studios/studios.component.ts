import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs';

@Component({
  selector: 'app-studios',
  standalone: false,
  templateUrl: './studios.component.html',
  styleUrl: './studios.component.css'
})
export class StudiosComponent {
  searchInput = new FormControl('');


  studios = [];
  studiosRepo = [];

  endPoint = 'https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.endPoint).subscribe((response: any) => {
      this.studiosRepo = response['Studios'];
      this.studios = this.studiosRepo.slice();
    });

    this.searchInput.valueChanges.pipe(
      filter((data) => data.trim().length > 0 || data === ''),
      debounceTime(500),
    ).subscribe((value: any) => {
      if (value === '') {
        this.studios = this.studiosRepo.slice();
        return;
      }
      this.studios = this.studiosRepo.filter(data => data.Location.Area.toLowerCase().includes(value.toLowerCase()));
    });
  }
}
