import { Part } from "@/types";
import { SEED_CATEGORIES, SEED_BRANDS, SEED_BIKE_MODELS } from "./seed-catalog";
import { SEED_SUPPLIERS } from "./seed-suppliers";

interface PartTemplate {
  name: string;
  categorySlug: string;
  brandName: string;
  models: string[];
  unit: string;
  cost: number;
  price: number;
  mrp: number;
  gst: number;
  hsn: string;
  minStock: number;
  reorderQty: number;
  stock: number;
  rack: string;
  warranty: number;
  image: string;
}

const TEMPLATES: PartTemplate[] = [
  // 1. Engine & Transmission
  { name: "Cylinder & Piston Kit Standard (97cc)", categorySlug: "engine-transmission", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "set", cost: 1420, price: 1850, mrp: 1999, gst: 28, hsn: "87141090", minStock: 4, reorderQty: 8, stock: 9, rack: "ENG-A1-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Engine Cylinder Block Kit (150cc)", categorySlug: "engine-transmission", brandName: "Bajaj Genuine", models: ["Bajaj Pulsar 150"], unit: "set", cost: 2150, price: 2799, mrp: 2999, gst: 28, hsn: "87141090", minStock: 3, reorderQty: 6, stock: 2, rack: "ENG-A1-02", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Cylinder Head Gasket Multi-Layer", categorySlug: "engine-transmission", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 45, price: 85, mrp: 99, gst: 18, hsn: "87141090", minStock: 15, reorderQty: 30, stock: 38, rack: "ENG-B2-01", warranty: 3, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Engine Valve Inlet & Exhaust Pair", categorySlug: "engine-transmission", brandName: "Bosch", models: ["Bajaj Pulsar 150", "Bajaj Pulsar NS200"], unit: "pair", cost: 240, price: 390, mrp: 450, gst: 18, hsn: "84099110", minStock: 6, reorderQty: 12, stock: 14, rack: "ENG-B2-02", warranty: 6, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "Timing Cam Chain 90 Links", categorySlug: "engine-transmission", brandName: "Rolon Chains", models: ["Hero Splendor Plus", "Hero HF Deluxe", "Honda Shine 125"], unit: "pcs", cost: 180, price: 299, mrp: 340, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 15, stock: 18, rack: "ENG-C1-03", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Engine Oil Seal Full Overhaul Kit", categorySlug: "engine-transmission", brandName: "Honda Genuine", models: ["Honda Activa 6G", "Honda Shine 125"], unit: "set", cost: 190, price: 320, mrp: 380, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 10, stock: 0, rack: "ENG-C1-04", warranty: 3, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Camshaft Assembly High Lift", categorySlug: "engine-transmission", brandName: "TVS Genuine", models: ["TVS Apache RTR 160"], unit: "pcs", cost: 890, price: 1290, mrp: 1450, gst: 28, hsn: "84099190", minStock: 3, reorderQty: 5, stock: 6, rack: "ENG-D1-01", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Rocker Arm Set (Intake & Exhaust)", categorySlug: "engine-transmission", brandName: "Royal Enfield Genuine", models: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350"], unit: "pair", cost: 650, price: 950, mrp: 1099, gst: 18, hsn: "84099190", minStock: 4, reorderQty: 8, stock: 7, rack: "ENG-D1-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Connecting Rod Kit Heavy Duty", categorySlug: "engine-transmission", brandName: "Yamaha Genuine", models: ["Yamaha R15 V4"], unit: "set", cost: 1250, price: 1750, mrp: 1990, gst: 28, hsn: "84099190", minStock: 2, reorderQty: 4, stock: 3, rack: "ENG-D2-01", warranty: 6, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "Crankshaft Main Bearing 6205", categorySlug: "engine-transmission", brandName: "Bosch", models: ["Hero Splendor Plus", "Bajaj Pulsar 150"], unit: "pcs", cost: 160, price: 260, mrp: 310, gst: 18, hsn: "84821011", minStock: 10, reorderQty: 20, stock: 24, rack: "ENG-B1-03", warranty: 12, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Kick Starter Shaft & Ratchet Assembly", categorySlug: "engine-transmission", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 320, price: 490, mrp: 560, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 10, stock: 8, rack: "ENG-C2-01", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Magneto Rotor Flywheel", categorySlug: "engine-transmission", brandName: "Endurance", models: ["Bajaj Pulsar 150"], unit: "pcs", cost: 1100, price: 1550, mrp: 1750, gst: 18, hsn: "85112090", minStock: 2, reorderQty: 4, stock: 4, rack: "ENG-A2-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Secondary Gear Box Shaft", categorySlug: "engine-transmission", brandName: "Honda Genuine", models: ["Honda Activa 6G"], unit: "pcs", cost: 580, price: 840, mrp: 950, gst: 18, hsn: "87141090", minStock: 3, reorderQty: 6, stock: 5, rack: "ENG-A2-02", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Variator Roller Weight Set (6 pcs)", categorySlug: "engine-transmission", brandName: "Honda Genuine", models: ["Honda Activa 6G", "Suzuki Access 125"], unit: "set", cost: 140, price: 240, mrp: 290, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 16, stock: 21, rack: "ENG-C2-02", warranty: 3, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "CVT Drive Belt Kevlar Reinforced", categorySlug: "engine-transmission", brandName: "Honda Genuine", models: ["Honda Activa 6G", "TVS Jupiter 125"], unit: "pcs", cost: 360, price: 580, mrp: 670, gst: 18, hsn: "40103190", minStock: 6, reorderQty: 15, stock: 1, rack: "ENG-B1-04", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },

  // 2. Braking System
  { name: "Front Disc Brake Pad Set Ceramic", categorySlug: "braking-system", brandName: "Endurance", models: ["Bajaj Pulsar 150", "Bajaj Pulsar NS200", "TVS Apache RTR 160"], unit: "set", cost: 175, price: 299, mrp: 350, gst: 18, hsn: "87141090", minStock: 12, reorderQty: 25, stock: 32, rack: "BRK-A1-01", warranty: 3, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Drum Brake Shoe Set with Springs", categorySlug: "braking-system", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe", "Honda Activa 6G"], unit: "set", cost: 130, price: 230, mrp: 275, gst: 18, hsn: "87141090", minStock: 20, reorderQty: 40, stock: 45, rack: "BRK-A1-02", warranty: 3, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Sintered Disc Brake Pads Pro", categorySlug: "braking-system", brandName: "Royal Enfield Genuine", models: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350"], unit: "set", cost: 480, price: 799, mrp: 899, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 15, stock: 11, rack: "BRK-A2-01", warranty: 6, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Disc Brake Rotor 280mm Fluted", categorySlug: "braking-system", brandName: "Endurance", models: ["Bajaj Pulsar NS200", "Yamaha R15 V4"], unit: "pcs", cost: 1150, price: 1650, mrp: 1890, gst: 18, hsn: "87141090", minStock: 3, reorderQty: 6, stock: 5, rack: "BRK-B1-01", warranty: 12, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Brake Master Cylinder Kit", categorySlug: "braking-system", brandName: "Endurance", models: ["Bajaj Pulsar 150", "TVS Apache RTR 160"], unit: "kit", cost: 260, price: 420, mrp: 490, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 10, stock: 7, rack: "BRK-B2-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Disc Brake Caliper Assembly", categorySlug: "braking-system", brandName: "Endurance", models: ["Bajaj Pulsar NS200"], unit: "pcs", cost: 1450, price: 2100, mrp: 2350, gst: 18, hsn: "87141090", minStock: 2, reorderQty: 4, stock: 0, rack: "BRK-C1-01", warranty: 6, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Castrol Brake Fluid DOT 4 (250ml)", categorySlug: "braking-system", brandName: "Castrol", models: ["Bajaj Pulsar 150", "Royal Enfield Classic 350", "Yamaha R15 V4"], unit: "pcs", cost: 85, price: 140, mrp: 160, gst: 18, hsn: "38190010", minStock: 15, reorderQty: 30, stock: 40, rack: "BRK-D1-01", warranty: 12, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Stainless Steel Braided Brake Hose 950mm", categorySlug: "braking-system", brandName: "Yamaha Genuine", models: ["Yamaha R15 V4"], unit: "pcs", cost: 680, price: 990, mrp: 1150, gst: 18, hsn: "87141090", minStock: 3, reorderQty: 6, stock: 4, rack: "BRK-D2-01", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Brake Cam Shaft & Arm Kit", categorySlug: "braking-system", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "set", cost: 95, price: 165, mrp: 195, gst: 18, hsn: "87141090", minStock: 6, reorderQty: 12, stock: 15, rack: "BRK-C2-01", warranty: 6, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Brake Switch Electrical Sensor", categorySlug: "braking-system", brandName: "Honda Genuine", models: ["Honda Activa 6G", "Honda Shine 125"], unit: "pcs", cost: 55, price: 110, mrp: 130, gst: 18, hsn: "85365020", minStock: 10, reorderQty: 20, stock: 22, rack: "BRK-C2-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Brake Drum 130mm Cast Iron", categorySlug: "braking-system", brandName: "Hero Genuine", models: ["Hero Splendor Plus"], unit: "pcs", cost: 720, price: 1050, mrp: 1190, gst: 18, hsn: "87141090", minStock: 3, reorderQty: 6, stock: 4, rack: "BRK-B2-02", warranty: 12, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Brake Caliper Pin & Dust Boot Set", categorySlug: "braking-system", brandName: "Endurance", models: ["Bajaj Pulsar 150", "TVS Apache RTR 160"], unit: "set", cost: 70, price: 135, mrp: 160, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 15, stock: 16, rack: "BRK-D2-02", warranty: 3, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },
  { name: "Combi-Brake Equalizer Cable System", categorySlug: "braking-system", brandName: "Honda Genuine", models: ["Honda Activa 6G"], unit: "pcs", cost: 180, price: 295, mrp: 340, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 10, stock: 2, rack: "BRK-A2-02", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "ABS Wheel Speed Sensor Front", categorySlug: "braking-system", brandName: "Bosch", models: ["Royal Enfield Classic 350", "Yamaha R15 V4"], unit: "pcs", cost: 820, price: 1220, mrp: 1390, gst: 18, hsn: "90318000", minStock: 2, reorderQty: 5, stock: 5, rack: "BRK-C1-02", warranty: 12, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Brake Return Spring Set (3 pcs)", categorySlug: "braking-system", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "set", cost: 25, price: 55, mrp: 70, gst: 18, hsn: "73202000", minStock: 20, reorderQty: 50, stock: 60, rack: "BRK-D1-02", warranty: 3, image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=500&auto=format&fit=crop&q=60" },

  // 3. Electrical & Lighting
  { name: "Exide Xplore 12V 4Ah Maintenance Free Battery", categorySlug: "electrical-lighting", brandName: "Exide", models: ["Hero Splendor Plus", "Honda Activa 6G", "Honda Shine 125"], unit: "pcs", cost: 1050, price: 1399, mrp: 1550, gst: 28, hsn: "85071000", minStock: 10, reorderQty: 25, stock: 19, rack: "ELE-A1-01", warranty: 48, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Exide Xplore 12V 5Ah VRLA Pro Battery", categorySlug: "electrical-lighting", brandName: "Exide", models: ["Bajaj Pulsar 150", "TVS Apache RTR 160"], unit: "pcs", cost: 1280, price: 1699, mrp: 1850, gst: 28, hsn: "85071000", minStock: 8, reorderQty: 20, stock: 14, rack: "ELE-A1-02", warranty: 48, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Exide 12V 9Ah Heavy Cruiser Battery", categorySlug: "electrical-lighting", brandName: "Exide", models: ["Royal Enfield Classic 350"], unit: "pcs", cost: 2150, price: 2799, mrp: 3100, gst: 28, hsn: "85071000", minStock: 5, reorderQty: 10, stock: 3, rack: "ELE-A1-03", warranty: 36, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Bosch Spark Plug UR4AC Standard", categorySlug: "electrical-lighting", brandName: "Bosch", models: ["Hero Splendor Plus", "Hero HF Deluxe", "Honda Activa 6G"], unit: "pcs", cost: 65, price: 115, mrp: 135, gst: 18, hsn: "85111000", minStock: 30, reorderQty: 60, stock: 75, rack: "ELE-B1-01", warranty: 6, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "Bosch Platinum Iridium Spark Plug High Perf", categorySlug: "electrical-lighting", brandName: "Bosch", models: ["Bajaj Pulsar NS200", "Yamaha R15 V4"], unit: "pcs", cost: 380, price: 599, mrp: 699, gst: 18, hsn: "85111000", minStock: 8, reorderQty: 20, stock: 22, rack: "ELE-B1-02", warranty: 12, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "LED Projector Headlight Bulb H4 35W 6000K", categorySlug: "electrical-lighting", brandName: "Bosch", models: ["Bajaj Pulsar 150", "Royal Enfield Classic 350", "TVS Apache RTR 160"], unit: "pcs", cost: 420, price: 749, mrp: 899, gst: 18, hsn: "85392990", minStock: 10, reorderQty: 25, stock: 18, rack: "ELE-C1-01", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Complete Headlamp Assembly Clear Lens", categorySlug: "electrical-lighting", brandName: "Hero Genuine", models: ["Hero Splendor Plus"], unit: "pcs", cost: 580, price: 890, mrp: 999, gst: 18, hsn: "85122010", minStock: 4, reorderQty: 10, stock: 8, rack: "ELE-C2-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "LED Turn Indicator Assembly Set of 4", categorySlug: "electrical-lighting", brandName: "Yamaha Genuine", models: ["Yamaha R15 V4"], unit: "set", cost: 650, price: 999, mrp: 1199, gst: 18, hsn: "85122010", minStock: 5, reorderQty: 12, stock: 0, rack: "ELE-C2-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Dual Tone Horn Set 12V 110dB Chrome", categorySlug: "electrical-lighting", brandName: "Bosch", models: ["Bajaj Pulsar 150", "Royal Enfield Classic 350"], unit: "set", cost: 340, price: 550, mrp: 650, gst: 18, hsn: "85123010", minStock: 8, reorderQty: 15, stock: 16, rack: "ELE-D1-01", warranty: 12, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "CDI Ignition Control Unit Module", categorySlug: "electrical-lighting", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 380, price: 590, mrp: 670, gst: 18, hsn: "85113020", minStock: 5, reorderQty: 10, stock: 9, rack: "ELE-D2-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Starter Relay Magnetic Solenoid", categorySlug: "electrical-lighting", brandName: "Honda Genuine", models: ["Honda Activa 6G"], unit: "pcs", cost: 190, price: 320, mrp: 375, gst: 18, hsn: "85364100", minStock: 6, reorderQty: 15, stock: 12, rack: "ELE-B2-01", warranty: 6, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Voltage Regulator Rectifier (RR Unit)", categorySlug: "electrical-lighting", brandName: "TVS Genuine", models: ["TVS Apache RTR 160"], unit: "pcs", cost: 420, price: 680, mrp: 790, gst: 18, hsn: "85044090", minStock: 4, reorderQty: 8, stock: 6, rack: "ELE-B2-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Ignition Key Switch Lock Set Complete", categorySlug: "electrical-lighting", brandName: "Hero Genuine", models: ["Hero Splendor Plus"], unit: "set", cost: 480, price: 750, mrp: 860, gst: 18, hsn: "83012000", minStock: 4, reorderQty: 8, stock: 1, rack: "ELE-A2-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Stator Magneto Coil Assembly 12-Pole", categorySlug: "electrical-lighting", brandName: "Bajaj Genuine", models: ["Bajaj Pulsar 150"], unit: "pcs", cost: 740, price: 1100, mrp: 1250, gst: 18, hsn: "85030090", minStock: 3, reorderQty: 6, stock: 5, rack: "ELE-A2-02", warranty: 6, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "Tail Light Assembly Red Clear with Bulb", categorySlug: "electrical-lighting", brandName: "Honda Genuine", models: ["Honda Activa 6G"], unit: "pcs", cost: 310, price: 490, mrp: 570, gst: 18, hsn: "85122010", minStock: 5, reorderQty: 10, stock: 7, rack: "ELE-C1-02", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },

  // 4. Filters & Lubricants
  { name: "Castrol Power1 4T 10W-30 Synthetic (900ml)", categorySlug: "filters-lubricants", brandName: "Castrol", models: ["Hero Splendor Plus", "Honda Activa 6G", "Honda Shine 125"], unit: "ltr", cost: 360, price: 499, mrp: 545, gst: 18, hsn: "27101980", minStock: 25, reorderQty: 60, stock: 55, rack: "LUB-A1-01", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Castrol Activ 4T 20W-40 Clean Engine (1 Ltr)", categorySlug: "filters-lubricants", brandName: "Castrol", models: ["Bajaj Pulsar 150", "Hero HF Deluxe"], unit: "ltr", cost: 310, price: 435, mrp: 480, gst: 18, hsn: "27101980", minStock: 30, reorderQty: 75, stock: 68, rack: "LUB-A1-02", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Motul 7100 4T 10W-50 100% Synthetic (1 Ltr)", categorySlug: "filters-lubricants", brandName: "Motul", models: ["Bajaj Pulsar NS200", "Yamaha R15 V4"], unit: "ltr", cost: 680, price: 960, mrp: 1050, gst: 18, hsn: "27101980", minStock: 12, reorderQty: 30, stock: 24, rack: "LUB-A2-01", warranty: 36, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Motul 3100 4T 15W-50 Semi-Synthetic (2.5 Ltr)", categorySlug: "filters-lubricants", brandName: "Motul", models: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350"], unit: "pcs", cost: 980, price: 1390, mrp: 1520, gst: 18, hsn: "27101980", minStock: 10, reorderQty: 25, stock: 17, rack: "LUB-A2-02", warranty: 36, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "OEM Paper Element Air Filter Cartridge", categorySlug: "filters-lubricants", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 95, price: 160, mrp: 185, gst: 18, hsn: "84213100", minStock: 25, reorderQty: 50, stock: 48, rack: "LUB-B1-01", warranty: 6, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Viscous Air Filter Element High Flow", categorySlug: "filters-lubricants", brandName: "Honda Genuine", models: ["Honda Activa 6G"], unit: "pcs", cost: 145, price: 245, mrp: 285, gst: 18, hsn: "84213100", minStock: 20, reorderQty: 40, stock: 36, rack: "LUB-B1-02", warranty: 6, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Engine Spin-On Oil Filter Element", categorySlug: "filters-lubricants", brandName: "Bajaj Genuine", models: ["Bajaj Pulsar 150", "Bajaj Pulsar NS200"], unit: "pcs", cost: 42, price: 80, mrp: 95, gst: 18, hsn: "84212300", minStock: 30, reorderQty: 60, stock: 52, rack: "LUB-B2-01", warranty: 6, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Stainless Steel Oil Strainer Filter", categorySlug: "filters-lubricants", brandName: "Royal Enfield Genuine", models: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350"], unit: "pcs", cost: 110, price: 190, mrp: 220, gst: 18, hsn: "84212300", minStock: 15, reorderQty: 30, stock: 26, rack: "LUB-B2-02", warranty: 6, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Motul Chain Clean C1 Spray (400ml)", categorySlug: "filters-lubricants", brandName: "Motul", models: ["Bajaj Pulsar 150", "Yamaha R15 V4", "Royal Enfield Classic 350"], unit: "pcs", cost: 320, price: 460, mrp: 510, gst: 18, hsn: "34039900", minStock: 10, reorderQty: 25, stock: 15, rack: "LUB-C1-01", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Motul Chain Lube Road C2 Spray (400ml)", categorySlug: "filters-lubricants", brandName: "Motul", models: ["Bajaj Pulsar 150", "Yamaha R15 V4", "Royal Enfield Classic 350"], unit: "pcs", cost: 340, price: 485, mrp: 540, gst: 18, hsn: "34039900", minStock: 12, reorderQty: 25, stock: 22, rack: "LUB-C1-02", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Fork Hydraulic Suspension Oil 10W (350ml)", categorySlug: "filters-lubricants", brandName: "Castrol", models: ["Hero Splendor Plus", "Bajaj Pulsar 150", "Honda Activa 6G"], unit: "pcs", cost: 95, price: 165, mrp: 190, gst: 18, hsn: "27101980", minStock: 15, reorderQty: 30, stock: 32, rack: "LUB-C2-01", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Fuel Filter In-Line Cleanflow", categorySlug: "filters-lubricants", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 25, price: 55, mrp: 65, gst: 18, hsn: "84213100", minStock: 25, reorderQty: 50, stock: 54, rack: "LUB-C2-02", warranty: 6, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60" },
  { name: "Castrol Radiator Engine Coolant 1L Prediluted", categorySlug: "filters-lubricants", brandName: "Castrol", models: ["Bajaj Pulsar NS200", "Yamaha R15 V4"], unit: "pcs", cost: 180, price: 290, mrp: 335, gst: 18, hsn: "38200000", minStock: 6, reorderQty: 15, stock: 11, rack: "LUB-D1-01", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "CVT Transmission Final Drive Gear Oil 120ml", categorySlug: "filters-lubricants", brandName: "Honda Genuine", models: ["Honda Activa 6G", "Suzuki Access 125"], unit: "pcs", cost: 45, price: 85, mrp: 100, gst: 18, hsn: "27101980", minStock: 20, reorderQty: 40, stock: 43, rack: "LUB-D1-02", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },
  { name: "Multi-Purpose High Temp Lithium Grease (500g)", categorySlug: "filters-lubricants", brandName: "Castrol", models: ["Hero Splendor Plus", "Royal Enfield Classic 350"], unit: "pcs", cost: 140, price: 220, mrp: 260, gst: 18, hsn: "27101990", minStock: 8, reorderQty: 20, stock: 16, rack: "LUB-D2-01", warranty: 24, image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60" },

  // 5. Drive Chain & Sprockets
  { name: "Rolon Chain & Sprocket Kit Standard (428-106L)", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "kit", cost: 640, price: 920, mrp: 1050, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 20, stock: 22, rack: "CHN-A1-01", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Rolon Brass Coated Chain Sprocket Kit (428-124L)", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Bajaj Pulsar 150"], unit: "kit", cost: 950, price: 1390, mrp: 1580, gst: 18, hsn: "87141090", minStock: 6, reorderQty: 15, stock: 12, rack: "CHN-A1-02", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Heavy Duty O-Ring Chain & Sprocket Kit", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350"], unit: "kit", cost: 1850, price: 2590, mrp: 2890, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 10, stock: 7, rack: "CHN-A2-01", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "X-Ring Performance Gold Chain Kit (520-112L)", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Yamaha R15 V4", "Bajaj Pulsar NS200"], unit: "kit", cost: 2450, price: 3450, mrp: 3890, gst: 18, hsn: "87141090", minStock: 3, reorderQty: 6, stock: 2, rack: "CHN-A2-02", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Engine Drive Sprocket 14T Hardened", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 90, price: 160, mrp: 190, gst: 18, hsn: "87141090", minStock: 10, reorderQty: 25, stock: 26, rack: "CHN-B1-01", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Wheel Sprocket 44T High Tensile", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Bajaj Pulsar 150"], unit: "pcs", cost: 320, price: 490, mrp: 570, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 12, stock: 9, rack: "CHN-B1-02", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Drive Chain Master Connecting Lock Link", categorySlug: "chain-sprockets", brandName: "Rolon Chains", models: ["Hero Splendor Plus", "Bajaj Pulsar 150"], unit: "pcs", cost: 15, price: 35, mrp: 50, gst: 18, hsn: "73151900", minStock: 30, reorderQty: 75, stock: 82, rack: "CHN-B2-01", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Chain Adjuster Tensioner Bolts (Pair)", categorySlug: "chain-sprockets", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pair", cost: 35, price: 75, mrp: 95, gst: 18, hsn: "73181500", minStock: 15, reorderQty: 30, stock: 35, rack: "CHN-B2-02", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Rubber Chain Slider Guide Swingarm", categorySlug: "chain-sprockets", brandName: "Bajaj Genuine", models: ["Bajaj Pulsar 150", "Bajaj Pulsar NS200"], unit: "pcs", cost: 65, price: 125, mrp: 150, gst: 18, hsn: "40169990", minStock: 6, reorderQty: 15, stock: 14, rack: "CHN-C1-01", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Chain Cover Case Upper & Lower Set", categorySlug: "chain-sprockets", brandName: "Hero Genuine", models: ["Hero Splendor Plus"], unit: "set", cost: 240, price: 399, mrp: 460, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 10, stock: 7, rack: "CHN-C1-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },

  // 6. Tyres & Tubes
  { name: "MRF Nylogrip Zapper-FS 90/90-12 Tubeless Front", categorySlug: "tyres-tubes", brandName: "MRF Tyres", models: ["Honda Activa 6G", "TVS Jupiter 125", "Suzuki Access 125"], unit: "pcs", cost: 1180, price: 1550, mrp: 1720, gst: 28, hsn: "40114020", minStock: 8, reorderQty: 20, stock: 15, rack: "TYR-A1-01", warranty: 36, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "MRF Nylogrip Zapper-Y 90/100-10 Rear Scooter", categorySlug: "tyres-tubes", brandName: "MRF Tyres", models: ["Honda Activa 6G", "Suzuki Access 125"], unit: "pcs", cost: 1120, price: 1490, mrp: 1650, gst: 28, hsn: "40114020", minStock: 8, reorderQty: 20, stock: 18, rack: "TYR-A1-02", warranty: 36, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "CEAT Zoom Plus 120/80-18 Tubeless Rear Tyre", categorySlug: "tyres-tubes", brandName: "CEAT", models: ["Royal Enfield Classic 350"], unit: "pcs", cost: 2350, price: 3100, mrp: 3450, gst: 28, hsn: "40114020", minStock: 5, reorderQty: 12, stock: 8, rack: "TYR-A2-01", warranty: 36, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "MRF Revz-S 140/70-R17 Radial Rear Tyre", categorySlug: "tyres-tubes", brandName: "MRF Tyres", models: ["Yamaha R15 V4", "Bajaj Pulsar NS200"], unit: "pcs", cost: 2950, price: 3890, mrp: 4350, gst: 28, hsn: "40114020", minStock: 4, reorderQty: 8, stock: 0, rack: "TYR-A2-02", warranty: 36, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "CEAT Secura Zoom F 2.75-18 Front Commuter Tyre", categorySlug: "tyres-tubes", brandName: "CEAT", models: ["Hero Splendor Plus", "Hero HF Deluxe", "Honda Shine 125"], unit: "pcs", cost: 1240, price: 1620, mrp: 1800, gst: 28, hsn: "40114020", minStock: 10, reorderQty: 25, stock: 22, rack: "TYR-B1-01", warranty: 36, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "MRF Heavy Duty Butyl Inner Tube 2.75/3.00-18", categorySlug: "tyres-tubes", brandName: "MRF Tyres", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 240, price: 360, mrp: 420, gst: 18, hsn: "40139030", minStock: 15, reorderQty: 30, stock: 28, rack: "TYR-B1-02", warranty: 12, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "Tubeless Tyre Puncture Emergency Strip Kit", categorySlug: "tyres-tubes", brandName: "MRF Tyres", models: ["Hero Splendor Plus", "Royal Enfield Classic 350", "Yamaha R15 V4"], unit: "kit", cost: 110, price: 199, mrp: 250, gst: 18, hsn: "82055990", minStock: 12, reorderQty: 30, stock: 25, rack: "TYR-B2-01", warranty: 12, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },
  { name: "Brass Tubeless Valve Stems (Pack of 2)", categorySlug: "tyres-tubes", brandName: "CEAT", models: ["Honda Activa 6G", "Bajaj Pulsar 150"], unit: "pair", cost: 40, price: 90, mrp: 120, gst: 18, hsn: "84818090", minStock: 20, reorderQty: 50, stock: 45, rack: "TYR-B2-02", warranty: 12, image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60" },

  // 7. Clutch & Cables
  { name: "Clutch Friction Plate Set (4 Plates)", categorySlug: "clutch-cables", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "set", cost: 280, price: 440, mrp: 510, gst: 18, hsn: "87141090", minStock: 10, reorderQty: 25, stock: 23, rack: "CLU-A1-01", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Clutch Plate Assembly Heavy Duty (6 Plates)", categorySlug: "clutch-cables", brandName: "Bajaj Genuine", models: ["Bajaj Pulsar 150", "Bajaj Pulsar NS200"], unit: "set", cost: 680, price: 990, mrp: 1150, gst: 18, hsn: "87141090", minStock: 6, reorderQty: 15, stock: 11, rack: "CLU-A1-02", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Clutch Plate Set & Steel Plates Kit", categorySlug: "clutch-cables", brandName: "Royal Enfield Genuine", models: ["Royal Enfield Classic 350"], unit: "set", cost: 1150, price: 1690, mrp: 1950, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 10, stock: 1, rack: "CLU-A2-01", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Clutch Cable Nylon Lined Smooth Action", categorySlug: "clutch-cables", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pcs", cost: 65, price: 125, mrp: 150, gst: 18, hsn: "87141090", minStock: 15, reorderQty: 30, stock: 32, rack: "CLU-B1-01", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Accelerator Throttle Dual Cable Set", categorySlug: "clutch-cables", brandName: "Bajaj Genuine", models: ["Bajaj Pulsar 150"], unit: "set", cost: 110, price: 195, mrp: 230, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 20, stock: 14, rack: "CLU-B1-02", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Digital Speedometer Cable Sensor Wire", categorySlug: "clutch-cables", brandName: "TVS Genuine", models: ["TVS Apache RTR 160"], unit: "pcs", cost: 140, price: 240, mrp: 285, gst: 18, hsn: "87141090", minStock: 6, reorderQty: 12, stock: 8, rack: "CLU-B2-01", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "Clutch Centre Hub & Pressure Plate", categorySlug: "clutch-cables", brandName: "Hero Genuine", models: ["Hero Splendor Plus"], unit: "set", cost: 360, price: 560, mrp: 640, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 10, stock: 7, rack: "CLU-C1-01", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },
  { name: "Clutch Compression Spring Set (4 pcs)", categorySlug: "clutch-cables", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "set", cost: 40, price: 80, mrp: 100, gst: 18, hsn: "73202000", minStock: 15, reorderQty: 30, stock: 35, rack: "CLU-C1-02", warranty: 6, image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60" },

  // 8. Suspension & Steering
  { name: "Front Fork Oil Seal Pair (31mm)", categorySlug: "suspension-steering", brandName: "Endurance", models: ["Hero Splendor Plus", "Honda Shine 125"], unit: "pair", cost: 75, price: 145, mrp: 175, gst: 18, hsn: "84842000", minStock: 12, reorderQty: 25, stock: 26, rack: "SUS-A1-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Fork Oil Seal & Dust Cap Set (37mm)", categorySlug: "suspension-steering", brandName: "Endurance", models: ["Bajaj Pulsar NS200", "Yamaha R15 V4"], unit: "set", cost: 160, price: 290, mrp: 340, gst: 18, hsn: "84842000", minStock: 6, reorderQty: 15, stock: 9, rack: "SUS-A1-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Shock Absorber Pair 5-Step Adjustable", categorySlug: "suspension-steering", brandName: "Endurance", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pair", cost: 1250, price: 1790, mrp: 1999, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 8, stock: 6, rack: "SUS-A2-01", warranty: 12, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Rear Gas Charged Monoshock Absorber", categorySlug: "suspension-steering", brandName: "Endurance", models: ["Bajaj Pulsar NS200", "Yamaha R15 V4"], unit: "pcs", cost: 2350, price: 3250, mrp: 3650, gst: 18, hsn: "87141090", minStock: 2, reorderQty: 5, stock: 4, rack: "SUS-A2-02", warranty: 12, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Handlebar Steering Ball Racer Cone Set", categorySlug: "suspension-steering", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Honda Activa 6G"], unit: "set", cost: 140, price: 240, mrp: 285, gst: 18, hsn: "84821011", minStock: 10, reorderQty: 20, stock: 18, rack: "SUS-B1-01", warranty: 6, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },
  { name: "Swing Arm Bush Metal-Rubber (Pair)", categorySlug: "suspension-steering", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pair", cost: 60, price: 120, mrp: 145, gst: 18, hsn: "87141090", minStock: 10, reorderQty: 25, stock: 24, rack: "SUS-B1-02", warranty: 6, image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60" },

  // 9. Body & Aesthetics
  { name: "Rear View Mirror Pair Convex Anti-Glare", categorySlug: "body-aesthetics", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "pair", cost: 160, price: 275, mrp: 320, gst: 18, hsn: "70091000", minStock: 10, reorderQty: 25, stock: 27, rack: "BOD-A1-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Billet Aluminium CNC Brake & Clutch Lever Set", categorySlug: "body-aesthetics", brandName: "Yamaha Genuine", models: ["Yamaha R15 V4", "Bajaj Pulsar NS200"], unit: "pair", cost: 380, price: 650, mrp: 780, gst: 18, hsn: "87141090", minStock: 5, reorderQty: 10, stock: 8, rack: "BOD-A1-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Soft Silicone Handlebar Grip Sleeves (Pair)", categorySlug: "body-aesthetics", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Honda Activa 6G", "Bajaj Pulsar 150"], unit: "pair", cost: 45, price: 95, mrp: 120, gst: 18, hsn: "40169990", minStock: 15, reorderQty: 30, stock: 32, rack: "BOD-B1-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Aerodynamic Smoke Windshield Visor", categorySlug: "body-aesthetics", brandName: "Royal Enfield Genuine", models: ["Royal Enfield Hunter 350", "Royal Enfield Classic 350"], unit: "pcs", cost: 450, price: 790, mrp: 920, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 8, stock: 6, rack: "BOD-B1-02", warranty: 12, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Front Mudguard Fender Gloss Black", categorySlug: "body-aesthetics", brandName: "Hero Genuine", models: ["Hero Splendor Plus"], unit: "pcs", cost: 340, price: 540, mrp: 620, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 8, stock: 7, rack: "BOD-C1-01", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Side Stand Support with Strong Spring", categorySlug: "body-aesthetics", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Hero HF Deluxe"], unit: "set", cost: 85, price: 160, mrp: 190, gst: 18, hsn: "87141090", minStock: 8, reorderQty: 20, stock: 19, rack: "BOD-C1-02", warranty: 12, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },

  // 10. Rider Accessories
  { name: "Steelbird SBA-7 7Wings Full Face Helmet ISI", categorySlug: "rider-accessories", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Bajaj Pulsar 150", "Royal Enfield Classic 350"], unit: "pcs", cost: 1150, price: 1699, mrp: 1999, gst: 18, hsn: "65061000", minStock: 6, reorderQty: 15, stock: 12, rack: "ACC-A1-01", warranty: 12, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Crash Guard Leg Protector Heavy Gauge Steel", categorySlug: "rider-accessories", brandName: "Royal Enfield Genuine", models: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350"], unit: "pcs", cost: 1450, price: 2190, mrp: 2490, gst: 18, hsn: "87141090", minStock: 4, reorderQty: 8, stock: 5, rack: "ACC-A1-02", warranty: 24, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "Mobile Phone Holder Mount with 15W QC3.0 Charger", categorySlug: "rider-accessories", brandName: "Bosch", models: ["Hero Splendor Plus", "Bajaj Pulsar 150", "Yamaha R15 V4"], unit: "pcs", cost: 420, price: 749, mrp: 899, gst: 18, hsn: "85044090", minStock: 8, reorderQty: 20, stock: 18, rack: "ACC-B1-01", warranty: 12, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
  { name: "All-Weather Heavy Duty Bike Body Cover Water Resistant", categorySlug: "rider-accessories", brandName: "Hero Genuine", models: ["Hero Splendor Plus", "Royal Enfield Classic 350", "Bajaj Pulsar 150"], unit: "pcs", cost: 280, price: 499, mrp: 599, gst: 18, hsn: "63079090", minStock: 10, reorderQty: 20, stock: 21, rack: "ACC-B1-02", warranty: 6, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60" },
  { name: "3D Resin Anti-Scratch Fuel Tank Pad Protector", categorySlug: "rider-accessories", brandName: "Yamaha Genuine", models: ["Yamaha R15 V4", "Bajaj Pulsar NS200"], unit: "pcs", cost: 95, price: 199, mrp: 250, gst: 18, hsn: "39199090", minStock: 10, reorderQty: 25, stock: 24, rack: "ACC-C1-01", warranty: 6, image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=500&auto=format&fit=crop&q=60" },
];

export function generateSeedParts(): Part[] {
  const parts: Part[] = [];
  let index = 1;

  // Generate expanded parts by combining variations across models to ensure 155+ high quality parts
  const variants = [
    { suffix: "Standard OEM", costMult: 1.0, priceMult: 1.0 },
    { suffix: "Heavy-Duty Plus", costMult: 1.15, priceMult: 1.18 },
    { suffix: "Pro Racing Series", costMult: 1.35, priceMult: 1.4 },
  ];

  for (const t of TEMPLATES) {
    const cat = SEED_CATEGORIES.find((c) => c.slug === t.categorySlug) || SEED_CATEGORIES[0];
    const brand = SEED_BRANDS.find((b) => b.name === t.brandName) || SEED_BRANDS[0];
    const supplier = SEED_SUPPLIERS[index % SEED_SUPPLIERS.length];

    // Primary item
    parts.push({
      id: `part-${index}`,
      name: t.name,
      sku: `APX-${cat.slug.slice(0, 3).toUpperCase()}-${String(index).padStart(4, "0")}`,
      barcode: `890${String(1000000000 + index).slice(1)}`,
      categoryId: cat.id,
      categoryName: cat.name,
      subCategory: cat.name.split("&")[0].trim(),
      brandId: brand.id,
      brandName: brand.name,
      compatibleModels: t.models,
      unit: t.unit,
      purchasePrice: t.cost,
      sellingPrice: t.price,
      mrp: t.mrp,
      gstRate: t.gst,
      hsnCode: t.hsn,
      stockQuantity: t.stock,
      minStockLevel: t.minStock,
      reorderQuantity: t.reorderQty,
      location: t.rack,
      supplierId: supplier.id,
      supplierName: supplier.name,
      warrantyMonths: t.warranty,
      description: `High performance genuine ${t.name} engineered for ${t.models.join(", ")}. Tested for extreme Indian road conditions.`,
      imageUrl: t.image,
      createdAt: new Date(Date.now() - (120 - (index % 40)) * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - (index % 10) * 86400000).toISOString(),
    });
    index++;
  }

  // Generate model specific variations to comfortably exceed 150 parts
  for (const bike of SEED_BIKE_MODELS) {
    const cat = SEED_CATEGORIES[index % SEED_CATEGORIES.length];
    const brand = SEED_BRANDS.find((b) => b.name.includes(bike.brand)) || SEED_BRANDS[index % SEED_BRANDS.length];
    const supplier = SEED_SUPPLIERS[index % SEED_SUPPLIERS.length];

    const partTypes = [
      { name: `${bike.name} Front Fork Dust Boot Kit`, catSlug: "suspension-steering", cost: 120, price: 210, mrp: 250, unit: "set" },
      { name: `${bike.name} OEM Ignition Key Lock Set`, catSlug: "electrical-lighting", cost: 420, price: 680, mrp: 780, unit: "set" },
      { name: `${bike.name} Rear Hub Cushion Rubber Set`, catSlug: "chain-sprockets", cost: 85, price: 160, mrp: 190, unit: "set" },
      { name: `${bike.name} Clutch & Accelerator Wire Combo`, catSlug: "clutch-cables", cost: 150, price: 260, mrp: 310, unit: "set" },
      { name: `${bike.name} Premium Seat Cover Anti-Skid`, catSlug: "body-aesthetics", cost: 180, price: 320, mrp: 380, unit: "pcs" },
      { name: `${bike.name} Engine Oil Drain Bolt with Magnetic Washer`, catSlug: "filters-lubricants", cost: 40, price: 85, mrp: 110, unit: "pcs" },
      { name: `${bike.name} High Performance Disc Brake Fluid Line`, catSlug: "braking-system", cost: 310, price: 490, mrp: 570, unit: "pcs" },
      { name: `${bike.name} Complete Side Stand Sensor Assembly`, catSlug: "electrical-lighting", cost: 230, price: 380, mrp: 450, unit: "pcs" },
    ];

    for (const pt of partTypes) {
      if (parts.length >= 165) break;
      const targetCat = SEED_CATEGORIES.find((c) => c.slug === pt.catSlug) || cat;
      const isLowStock = index % 14 === 0;
      const isOutOfStock = index % 32 === 0;
      const isDeadStock = index % 21 === 0;

      const minStock = 5;
      const stock = isOutOfStock ? 0 : isLowStock ? 2 : isDeadStock ? 35 : 12 + (index % 25);

      parts.push({
        id: `part-${index}`,
        name: pt.name,
        sku: `APX-${targetCat.slug.slice(0, 3).toUpperCase()}-${String(index).padStart(4, "0")}`,
        barcode: `890${String(1000000000 + index).slice(1)}`,
        categoryId: targetCat.id,
        categoryName: targetCat.name,
        subCategory: targetCat.name.split("&")[0].trim(),
        brandId: brand.id,
        brandName: brand.name,
        compatibleModels: [bike.name],
        unit: pt.unit,
        purchasePrice: pt.cost,
        sellingPrice: pt.price,
        mrp: pt.mrp,
        gstRate: 18,
        hsnCode: "87141090",
        stockQuantity: stock,
        minStockLevel: minStock,
        reorderQuantity: 10,
        location: `R-${String((index % 8) + 1).padStart(2, "0")}-S${(index % 4) + 1}`,
        supplierId: supplier.id,
        supplierName: supplier.name,
        warrantyMonths: 6,
        description: `Direct replacement factory part tailored for ${bike.name}. Tested for durability and fitment.`,
        imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60",
        createdAt: new Date(Date.now() - (95 - (index % 30)) * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - (index % 5) * 86400000).toISOString(),
      });
      index++;
    }
  }

  return parts;
}
