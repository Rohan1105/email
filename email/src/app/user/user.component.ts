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
  password: string = '';
  emailId: string = '';
  emailTitle : string = '';
  emailBody : string = '';
  to : string = '';
  sendDate : string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(userData => {
      console.log(userData);
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
}
