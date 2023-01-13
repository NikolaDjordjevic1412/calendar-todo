import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService , private router: Router) {
  }

  ngOnInit(): void {
  }

  registration() {
    if(this.email =='') {
      alert('Please enter email')
      return;
    }
    if(this.password =='') {
      alert('Please enter password')
      return;
    }
    this.auth.register(this.email , this.password);
    this.email= '';
    this.password= '';
  }
  goToLogin() {
    this.router.navigate(['/']);
  }
}
