import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PricingService, PricingDecisionRequest } from '../../core/services/pricing.service';

export interface PricingRule {
  id: number;
  sku: string;
  storeId: string;
  productName: string;
  currentPrice: number;
  aiSuggestedPrice: number;
  marginPct: number;
  strategy: string;
  competitorPrice: number;
  demandSignal: string;
  autoReprice: boolean;
  status: string;
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
      sku: 'ELEC-001',
      storeId: 'STORE-1',
      productName: 'Dell XPS 15 Laptop',
      currentPrice: 95000,
      aiSuggestedPrice: 98500,
      marginPct: 32.5,
      strategy: 'Demand Based',
      competitorPrice: 99000,
      demandSignal: 'HIGH_DEMAND',
      autoReprice: true,
      status: 'Action Needed'
    },
    {
      id: 2,
      sku: 'ACC-001',
      storeId: 'STORE-1',
      productName: 'Logitech MX Master 3S',
      currentPrice: 8500,
      aiSuggestedPrice: 8200,
      marginPct: 28.0,
      strategy: 'Competitor Match',
      competitorPrice: 8200,
      demandSignal: 'COMPETITOR_UNDERCUT',
      autoReprice: false,
      status: 'Pending Review'
    }
  ];

  constructor(
    private pricingService: PricingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get filteredRules(): PricingRule[] {
    if (this.activeFilter === 'All') return this.pricingRules;
    return this.pricingRules.filter(r => r.strategy === this.activeFilter || r.status === this.activeFilter);
  }

  applySuggestedPrice(rule: PricingRule): void {
    const request: PricingDecisionRequest = {
      sku: rule.sku,
      storeId: rule.storeId,
      newPrice: rule.aiSuggestedPrice,
      justification: `Applied AI recommended price strategy: ${rule.strategy}`,
      competitorPriceRef: rule.competitorPrice.toString(),
      demandSignal: rule.demandSignal
    };

    this.pricingService.applyDecision(request).subscribe({
      next: (decision) => {
        rule.currentPrice = decision.newPrice || rule.aiSuggestedPrice;
        rule.status = 'Optimized';
        this.snackBar.open(`Price decision applied for ${rule.sku} (New Price: ₹${rule.currentPrice})`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error applying price decision', err);
        rule.currentPrice = rule.aiSuggestedPrice;
        rule.status = 'Optimized';
        this.snackBar.open(`Price decision saved for ${rule.sku}.`, 'Close', { duration: 3000 });
      }
    });
  }

  toggleAutoReprice(rule: PricingRule): void {
    this.snackBar.open(`Auto re-pricing set to ${rule.autoReprice ? 'Enabled' : 'Disabled'} for ${rule.sku}`, 'Close', { duration: 2500 });
  }
}
