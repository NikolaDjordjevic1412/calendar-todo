import {DataSnapshot} from "@angular/fire/compat/database/interfaces";

export class Todo {

  id?: string;
  start?: string;
  title?: string;

  constructor(payload: DataSnapshot) {
    const {key: id} = payload, {start , title} = payload.val();
    Object.assign(this, {id, start, title});
  }
}
