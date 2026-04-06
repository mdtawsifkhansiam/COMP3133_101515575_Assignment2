import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.html'
})
export class UpdateEmployee {

  firstName = '';
  lastName = '';

  update() {
    alert('Updated!');
  }
}