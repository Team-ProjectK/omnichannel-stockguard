import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse, RegisterRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  roles = [
    { value: 'EMPLOYEE', label: 'Employee / Staff' },
    { value: 'MANAGER', label: 'Store Manager' },
    { value: 'ADMIN', label: 'System Administrator' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['EMPLOYEE', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const val = this.registerForm.value;
    const req: RegisterRequest = {
      name: val.name,
      email: val.email,
      password: val.password,
      role: val.role
    };

    this.authService.register(req).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;
        this.snackBar.open(`Account created successfully for ${res.name}! Please sign in.`, 'Close', { duration: 4000 });
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Registration error details:', err);
        const msg = err.error?.message || err.error?.error || 'Registration failed. Please try again.';
        this.snackBar.open(msg, 'Close', { duration: 5000 });
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
