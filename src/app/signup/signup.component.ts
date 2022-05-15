import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  onSubmit(): void {
    // Process submitted data here
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        window.alert('You have been successfully registered!');

        this.afAuth.currentUser.then(data => {
          if (data != null) {
            let uniqueId = data.uid.toString();
            const person =  { email: email, password: password, id: uniqueId };
            this.db.list("/users").push(person);
          } 
        });
                
      })
      .catch((error: { message: any; }) => {
        window.alert(error.message);
      });

    this.registerForm.reset();
  }  

  ngOnInit(): void {
  }

}
