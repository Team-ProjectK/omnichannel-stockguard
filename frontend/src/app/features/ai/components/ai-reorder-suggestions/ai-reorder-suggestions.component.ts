import { Component, OnInit } from '@angular/core';
import { AiService, ReorderSuggestion } from '../../services/ai.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ai-reorder-suggestions',
  templateUrl: './ai-reorder-suggestions.component.html',
  styleUrls: ['./ai-reorder-suggestions.component.scss']
})
export class AiReorderSuggestionsComponent implements OnInit {
  suggestions: ReorderSuggestion | null = null;
  isLoading = true;

  constructor(
    private aiService: AiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchReorderSuggestions();
  }

  fetchReorderSuggestions(): void {
    this.isLoading = true;
    this.aiService.getReorderSuggestions().subscribe({
      next: (res) => {
        this.suggestions = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  triggerQuickReorder(item: any): void {
    this.snackBar.open(`Reorder purchase draft created for SKU ${item.sku} (${item.recommendedQuantity} units)`, 'Close', { duration: 3500 });
  }
}
