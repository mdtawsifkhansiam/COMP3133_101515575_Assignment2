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

  constructor(private gql: GraphqlService, private router: Router) {}

  signup(form: NgForm) {
    if (form.invalid) return;

    this.gql.signup(form.value.username, form.value.email, form.value.password).subscribe({
      next: (res) => {
        if (res.errors) {
          alert('Error: ' + res.errors[0].message);
        } else {
          alert('Signup successful! Please log in.');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Signup failed. Check console for details.');
      }
    });
  }
}