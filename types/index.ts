export type Role = "admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export interface Brand {
  id: string;
  name: string;
  origin: string;
  isOem: boolean;
}

export interface BikeModel {
  id: string;
  name: string;
  brand: string;
  engineCc: number;
  yearRange: string;
  type: "Commuter" | "Cruiser" | "Sports" | "Scooter" | "Adventure";
}

export type PartStatus = "in_stock" | "low_stock" | "out_of_stock" | "discontinued";

export interface Part {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  categoryId: string;
  categoryName: string;
  subCategory?: string;
  brandId: string;
  brandName: string;
  compatibleModels: string[];
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  gstRate: number;
  hsnCode: string;
  stockQuantity: number;
  minStockLevel: number;
  reorderQuantity: number;
  location: string;
  supplierId: string;
  supplierName: string;
  warrantyMonths: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type MovementType = "stock_in" | "stock_out" | "adjustment" | "transfer" | "return";

export interface StockMovement {
  id: string;
  partId: string;
  partName: string;
  partSku: string;
  type: MovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  referenceNo: string;
  performedBy: string;
  performedAt: string;
  notes?: string;
}

export type PaymentMode = "cash" | "upi" | "card" | "credit";
export type PaymentStatus = "paid" | "partial" | "due";

export interface SaleItem {
  partId: string;
  partName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  gstRate: number;
  taxableAmount: number;
  gstAmount: number;
  totalAmount: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  bikeRegNumber?: string;
  jobCardNumber?: string;
  items: SaleItem[];
  subtotal: number;
  discountTotal: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
  status: "completed" | "returned";
  createdAt: string;
  createdBy: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  bikeModels: string[];
  registrationNumber?: string;
  totalPurchases: number;
  totalSpent: number;
  outstandingDues: number;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  paymentTerms: string;
  balance: number;
  rating: number;
  categories: string[];
  createdAt: string;
}

export type POStatus = "draft" | "ordered" | "partially_received" | "received" | "cancelled";

export interface POLineItem {
  partId: string;
  partName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  receivedQuantity: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDate?: string;
  items: POLineItem[];
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  status: POStatus;
  notes?: string;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  performedBy: string;
  role: Role;
  timestamp: string;
}

export interface ShowroomSettings {
  showroomName: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  gstNumber: string;
  invoicePrefix: string;
  poPrefix: string;
  currencySymbol: string;
  defaultTaxRate: number;
  lowStockThresholdDefault: number;
  logoUrl?: string;
}
