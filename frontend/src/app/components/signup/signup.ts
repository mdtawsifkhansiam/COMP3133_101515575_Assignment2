import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html'
})
export class Signup {
  message: string = ''; // Used for professional UI feedback
  isError: boolean = false;

  constructor(private gql: GraphqlService, private router: Router) {}

  signup(form: NgForm) {
    if (form.invalid) return;

    this.gql.signup(form.value.username, form.value.email, form.value.password).subscribe({
      next: (res) => {
        if (res.errors) {
          this.isError = true;
          this.message = 'Error: ' + res.errors[0].message;
        } else {
          this.isError = false;
          this.message = 'Signup successful! Redirecting to login...';
          // Navigate after a short delay so user can see the success message
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      },
      error: (err) => {
        console.error(err);
        this.isError = true;
        this.message = 'Signup failed. Please try again later.';
      }
    });
  }
}