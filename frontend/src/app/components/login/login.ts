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

  constructor(
    private gql: GraphqlService, 
    private auth: AuthService, 
    private router: Router
  ) {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.gql.login(form.value.email, form.value.password).subscribe({
      next: (res) => {
        if (res.data?.login?.token) {
          this.auth.setToken(res.data.login.token);
          this.router.navigate(['/employees']);
        } else {
          alert('Invalid login. Please check credentials.');
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.message || 'Login failed.');
      }
    });
  }
}