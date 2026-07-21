import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

// Auth & Interceptor
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

// Features
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/products.component';
import { InventoryComponent } from './features/inventory/inventory/inventory.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { SupplierDialogComponent } from './features/suppliers/components/supplier-dialog/supplier-dialog.component';
import { SupplierDetailsDialogComponent } from './features/suppliers/components/supplier-details-dialog/supplier-details-dialog.component';
import { PurchaseOrdersComponent } from './features/purchase-orders/purchase-orders.component';
import { PoDialogComponent } from './features/purchase-orders/components/po-dialog/po-dialog.component';
import { PoDetailsDialogComponent } from './features/purchase-orders/components/po-details-dialog/po-details-dialog.component';
import { SalesOrdersComponent } from './features/sales-orders/sales-orders.component';
import { SoDetailsDialogComponent } from './features/sales-orders/components/so-details-dialog/so-details-dialog.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CustomerDialogComponent } from './features/customers/components/customer-dialog/customer-dialog.component';
import { CustomerDetailsDialogComponent } from './features/customers/components/customer-details-dialog/customer-details-dialog.component';
import { WarehousesComponent } from './features/warehouses/warehouses.component';
import { WarehouseDialogComponent } from './features/warehouses/components/warehouse-dialog/warehouse-dialog.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { ReorderComponent } from './features/reorder/reorder.component';
import { AlertsComponent } from './features/alerts/alerts.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { AiPredictionsComponent } from './features/ai-predictions/ai-predictions.component';
import { ReportsComponent } from './features/reports/reports.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';
import { ProductDialogComponent } from './features/products/components/product-dialog/product-dialog.component';
import { ProductDetailsDialogComponent } from './features/products/components/product-details-dialog/product-details-dialog.component';

// Shared Components
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StatCardComponent } from './shared/components/stat-card/stat-card.component';
import { StatusBadgeComponent } from './shared/components/status-badge/status-badge.component';
import { SummaryCardComponent } from './shared/components/summary-card/summary-card.component';
import { EmptyStateComponent } from './shared/components/empty-state/empty-state.component';
import { LoadingSkeletonComponent } from './shared/components/loading-skeleton/loading-skeleton.component';
import { ReusableTableComponent } from './shared/components/reusable-table/reusable-table.component';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FloatingAiChatComponent } from './core/components/floating-ai-chat/floating-ai-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    FloatingAiChatComponent,
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    InventoryComponent,
    SuppliersComponent,
    SupplierDialogComponent,
    SupplierDetailsDialogComponent,
    PurchaseOrdersComponent,
    PoDialogComponent,
    PoDetailsDialogComponent,
    SalesOrdersComponent,
    SoDetailsDialogComponent,
    CustomersComponent,
    CustomerDialogComponent,
    CustomerDetailsDialogComponent,
    WarehousesComponent,
    WarehouseDialogComponent,
    PricingComponent,
    ReorderComponent,
    AlertsComponent,
    AnalyticsComponent,
    AiPredictionsComponent,
    ReportsComponent,
    NotificationsComponent,
    ProfileComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    SearchBarComponent,
    NotFoundComponent,
    StatCardComponent,
    StatusBadgeComponent,
    SummaryCardComponent,
    EmptyStateComponent,
    LoadingSkeletonComponent,
    ReusableTableComponent,
    ProductDialogComponent,
    ProductDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Material Modules
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTooltipModule,

    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
