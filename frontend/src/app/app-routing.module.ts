import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/products.component';
import { InventoryComponent } from './features/inventory/inventory/inventory.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { PurchaseOrdersComponent } from './features/purchase-orders/purchase-orders.component';
import { SalesOrdersComponent } from './features/sales-orders/sales-orders.component';
import { CustomersComponent } from './features/customers/customers.component';
import { WarehousesComponent } from './features/warehouses/warehouses.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { ReorderComponent } from './features/reorder/reorder.component';
import { AlertsComponent } from './features/alerts/alerts.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { AiPredictionsComponent } from './features/ai-predictions/ai-predictions.component';
import { ReportsComponent } from './features/reports/reports.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'purchase-orders', component: PurchaseOrdersComponent },
  { path: 'sales-orders', component: SalesOrdersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'reorder', component: ReorderComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'ai-predictions', component: AiPredictionsComponent },
  { path: 'ai-dashboard', component: AiPredictionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }