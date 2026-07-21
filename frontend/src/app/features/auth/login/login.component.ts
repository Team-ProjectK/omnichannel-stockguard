import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const val = this.loginForm.value;

    this.authService.login(val).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;
        this.snackBar.open(`Welcome back, ${res.name}! (${res.role})`, 'Close', { duration: 3000 });
        this.router.navigate([this.returnUrl]);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Login error details:', err);
        const msg = err.error?.message || err.error?.error || 'Invalid email or password.';
        this.snackBar.open(msg, 'Close', { duration: 5000 });
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
