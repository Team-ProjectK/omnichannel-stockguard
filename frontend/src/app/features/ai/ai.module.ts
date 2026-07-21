import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AiRoutingModule } from './ai-routing.module';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { AiInventoryInsightsComponent } from './components/ai-inventory-insights/ai-inventory-insights.component';
import { AiReorderSuggestionsComponent } from './components/ai-reorder-suggestions/ai-reorder-suggestions.component';
import { AiPriceRecommendationsComponent } from './components/ai-price-recommendations/ai-price-recommendations.component';
import { AiDemandForecastComponent } from './components/ai-demand-forecast/ai-demand-forecast.component';

@NgModule({
  declarations: [
    AiChatComponent,
    AiInventoryInsightsComponent,
    AiReorderSuggestionsComponent,
    AiPriceRecommendationsComponent,
    AiDemandForecastComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AiRoutingModule
  ]
})
export class AiModule { }
