import { Component } from '@angular/core';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  templateUrl: './view-employee.html'
})
export class ViewEmployee {

  employee = {
    firstName: 'John',
    lastName: 'Doe'
  };
}