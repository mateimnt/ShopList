import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SpecificListComponent } from './specific-list/specific-list.component';
import { CrudService } from './service/crud.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'task/:id', component: SpecificListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SpecificListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
