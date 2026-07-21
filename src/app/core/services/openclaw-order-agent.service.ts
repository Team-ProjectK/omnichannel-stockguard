import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface WholesaleOrderDocument {
  poNumber: string;
  sku: string;
  productName: string;
  quantityOrdered: number;
  unitWholesalePrice: number;
  totalOrderCost: number;
  supplierId: string;
  supplierName: string;
  warehouseSource: string;
  status: 'DRAFTED' | 'UPDATED' | 'TRANSMITTED' | 'APPROVED';
  agentSignature: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
  triggerEvent: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpenClawOrderAgentService {
  private readonly agentSignature = 'OpenClaw Wholesale Logistics Autonomous Agent (v4.0)';

  private supplierMap: { [category: string]: { id: string; name: string; warehouse: string } } = {
    'Dairy': { id: 'SUPP-DAIRY-01', name: 'FreshDairy National Wholesale Co.', warehouse: 'North Regional Cold Hub (WH-02)' },
    'Grocery': { id: 'SUPP-GROC-05', name: 'Grain & Staples Global Logistics', warehouse: 'Central Metro Fulfillment Center (WH-01)' },
    'Beverages': { id: 'SUPP-BEV-03', name: 'Metro Beverage & Distributing', warehouse: 'East Logistics Park (WH-04)' },
    'Bakery': { id: 'SUPP-BAKE-02', name: 'Artisan Milling & Bakery Supply', warehouse: 'West Industrial Depot (WH-03)' },
    'Personal Care': { id: 'SUPP-CARE-08', name: 'AeroCare Consumer Goods Wholesale', warehouse: 'Central Metro Fulfillment Center (WH-01)' }
  };

  /**
   * OpenClaw Autonomous Agent method to construct and update wholesale ordering documents
   * when inventory drops below threshold or demand spikes are detected.
   */
  generateWholesaleOrder(
    product: Product,
    suggestedQty: number,
    triggerReason: string = 'Stock Level Below Threshold'
  ): WholesaleOrderDocument {
    const suppInfo = this.supplierMap[product.category] || {
      id: 'SUPP-GEN-99',
      name: 'General Wholesale Distributors Ltd',
      warehouse: 'Central Metro Fulfillment Center (WH-01)'
    };

    const wholesalePrice = Math.round((product.basePrice * 0.70) * 10) / 10;
    const quantity = Math.max(50, suggestedQty);
    const totalCost = Math.round(quantity * wholesalePrice);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const poNumber = `PO-OPENCLAW-${product.sku}-${randomSuffix}`;

    return {
      poNumber,
      sku: product.sku,
      productName: product.productName,
      quantityOrdered: quantity,
      unitWholesalePrice: wholesalePrice,
      totalOrderCost: totalCost,
      supplierId: suppInfo.id,
      supplierName: suppInfo.name,
      warehouseSource: suppInfo.warehouse,
      status: 'DRAFTED',
      agentSignature: this.agentSignature,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      triggerEvent: triggerReason,
      notes: `OpenClaw Autonomous Agent auto-created draft PO. Trigger: ${triggerReason}. Target delivery: 24h express priority routing.`
    };
  }

  /**
   * Updates an existing wholesale ordering document dynamically (e.g. when Nous Hermes reports higher demand velocity)
   */
  updateWholesaleOrder(
    doc: WholesaleOrderDocument,
    additionalQuantity: number,
    updateReason: string
  ): WholesaleOrderDocument {
    const newQuantity = doc.quantityOrdered + additionalQuantity;
    const newTotalCost = Math.round(newQuantity * doc.unitWholesalePrice);

    return {
      ...doc,
      quantityOrdered: newQuantity,
      totalOrderCost: newTotalCost,
      status: 'UPDATED',
      updatedAt: new Date().toISOString(),
      notes: `${doc.notes} | Update [${new Date().toLocaleTimeString()}]: Added +${additionalQuantity} units. ${updateReason}`
    };
  }
}
