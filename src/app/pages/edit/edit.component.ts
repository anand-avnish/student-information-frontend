import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  student;
  studentForm=this.fb.group({
    name: ['', [Validators.required]],
    usn: ['', [Validators.required]],
    sem: ['', [Validators.required, Validators.min(1),Validators.max(8)]],
    dob:['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')]],
    college:['', [Validators.required]],
    address:['', [Validators.required]]
  })

  constructor(
    private studentService: StudentService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(){
    this.student=await this.studentService.getDetails();
    console.log(this.student);
    this.setValue();
  }

  async setValue(){
    if(this.student!==null){
      this.studentForm.get('name')?.setValue(this.student.name);
      this.studentForm.get('usn')?.setValue(this.student.usn);
      this.studentForm.get('sem')?.setValue(this.student.sem);
      this.studentForm.get('dob')?.setValue(this.student.dob);
      this.studentForm.get('email')?.setValue(this.student.email);
      this.studentForm.get('phone')?.setValue(this.student.phone);
      this.studentForm.get('college')?.setValue(this.student.college);
      this.studentForm.get('address')?.setValue(this.student.address);
    }
  }

  async save(){
    // this.loading = true;
    const value = {...this.studentForm.value};
    let backendValue: any ={
      student:value
    };
    // if(value){
    //   backendValue = value;
    //   console.log('Updated backend value');
    // }
    console.log("======================Query Values===================")
    console.log(backendValue);
    if(!this.studentForm.invalid){
      try {
        const resp = await this.studentService.editStudent(backendValue,this.student._id);
        console.log(resp);
        this.router.navigate(['/home']);
      } catch (error) {
        let dialog = this.dialog.open(MessagePopupDialog, {
          data: {
              title: "Unable to update!",
              message: "Server Error"
          },
          width: '400px',
          hasBackdrop: true
        });
        // this.loading = false;
        console.log("=================error====================")
        console.log(error);
      }
    }else{
      let dialog = this.dialog.open(MessagePopupDialog, {
        data: {
            title: "Unable to register!",
            message: `Enter all the required(*) field before submitting.`
        },
        width: '400px',
        hasBackdrop: true
      });
      console.log('No Values');
    }
  }

}
