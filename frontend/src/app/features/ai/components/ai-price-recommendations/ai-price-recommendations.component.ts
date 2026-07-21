import { Component, OnInit } from '@angular/core';
import { AiService, PriceRecommendation } from '../../services/ai.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ai-price-recommendations',
  templateUrl: './ai-price-recommendations.component.html',
  styleUrls: ['./ai-price-recommendations.component.scss']
})
export class AiPriceRecommendationsComponent implements OnInit {
  recommendations: PriceRecommendation | null = null;
  isLoading = true;

  constructor(
    private aiService: AiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchPriceRecommendations();
  }

  fetchPriceRecommendations(): void {
    this.isLoading = true;
    this.aiService.getPriceRecommendations().subscribe({
      next: (res) => {
        this.recommendations = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyPriceChange(item: any): void {
    this.snackBar.open(`Applied AI price adjustment for ${item.sku} to ₹${item.suggestedPrice}`, 'Close', { duration: 3000 });
  }
}
