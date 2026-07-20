import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page"><h1>Dashboard</h1><p>Overview coming next.</p></div>`,
  styles: [`.page { padding: 32px; }`]
})
export class DashboardComponent {}