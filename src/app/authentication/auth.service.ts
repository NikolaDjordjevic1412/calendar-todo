import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  #dbTodoList: AngularFireList<any>;
  storage= '';

  constructor(
    protected _db: AngularFireDatabase,
    private fireauth: AngularFireAuth,
    private router: Router
  ) {
    this.#dbTodoList = _db.list('default');
  }
  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email,password).then((userCredential)=>{
      console.log('@@', userCredential)
      console.log('Successful')
      let parseEmail = email.substring(0, email.indexOf('@'))
      console.log(parseEmail , 'parseEmail')
      localStorage.setItem('token',parseEmail);

      this.router.navigate(['/dashboard']);
      return 'success';
    },
    err => {
      if(err.code == 'auth/user-not-found') {
        return 'user not found';
      }
      else if(err.code == 'auth/user-disabled') {
        return 'user disabled';
      }
      else {
        return 'something went wrong';
      }
    })
  }
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=> {
      console.log('Registration Successful')
      this.router.navigate(['/']);
      return;
    },
    err => {
      if(err.code == 'auth/user-not-found') {
        console.log('user not found');
      }
      else if(err.code == 'auth/user-disabled') {
        console.log('user disabled')
      }
      else {
        console.log('something went wrong')
      }
      return err.message;
    })
  }
  isLoggedIn() {
    this.fireauth.authState.subscribe(res => {
      if (res && res.uid) {
        // console.log(res, res.uid, 'user is logged in');
      }
      else {
        console.log('user not logged in');
        this.router.navigate(['/']);
      }
    });
  }

  logout() {
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    },
    err => {
      console.log(err.message);
    })
  }

}
