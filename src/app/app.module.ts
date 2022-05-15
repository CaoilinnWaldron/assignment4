import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 1. Import the libs you need
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// 2. Add your credentials 
const firebaseConfig = {
  apiKey: "AIzaSyCBbkkKWV0qAqe6bowlfXi-92_yv1Zbp3M",
  authDomain: "myapplication-41bd5.firebaseapp.com",
  databaseURL: "https://myapplication-41bd5-default-rtdb.firebaseio.com",
  projectId: "myapplication-41bd5",
  storageBucket: "myapplication-41bd5.appspot.com",
  messagingSenderId: "822028331104",
  appId: "1:822028331104:web:2bb94315db66a3b54e7b05",
  measurementId: "G-TPN3GMCZ4F"
};


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TasksComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // 3. Initialize
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule, // storage
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'tasks', component: TasksComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
