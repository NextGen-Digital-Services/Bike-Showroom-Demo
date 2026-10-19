import { User, ShowroomSettings } from "@/types";
import { SEED_CATEGORIES, SEED_BRANDS, SEED_BIKE_MODELS } from "./seed-catalog";
import { SEED_SUPPLIERS } from "./seed-suppliers";
import { SEED_CUSTOMERS } from "./seed-customers";
import { generateSeedParts } from "./seed-parts";
import { generateSeedTransactions } from "./seed-transactions";

export const SEED_USERS: User[] = [
  {
    id: "usr-1",
    name: "Vikram Sen",
    email: "admin@showroom.com",
    role: "admin",
    phone: "+91 98101 99880",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    id: "usr-2",
    name: "Anil Verma",
    email: "staff@showroom.com",
    role: "staff",
    phone: "+91 98202 88771",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    active: true,
  },
];

export const SEED_SETTINGS: ShowroomSettings = {
  showroomName: "ApexMoto Superbikes & Genuine Spares",
  tagline: "Authorized Spares, Service & Performance Tuning Hub",
  address: "Plot 104, Ring Road Industrial Hub, Mayapuri",
  city: "New Delhi, Delhi - 110064",
  phone: "+91 11 4509 8899",
  email: "support@apexmotorcycles.in",
  gstNumber: "07AAACA4512D1Z1",
  invoicePrefix: "INV-24",
  poPrefix: "PO-2024",
  currencySymbol: "₹",
  defaultTaxRate: 18,
  lowStockThresholdDefault: 5,
};

export function getInitialSeedData() {
  const parts = generateSeedParts();
  const { sales, movements, purchaseOrders } = generateSeedTransactions(parts);

  return {
    parts,
    categories: SEED_CATEGORIES,
    brands: SEED_BRANDS,
    bikeModels: SEED_BIKE_MODELS,
    suppliers: SEED_SUPPLIERS,
    customers: SEED_CUSTOMERS,
    sales,
    movements,
    purchaseOrders,
    users: SEED_USERS,
    settings: SEED_SETTINGS,
  };
}

export { SEED_CATEGORIES, SEED_BRANDS, SEED_BIKE_MODELS, SEED_SUPPLIERS, SEED_CUSTOMERS };
