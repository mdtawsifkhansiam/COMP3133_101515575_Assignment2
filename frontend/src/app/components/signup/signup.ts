import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.html'
})
export class Signup {

  email = '';
  password = '';

  constructor(private router: Router) {}

  signup() {
    alert('Signup successful');
    this.router.navigate(['/']);
  }
}