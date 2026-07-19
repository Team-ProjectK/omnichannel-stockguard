import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  generalForm!: FormGroup;
  reorderRulesForm!: FormGroup;
  apiForm!: FormGroup;

  apiKey = 'sk_live_9981240192830129380129';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      appName: ['Omnichannel StockGuard', Validators.required],
      currency: ['INR (₹)', Validators.required],
      timezone: ['Asia/Kolkata (IST)', Validators.required],
      language: ['English (US)', Validators.required]
    });

    this.reorderRulesForm = this.fb.group({
      safetyBufferPct: [15, [Validators.required, Validators.min(5), Validators.max(50)]],
      defaultLeadTimeDays: [7, [Validators.required, Validators.min(1)]],
      autoPoTriggerEnabled: [true],
      notifySupplierEmailOnPo: [true]
    });

    this.apiForm = this.fb.group({
      enableWebhooks: [true],
      webhookUrl: ['https://api.stockguard.com/v1/webhooks/inventory']
    });
  }

  saveGeneral(): void {
    if (this.generalForm.valid) {
      this.snackBar.open('General system settings updated!', 'Close', { duration: 3000 });
    }
  }

  saveReorderRules(): void {
    if (this.reorderRulesForm.valid) {
      this.snackBar.open('Reorder automation rules updated!', 'Close', { duration: 3000 });
    }
  }

  saveApiSettings(): void {
    if (this.apiForm.valid) {
      this.snackBar.open('API & Webhook configuration saved!', 'Close', { duration: 3000 });
    }
  }

  regenerateApiKey(): void {
    const rand = Math.random().toString(36).substring(2, 15);
    this.apiKey = `sk_live_${rand}${rand}`;
    this.snackBar.open('API key regenerated successfully!', 'Close', { duration: 3000 });
  }
}
