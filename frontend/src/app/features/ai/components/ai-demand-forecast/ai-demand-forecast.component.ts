import { Component, OnInit } from '@angular/core';
import { AiService, DemandForecast } from '../../services/ai.service';

@Component({
  selector: 'app-ai-demand-forecast',
  templateUrl: './ai-demand-forecast.component.html',
  styleUrls: ['./ai-demand-forecast.component.scss']
})
export class AiDemandForecastComponent implements OnInit {
  forecastData: DemandForecast | null = null;
  isLoading = true;

  constructor(private aiService: AiService) {}

  ngOnInit(): void {
    this.fetchDemandForecast();
  }

  fetchDemandForecast(): void {
    this.isLoading = true;
    this.aiService.getDemandForecast().subscribe({
      next: (res) => {
        this.forecastData = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
