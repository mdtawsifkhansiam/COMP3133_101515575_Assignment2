import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.html'
})
export class AddEmployee {

  first_name = '';
  last_name = '';
  email = '';
  designation = '';
  salary: any = '';
  date_of_joining = '';
  department = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  add() {
    const emp = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      designation: this.designation,
      salary: Number(this.salary),
      date_of_joining: this.date_of_joining,
      department: this.department
    };

    this.gql.addEmployee(emp).subscribe({
      next: () => {
        alert("Added!");
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        alert("Error");
      }
    });
  }
}