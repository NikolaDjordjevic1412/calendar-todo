import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { DataManagerService } from 'src/app/data-manager/data-manager.service';

import { CalendarOptions , EventInput  } from '@fullcalendar/core';
import {Router} from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Todo} from "src/app/authentication/types/todo.entity";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allEvents: any = [];
  username: string = '';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin , interactionPlugin],
    initialView: 'dayGridMonth',
    editable: false,
    weekends: true,
    selectable: true
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private manager: DataManagerService) {

  }
  ngOnInit(): void {
    this.username = localStorage.getItem('token') || '';
    this.manager.loadTodos().subscribe((todos: Todo[]) => {
      todos.map(value => {
        this.allEvents.push({color:'transparent', textColor:'black', id: value.id ,title: value.title, start: value.start , editable:true})
      })
      this.calendarOptions = {
        plugins: [dayGridPlugin , interactionPlugin],
        initialView: 'dayGridMonth',
        editable: false,
        weekends: true,
        selectable: true,
        eventClick: this.eventClick.bind(this),
        events: this.allEvents,
      };
    });
    this.auth.isLoggedIn();
    this.manager.loadTodos();
  }

  eventClick(arg: any) {
    this.manager.removeTodo(arg.event.id).then(
      ()=>{
        arg.event.remove()
      },err => {
        console.log('error')
      })
  }
  addEvent(){
    this.router.navigate(['/list-todo']);
  }
  logout() {
    this.auth.logout();
  }
}
