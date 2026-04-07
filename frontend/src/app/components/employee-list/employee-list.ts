import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './employee-list.html'
})
export class EmployeeList implements OnInit {
  employees: any[] = [];
  searchDept = '';
  searchDesig = '';

  constructor(
    private gql: GraphqlService, 
    private auth: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef // 2. Injected it here
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.gql.getAllEmployees().subscribe((res: any) => {
      this.employees = res?.data?.getAllEmployees || [];
      this.cdr.detectChanges(); // 3. Forces Angular to update the screen instantly!
    });
  }

  search() {
    this.gql.searchEmployee(this.searchDesig, this.searchDept).subscribe((res: any) => {
      this.employees = res?.data?.searchEmployee || [];
      this.cdr.detectChanges(); // 4. Forces instant update for search results too
    });
  }

  resetSearch() {
    this.searchDept = '';
    this.searchDesig = '';
    this.loadEmployees();
  }

  delete(id: string) {
  if (confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
    this.gql.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}