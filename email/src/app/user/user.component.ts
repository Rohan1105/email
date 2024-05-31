import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { response } from 'express';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string = '';
  userName: string = '';
  userNameSignIn : string = '';
  password: string = '';
  passwordSignIn : string = '';
  emailId: string = '';
  emailTitle : string = '';
  emailBody : string = '';
  to : string = '';
  sendDate : string = '';
  allUserName : string = '';
  allPassword : string = '';
  history : any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(userData => {
      console.log(userData);
      for(var i=0;i<userData.length;i++){
        this.allUserName = userData[i]['userName'];
        this.allPassword = userData[i]['password'];
        this.history[this.allUserName] = this.allPassword;
      }
    });
    this.userService.getEmail().subscribe(emailData => {
      console.log(emailData);
    })
  }

  createUser(): void {
    this.userService.createUser(this.userId, this.userName, this.password).subscribe(response => {
      console.log(response);
    });
  }

  sendEmail(): void{
    this.userService.sendEmail(this.emailId,this.emailTitle,this.emailBody,this.to,this.sendDate).subscribe(response => {
      console.log(response);
    })
  }

  signIn():void{
    var flag = true;
    console.log(this.history);
    console.log(this.userNameSignIn);
    console.log(this.passwordSignIn);
    for(let key in this.history){
      if(this.userNameSignIn == key && this.passwordSignIn == this.history[key]){
        flag = true;
        console.log("Welcome");
        break;
      }
      else{
        flag = false;
      }
    }
    if(flag == false){
      console.log("User does not exist");
    }
  }
}
