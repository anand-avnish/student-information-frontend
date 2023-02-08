import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin:boolean=false;

  constructor(
    public userService: UserService,
    private router: Router,
  ) {
    this.loggedin=userService.logged;
  }

  ngOnInit(){
    // this.userService.isLoggedIn();
    this.userService.isAuthenticatedObs.subscribe(val=>{
      this.loggedin=val;
      console.log(this.loggedin);
    });
  }

  async logout(){
    // console.log("In logout");
    await this.userService.logout();
    this.loggedin = false;
    this.router.navigate(['/signin']);
  }
}
