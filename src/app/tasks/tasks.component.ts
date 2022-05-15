import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public show: boolean = false;
  public buttonName: any = 'Create Task';

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private formBuilder: FormBuilder, private db: AngularFireDatabase) { }

  task: "My Tasks" = "My Tasks";
  selectedTask?: any;

  allKeys: any[] = [];
  allValues: any[] = [];

  newTaskForm = this.formBuilder.group({
    title: '',
    priority: '',
    completion: '',
    content: ''
  });

  ngOnInit(): void {
    this.allKeys = [];
    this.allValues = [];
    this.getTasks();
  }

  logout() {
    this.angularFireAuth.signOut();
    this.router.navigate(['/']);
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      // Change the button name
      this.buttonName = "Hide Create Task";
    } else {
      // Change the button name
      this.buttonName = "Create Task";
    }
  }

  createTask() {

    this.allKeys = [];
    this.allValues = [];

    // Task has been submitted get input
    let title = this.newTaskForm.controls['title'].value;
    let priority = this.newTaskForm.controls['priority'].value;
    let completion = this.newTaskForm.controls['completion'].value;
    let content = this.newTaskForm.controls['content'].value;

    // Add to database

    // get logged in users Id
    this.angularFireAuth.currentUser.then(data => {
      if (data != null) {
        let creator = data.uid.toString();
        const task = { Title: title, Priority: priority, CompletionDate: completion, Content: content, Creator: creator };
        this.db.list("/tasks").push(task);
        window.alert('Your task has been successfully added!');
        this.toggle();
      }
    });

  }

  // TODO: • Assign others to a task • Get alerts about incomplete tasks 

  // See if task is complete
  isComplete(date: any) {
    var d = new Date(date);
    var today = new Date();
    return d < today;
  }

  // get all the users tasks
  getTasks() {

    this.allKeys = [];
    this.allValues = [];

    // information received from database comes in as unknown 
    // so assign type note or key to be able to check its value before saving to array
    type Note = {
      Title: string;
      Priority: string;
      Completion: string;
      Content: string;
      Creator: string
    }

    type Key = { key: string }

    this.angularFireAuth.currentUser.then(data => {
      if (data != null) {
        var user = data.uid.toString();

        //Get all the users tasks
        var dbRef = this.db.list('tasks');
        dbRef.snapshotChanges()
          .subscribe(records => {
            records.forEach(record => {
              this.db.object('tasks/' + record.key).valueChanges().subscribe(val => {

                var value: Note = val as Note;
                if (value.Creator == user) {
                  var ID: Key = record.key as unknown as Key;
                  this.allValues.push(value);
                  this.allKeys.push(ID);
                }

              });
            });
          });
      }

    });

  }

  // Select Task
  onSelect(index: any): void {
    this.selectedTask = this.allValues[index];

  }

  // Delete Task
  onDelete(task: any): void {
    let index = this.allValues.indexOf(task);
    let key = this.allKeys[index];
    const delRef = this.db.object('tasks/' + key);
    delRef.remove();
    this.allKeys = [];
    this.allValues = [];
    this.selectedTask = null;
  }

  // Stop seeing selected task
  onBack() {
    this.selectedTask = null;
  }

  // Save Task
  onSave(task: any): void {
    this.onBack();
    var index = this.allValues.indexOf(task);
    var key = this.allKeys[index];
    this.allKeys = [];
    this.allValues = [];
    this.db.object('tasks/' + key).set({ Title: task.Title, Priority: task.Priority, CompletionDate: task.CompletionDate, Content: task.Content, Creator: task.Creator });
    this.reloadCurrentRoute();

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


}
