import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfileService } from '../../core/services/user-profile.service';
import { ThemeService } from '../../core/services/theme.service';
import { UserProfile } from '../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  userProfile!: UserProfile;
  isDark = false;

  constructor(
    private fb: FormBuilder,
    private profileService: UserProfileService,
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userProfile = this.profileService.getProfile();
    this.isDark = this.themeService.currentThemeValue;

    this.themeService.isDarkTheme().subscribe(dark => {
      this.isDark = dark;
    });

    this.profileForm = this.fb.group({
      fullName: [this.userProfile.fullName, Validators.required],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phone: [this.userProfile.phone, Validators.required],
      role: [this.userProfile.role, Validators.required],
      department: [this.userProfile.department, Validators.required],
      emailNotifications: [this.userProfile.emailNotifications],
      lowStockAlerts: [this.userProfile.lowStockAlerts],
      orderUpdates: [this.userProfile.orderUpdates],
      weeklySummary: [this.userProfile.weeklySummary],
      darkThemeToggle: [this.isDark],
      compactMode: [this.userProfile.compactMode]
    });
  }

  toggleDarkTheme(isDark: boolean): void {
    this.themeService.setDarkTheme(isDark);
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updated: UserProfile = {
        ...this.userProfile,
        ...this.profileForm.value,
        theme: this.isDark ? 'dark' : 'light'
      };
      this.userProfile = updated;
      this.profileService.saveProfile(updated);
      this.snackBar.open('Profile details updated successfully!', 'Close', { duration: 3000 });
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      const val = this.passwordForm.value;
      if (val.newPassword !== val.confirmPassword) {
        this.snackBar.open('New password and confirm password do not match!', 'Close', { duration: 3000 });
        return;
      }
      this.passwordForm.reset();
      this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
    }
  }
}
