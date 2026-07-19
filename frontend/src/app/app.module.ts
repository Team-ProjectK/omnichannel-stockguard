import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/products.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { PricingComponent } from './features/pricing/pricing.component';
import { ReorderComponent } from './features/reorder/reorder.component';
import { AlertsComponent } from './features/alerts/alerts.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SettingsComponent } from './features/settings/settings.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { StatCardComponent } from './shared/components/stat-card/stat-card.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    MainLayoutComponent,
    DashboardComponent,
    ProductsComponent,
    InventoryComponent,
    PricingComponent,
    ReorderComponent,
    AlertsComponent,
    AnalyticsComponent,
    LoginComponent,
    SettingsComponent,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent,
    SearchBarComponent,
    NotFoundComponent,
    StatCardComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
FormsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatTableModule,
  NgChartsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
