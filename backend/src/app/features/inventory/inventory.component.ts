import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page"><h1>Inventory</h1><p>Product table coming next.</p></div>`,
  styles: [`.page { padding: 32px; }`]
})
export class InventoryComponent {}