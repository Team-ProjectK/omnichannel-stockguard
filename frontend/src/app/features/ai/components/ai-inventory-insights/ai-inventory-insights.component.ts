import { Component, OnInit } from '@angular/core';
import { AiService, InventoryInsight } from '../../services/ai.service';

@Component({
  selector: 'app-ai-inventory-insights',
  templateUrl: './ai-inventory-insights.component.html',
  styleUrls: ['./ai-inventory-insights.component.scss']
})
export class AiInventoryInsightsComponent implements OnInit {
  insights: InventoryInsight | null = null;
  isLoading = true;

  constructor(private aiService: AiService) {}

  ngOnInit(): void {
    this.fetchInsights();
  }

  fetchInsights(): void {
    this.isLoading = true;
    this.aiService.getInventoryInsights().subscribe({
      next: (res) => {
        this.insights = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
