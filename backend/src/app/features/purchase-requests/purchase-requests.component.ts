import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-requests',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page"><h1>Purchase Requests</h1><p>Reorder list coming next.</p></div>`,
  styles: [`.page { padding: 32px; }`]
})
export class PurchaseRequestsComponent {}