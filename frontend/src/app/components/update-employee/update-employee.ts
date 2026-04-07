import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './update-employee.html'
})
export class UpdateEmployee implements OnInit {
  empId = '';
  // Added display fields
  firstName = '';
  lastName = '';
  email = '';
  
  designation = '';
  department = '';
  salary: number = 0;
  selectedFile: File | null = null;

  constructor(
    private gql: GraphqlService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef // Added ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.empId = this.route.snapshot.paramMap.get('id') || '';
    if (this.empId) {
      this.gql.getEmployeeById(this.empId).subscribe((res: any) => {
        const emp = res.data?.getEmployeeById;
        if (emp) {
          this.firstName = emp.first_name;
          this.lastName = emp.last_name;
          this.email = emp.email;
          this.designation = emp.designation;
          this.department = emp.department;
          this.salary = emp.salary;
          this.cdr.detectChanges(); // Force UI update instantly
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  update(form: NgForm) {
    if (form.invalid) return;

    const updates = {
      designation: this.designation,
      department: this.department,
      salary: Number(this.salary)
    };

    this.gql.updateEmployee(this.empId, updates, this.selectedFile).subscribe({
      next: () => {
        alert("Updated Successfully!");
        this.router.navigate(['/employees']);
      },
      error: (err) => console.error("Update failed", err)
    });
  }
}