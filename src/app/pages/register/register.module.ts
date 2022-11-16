import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MessagePopupDialog } from './message-popup/message-popup-dialog';
// import { MessagePopupDialog } from './message-popup/message-popup-dialog';

const route = [
  { path: '', component: RegisterComponent },
];

@NgModule({
  entryComponents: [
    MessagePopupDialog
  ],
  declarations: [
    RegisterComponent,
    MessagePopupDialog
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    RouterModule.forChild(route)
  ]
})
export class RegisterModule { }
