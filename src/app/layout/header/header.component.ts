import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin=false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(){
  }

  async logout(){
    // console.log("In logout");
    await this.userService.logout();
    this.loggedin = false;
    this.router.navigate(['/signin']);
  }
}
