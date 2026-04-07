import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html'
})
export class Login {
  message: string = ''; // Used for professional UI feedback
  isError: boolean = false;

  constructor(
    private gql: GraphqlService, 
    private auth: AuthService, 
    private router: Router
  ) {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.gql.login(form.value.email, form.value.password).subscribe({
      next: (res) => {
        // Checking for GraphQL errors or missing token
        if (res.errors || !res.data?.login?.token) {
          this.isError = true;
          this.message = res.errors ? res.errors[0].message : 'Invalid email or password.';
        } else {
          this.isError = false;
          this.message = 'Login successful! Redirecting...';
          this.auth.setToken(res.data.login.token);
          
          // Small delay so user can see the success message
          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 1500);
        }
      },
      error: (err) => {
        console.error(err);
        this.isError = true;
        this.message = 'Login failed. Please check your connection.';
      }
    });
  }
}