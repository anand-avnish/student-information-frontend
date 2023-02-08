import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  student;

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) { }

  async ngOnInit(){

    this.student=await this.studentService.getDetails();
    console.log(this.student);
  }

}
