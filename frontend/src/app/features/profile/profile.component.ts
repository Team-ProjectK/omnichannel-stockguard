import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfileService } from '../../core/services/user-profile.service';
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

  constructor(
    private fb: FormBuilder,
    private profileService: UserProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userProfile = this.profileService.getProfile();

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
      theme: [this.userProfile.theme],
      compactMode: [this.userProfile.compactMode]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updated: UserProfile = {
        ...this.userProfile,
        ...this.profileForm.value
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
