import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService],
})
export class SignUpComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessage: string;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(public userService: UserService) {
    //Check through private will it be only accessible to only this component :- its actually accessible only in sign-up.ts
  }

  ngOnInit(): void {}

  onSubmit(Form: NgForm) {
    this.userService.postUser(Form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 4000);
        this.resetForm(Form)
      },
      (err) => {
        if (err.status === 422) {                 //422 is validation error
          this.serverErrorMessage = err.error.join('<br/>');
        }
      }
    );
  }

  resetForm(Form:NgForm){
    this.userService.selectedUser = {
      fullName : '',
      email : '',
      password : ''
    };
    Form.resetForm();
    this.serverErrorMessage = '';
  }
}
