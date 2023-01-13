import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { Routes , RouterModule } from '@angular/router';
import { RegistrationComponent } from 'src/app/private/registration/registration.component';
import { SettingsComponent } from 'src/app/public/settings/settings.component';
import { LoginComponent } from 'src/app/private/login/login.component';
import { DashboardComponent } from 'src/app/public/dashboard/dashboard.component';
import { ListTodoComponent } from 'src/app/public/list-todo/list-todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'registration',
    component: RegistrationComponent
  },
  {
    path:'settings',
    component: SettingsComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'list-todo',
    component: ListTodoComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrivateModule,
    PublicModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
