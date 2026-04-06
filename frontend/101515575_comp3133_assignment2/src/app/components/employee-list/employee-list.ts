import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './employee-list.html'
})
export class EmployeeList implements OnInit {

  employees: any[] = [];

  constructor(private gql: GraphqlService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
  this.gql.getAllEmployees().subscribe({
    next: (res: any) => {
      console.log("🔥 FULL RESPONSE:", JSON.stringify(res, null, 2));

      this.employees =
        res?.data?.getAllEmployees ||
        res?.data?.data?.getAllEmployees ||
        [];

      console.log("✅ EMPLOYEES:", this.employees);
    },
    error: (err) => {
      console.error("❌ ERROR:", err);
    }
  });
}

  delete(id: string) {
    this.gql.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}