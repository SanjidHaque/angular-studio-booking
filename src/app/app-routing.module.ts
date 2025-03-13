import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {StudiosComponent} from './studios/studios.component';

const routes: Routes = [
  {
    path: '',
    component: StudiosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
