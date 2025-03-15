import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudiosComponent} from './studios/studios.component';
import {BookingListComponent} from './booking-list/booking-list.component';
import {WildCardComponent} from './wild-card/wild-card.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'studios',
    pathMatch: 'full',
  },
  {
    path: 'studios',
    component: StudiosComponent,
  },
  {
    path: 'bookings',
    component: BookingListComponent,
  },
  {
    path: '**',
    component: WildCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
