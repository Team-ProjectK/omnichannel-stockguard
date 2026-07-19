import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignUp = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isDark = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkTheme().subscribe(dark => {
      this.isDark = dark;
    });

    this.loginForm = this.fb.group({
      email: ['admin@stockguard.com', [Validators.required, Validators.email]],
      password: ['admin123', Validators.required],
      rememberMe: [true]
    });

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleTab(signUp: boolean): void {
    this.isSignUp = signUp;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSignUp(): void {
    if (this.signupForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
