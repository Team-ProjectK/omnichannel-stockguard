import { Injectable } from '@angular/core';
import { UserProfile } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private storageKey = 'stockguard_user_profile';

  private defaultProfile: UserProfile = {
    id: 1,
    fullName: 'Vinay Administrator',
    email: 'vinay.admin@stockguard.com',
    phone: '+1 (555) 019-2831',
    role: 'System Administrator',
    department: 'Supply Chain & Operations',
    avatarUrl: 'V',
    emailNotifications: true,
    lowStockAlerts: true,
    orderUpdates: true,
    weeklySummary: false,
    theme: 'light',
    compactMode: false
  };

  getProfile(): UserProfile {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as UserProfile;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaultProfile));
    return { ...this.defaultProfile };
  }

  saveProfile(profile: UserProfile): void {
    localStorage.setItem(this.storageKey, JSON.stringify(profile));
  }
}
