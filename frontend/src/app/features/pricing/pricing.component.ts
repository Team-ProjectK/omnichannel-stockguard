import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PricingRule {
  id: number;
  sku: string;
  productName: string;
  currentPrice: number;
  aiSuggestedPrice: number;
  marginPct: number;
  strategy: 'Demand Based' | 'Competitor Match' | 'Clearance' | 'Premium';
  autoReprice: boolean;
  status: 'Optimized' | 'Pending Review' | 'Action Needed';
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  activeFilter = 'All';

  pricingRules: PricingRule[] = [
    {
      id: 1,
      sku: 'ELE-LAP-001',
      productName: 'Dell XPS 15 Laptop',
      currentPrice: 95000,
      aiSuggestedPrice: 98500,
      marginPct: 32.5,
      strategy: 'Demand Based',
      autoReprice: true,
      status: 'Optimized'
    },
    {
      id: 2,
      sku: 'ACC-MOU-002',
      productName: 'Logitech MX Master 3S',
      currentPrice: 8500,
      aiSuggestedPrice: 8200,
      marginPct: 28.0,
      strategy: 'Competitor Match',
      autoReprice: true,
      status: 'Pending Review'
    },
    {
      id: 3,
      sku: 'ELE-MON-003',
      productName: 'Samsung 27" 4K Monitor',
      currentPrice: 28000,
      aiSuggestedPrice: 31500,
      marginPct: 40.2,
      strategy: 'Premium',
      autoReprice: false,
      status: 'Optimized'
    },
    {
      id: 4,
      sku: 'FUR-DES-005',
      productName: 'Ergonomic Standing Desk',
      currentPrice: 32000,
      aiSuggestedPrice: 29800,
      marginPct: 22.4,
      strategy: 'Clearance',
      autoReprice: false,
      status: 'Action Needed'
    }
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  get filteredRules(): PricingRule[] {
    if (this.activeFilter === 'All') return this.pricingRules;
    return this.pricingRules.filter(r => r.strategy === this.activeFilter || r.status === this.activeFilter);
  }

  applySuggestedPrice(rule: PricingRule): void {
    rule.currentPrice = rule.aiSuggestedPrice;
    rule.status = 'Optimized';
    this.snackBar.open(`Price updated for ${rule.productName} to ₹${rule.currentPrice.toLocaleString()}`, 'Close', { duration: 3000 });
  }

  toggleAutoReprice(rule: PricingRule): void {
    this.snackBar.open(`Automated repricing ${rule.autoReprice ? 'enabled' : 'disabled'} for ${rule.productName}`, 'Close', { duration: 2500 });
  }
}
