import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {Todo} from "../authentication/types/todo.entity";
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DataManagerService implements OnInit{
  #dbTodoList: AngularFireList<any>;
  storage = '';
  constructor(
    protected _db: AngularFireDatabase,
  ) {
    this.#dbTodoList = _db.list('default');
  }
  ngOnInit(): void {
    this.storage = localStorage.getItem('token') || '';
    this.#dbTodoList = this._db.list(this.storage);
  }
  updateTodo(todo: any) {
    this.#dbTodoList.push(todo);
  }
  removeTodo( id: any ) {
    return this.#dbTodoList.remove( id );
  }
  loadTodos(): Observable<Todo[]> {
    this.storage = localStorage.getItem('token') || '';
    console.log(this.storage, 'storage')
    this.#dbTodoList = this._db.list(this.storage);
    return this.#dbTodoList.snapshotChanges()
      .pipe(
        map(changes => {
          console.log(changes , 'changes')
          return changes.map(record => new Todo(record.payload))
        }),
      )
  }
}
