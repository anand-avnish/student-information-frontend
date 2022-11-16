import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')]);
  hide=true;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async register(){
    // console.log(value)
    let email=this.email.value;
    let pass=this.password.value;
    if (!email&&!pass) {
      return;
    }
    // this.loading = true;
    this.userService.login(email, pass).subscribe(async (data)=>{
      // console.log(data);
      // this.isAccepted = data['isAccepted'];
      if(data['message']=='authenticated'){
        localStorage.setItem("user_token", data['token']);
        localStorage.setItem("name", data['name']);
        localStorage.setItem("type", data['user_type']);
        this.userService.setToken(data['token']);
        const typeArr = data['user_type'];
        this.router.navigate(['/home']);
      }
    },(error)=>{
      // this.loading = false;
      const dialogRef = this.dialog.open(MessagePopupDialog, {
        data: {
          title: "Login Failed",
          message: error.error.message,
        },
        minWidth: '300px',
      });
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getNameMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

  getPassMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.invalid ? 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character' : '';
  }

}
