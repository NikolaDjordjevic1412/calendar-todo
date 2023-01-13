import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { DataManagerService } from 'src/app/data-manager/data-manager.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  description: string = '';
  date: string = '';
  constructor(private router: Router ,private manager: DataManagerService) {

  }

  ngOnInit(): void {

  }
  add() {
    if(this.date !== '' && this.description !== ''){
      this.manager.updateTodo({ title: this.description, start: this.date });
      this.description = '';
      this.router.navigate(['/dashboard'])
    }
  }
  back() {
    this.description = '';
    this.router.navigate(['/dashboard'])
  }
}
