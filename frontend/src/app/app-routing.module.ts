import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/products.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { ReorderComponent } from './features/reorder/reorder.component';
import { AlertsComponent } from './features/alerts/alerts.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { SettingsComponent } from './features/settings/settings.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'reorder', component: ReorderComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }