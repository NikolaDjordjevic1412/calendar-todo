import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    ListTodoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FullCalendarModule,
    FormsModule

  ]
})
export class PublicModule { }
