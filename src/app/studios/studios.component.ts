import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-studios',
  standalone: false,
  templateUrl: './studios.component.html',
  styleUrl: './studios.component.css'
})
export class StudiosComponent {
  studios = [];
  endPoint = 'https://gist.githubusercontent.com/rash3dul-islam/88e1565bea2dd1ff9180ff733617a565/raw/684afa147a8e726d7a5e4fdeb390f2d48b35051d/studio-mock-api,json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.endPoint).subscribe((response: any) => {
      this.studios = response['Studios'];
    });
  }
}
