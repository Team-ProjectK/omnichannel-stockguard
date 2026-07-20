import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page"><h1>Alerts</h1><p>Low stock alerts coming next.</p></div>`,
  styles: [`.page { padding: 32px; }`]
})
export class AlertsComponent {}