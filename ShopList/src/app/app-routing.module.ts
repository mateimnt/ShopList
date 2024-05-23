import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SpecificListComponent } from './specific-list/specific-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'task/:id', component: SpecificListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
