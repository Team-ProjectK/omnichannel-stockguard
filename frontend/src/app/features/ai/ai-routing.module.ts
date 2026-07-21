import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { AiInventoryInsightsComponent } from './components/ai-inventory-insights/ai-inventory-insights.component';
import { AiReorderSuggestionsComponent } from './components/ai-reorder-suggestions/ai-reorder-suggestions.component';
import { AiPriceRecommendationsComponent } from './components/ai-price-recommendations/ai-price-recommendations.component';
import { AiDemandForecastComponent } from './components/ai-demand-forecast/ai-demand-forecast.component';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', component: AiChatComponent },
  { path: 'insights', component: AiInventoryInsightsComponent },
  { path: 'reorders', component: AiReorderSuggestionsComponent },
  { path: 'pricing', component: AiPriceRecommendationsComponent },
  { path: 'forecast', component: AiDemandForecastComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiRoutingModule { }
