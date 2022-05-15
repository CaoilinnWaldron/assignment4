import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private router: Router) { }

  // Process submitted data here
  onSubmit(): void {
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
  

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.router.navigate(['/tasks']);
      })
      .catch((error: { message: any; }) => {
        window.alert(error.message);
      });

    this.loginForm.reset();
  }

  ngOnInit(): void {
  }

}
