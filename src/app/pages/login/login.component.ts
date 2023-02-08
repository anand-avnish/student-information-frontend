import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide=true;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async login(){
    let email=this.email.value;
    let pass=this.password.value;
    console.log(email)
    if (!email&&!pass) {
      return;
    }
    let details={
      username:email,
      password:pass
    }
    // this.loading = true;
    try {
      console.log(details);

      const det=await this.userService.login(details);
      console.log(det);
      if(det!=undefined) {
        this.userService.loggedIn();
        this.router.navigate(['/home']);
      }

    } catch (error) {
      const dialogRef = this.dialog.open(MessagePopupDialog, {
        data: {
          title: "Login Failed",
          message: "Wrong Credentials",
        },
        minWidth: '300px',
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPassMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.invalid ? 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character' : '';
  }

}
