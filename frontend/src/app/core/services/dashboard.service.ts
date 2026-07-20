import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { InventoryService } from './inventory.service';
import { AlertService } from './alert.service';

export interface DashboardMetrics {
  totalProducts: number;
  totalInventoryItems: number;
  lowStockCount: number;
  totalAvailableStock: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private productService: ProductService,
    private inventoryService: InventoryService,
    private alertService: AlertService
  ) { }

  getMetrics(): Observable<DashboardMetrics> {
    return forkJoin({
      products: this.productService.getProducts(),
      inventory: this.inventoryService.getInventory(),
      alerts: this.alertService.getLowStockAlerts()
    }).pipe(
      map(res => ({
        totalProducts: res.products?.length || 0,
        totalInventoryItems: res.inventory?.length || 0,
        lowStockCount: res.alerts?.length || 0,
        totalAvailableStock: (res.inventory || []).reduce((acc, curr) => acc + (curr.availableStock || 0), 0)
      }))
    );
  }
}
