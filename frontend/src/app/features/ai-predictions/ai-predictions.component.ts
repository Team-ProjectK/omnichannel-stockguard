import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AiPredictionService } from '../../core/services/ai-prediction.service';
import { DemandPrediction, PriceRecommendation } from '../../shared/models/ai-prediction';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-ai-predictions',
  templateUrl: './ai-predictions.component.html',
  styleUrls: ['./ai-predictions.component.scss']
})
export class AiPredictionsComponent implements OnInit {
  demandPredictions: DemandPrediction[] = [];
  priceRecommendations: PriceRecommendation[] = [];

  // Chat UI state
  chatMessages: ChatMessage[] = [
    { sender: 'ai', text: 'Hello Vinay! I am StockGuard AI. Ask me about stock forecasts, optimal pricing, or reorder risks.', timestamp: 'Just now' }
  ];
  userQuery = '';

  // Demand Forecast Chart
  public demandChartType: ChartType = 'line';
  public demandChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5 (Pred)', 'Week 6 (Pred)'],
    datasets: [
      {
        data: [120, 135, 140, 160, 195, 220],
        label: 'Predicted Demand (Dell XPS 15)',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        data: [120, 135, 140, 160, null, null],
        label: 'Historical Sales',
        borderColor: '#16a34a',
        borderDash: [5, 5]
      }
    ]
  };

  // Price Elasticity Bar Chart
  public priceChartType: ChartType = 'bar';
  public priceChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Dell XPS 15', 'Logitech MX Master', 'Samsung 4K Monitor'],
    datasets: [
      { data: [65000, 8500, 28000], label: 'Current Price (₹)', backgroundColor: '#94a3b8' },
      { data: [68500, 7999, 29500], label: 'AI Recommended Price (₹)', backgroundColor: '#2563eb' }
    ]
  };

  constructor(
    private aiService: AiPredictionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.demandPredictions = this.aiService.getDemandPredictions();
    this.priceRecommendations = this.aiService.getPriceRecommendations();
  }

  sendChatMessage(): void {
    if (!this.userQuery.trim()) return;

    const query = this.userQuery.trim();
    this.chatMessages.push({
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    });
    this.userQuery = '';

    // Simulate AI delayed intelligent response
    setTimeout(() => {
      let aiReply = "Based on machine learning models, your Dell XPS 15 stock will deplete in 12 days. I recommend placing a purchase order for 30 units with TechSupply Global immediately.";
      if (query.toLowerCase().includes('price') || query.toLowerCase().includes('pricing')) {
        aiReply = "Optimizing prices: Reducing Logitech MX Master 3S price by 5.9% is projected to increase unit velocity by +18%, boosting revenue by 12.1%.";
      } else if (query.toLowerCase().includes('warehouse') || query.toLowerCase().includes('space')) {
        aiReply = "West Coast Depot (WH-B) is at 99% capacity. Consider re-balancing 300 units to East Hub (WH-C) to avoid fulfillment bottlenecks.";
      }
      this.chatMessages.push({
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now'
      });
    }, 800);
  }

  applyRecommendation(item: DemandPrediction): void {
    this.snackBar.open(`Reorder recommendation for ${item.productName} applied!`, 'Close', { duration: 3000 });
  }

  applyPrice(item: PriceRecommendation): void {
    this.snackBar.open(`Recommended price ₹${item.recommendedPrice} applied for ${item.productName}!`, 'Close', { duration: 3000 });
  }
}
