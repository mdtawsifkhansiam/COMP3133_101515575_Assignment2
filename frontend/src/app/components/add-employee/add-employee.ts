import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-employee.html'
})
export class AddEmployee {
  selectedFile: File | null = null;

  constructor(private gql: GraphqlService, private router: Router) {}

  // Fixes the "Property 'onFileSelected' does not exist" error
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Fixes the "Expected 0 arguments, but got 1" error
  add(form: NgForm) {
    if (form.invalid) return;

    const emp = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      designation: form.value.designation,
      salary: Number(form.value.salary),
      date_of_joining: form.value.date_of_joining,
      department: form.value.department
    };

    this.gql.addEmployee(emp, this.selectedFile).subscribe({
      next: (res: any) => {
        // This catches the silent errors from the database!
        if (res.errors) {
          alert("Database Error: " + res.errors[0].message);
          console.error("GraphQL Error:", res.errors);
        } else {
          alert("Employee Added Successfully!");
          this.router.navigate(['/employees']);
        }
      },
      error: (err) => {
        console.error("Error adding employee:", err);
        alert("Failed to add employee");
      }
    });
  }
}