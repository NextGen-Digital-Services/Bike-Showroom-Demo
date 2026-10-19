import { Category, Brand, BikeModel } from "@/types";

export const SEED_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Engine & Transmission", slug: "engine-transmission", description: "Pistons, rings, valves, timing chains, and cylinder components", iconName: "Cog" },
  { id: "cat-2", name: "Braking System", slug: "braking-system", description: "Disc pads, brake shoes, calipers, master cylinders, and brake fluid", iconName: "Disc" },
  { id: "cat-3", name: "Electrical & Lighting", slug: "electrical-lighting", description: "Batteries, headlights, indicators, spark plugs, CDI units, wiring", iconName: "Zap" },
  { id: "cat-4", name: "Filters & Lubricants", slug: "filters-lubricants", description: "Engine oils, air filters, oil filters, fork oil, chain lube", iconName: "Droplet" },
  { id: "cat-5", name: "Drive Chain & Sprockets", slug: "chain-sprockets", description: "Roller chains, brass chains, front and rear sprockets kits", iconName: "Link" },
  { id: "cat-6", name: "Tyres & Tubes", slug: "tyres-tubes", description: "Front & rear tubeless tyres, heavy-duty tubes, rim tape", iconName: "CircleDot" },
  { id: "cat-7", name: "Clutch & Cables", slug: "clutch-cables", description: "Clutch plates, pressure plates, clutch cables, accelerator cables", iconName: "Activity" },
  { id: "cat-8", name: "Suspension & Steering", slug: "suspension-steering", description: "Fork seals, shock absorbers, racer ball sets, swing arm bushes", iconName: "Compass" },
  { id: "cat-9", name: "Body & Aesthetics", slug: "body-aesthetics", description: "Rear view mirrors, levers, visors, mudguards, indicators", iconName: "Shield" },
  { id: "cat-10", name: "Rider Accessories", slug: "rider-accessories", description: "Helmets, crash guards, saddle stays, tank grips, mobile mounts", iconName: "HardHat" },
];

export const SEED_BRANDS: Brand[] = [
  { id: "brand-1", name: "Hero Genuine", origin: "India", isOem: true },
  { id: "brand-2", name: "Honda Genuine", origin: "Japan/India", isOem: true },
  { id: "brand-3", name: "Bajaj Genuine", origin: "India", isOem: true },
  { id: "brand-4", name: "TVS Genuine", origin: "India", isOem: true },
  { id: "brand-5", name: "Royal Enfield Genuine", origin: "India", isOem: true },
  { id: "brand-6", name: "Yamaha Genuine", origin: "Japan/India", isOem: true },
  { id: "brand-7", name: "Castrol", origin: "UK", isOem: false },
  { id: "brand-8", name: "Motul", origin: "France", isOem: false },
  { id: "brand-9", name: "Bosch", origin: "Germany", isOem: false },
  { id: "brand-10", name: "MRF Tyres", origin: "India", isOem: false },
  { id: "brand-11", name: "CEAT", origin: "India", isOem: false },
  { id: "brand-12", name: "Endurance", origin: "India", isOem: false },
  { id: "brand-13", name: "Exide", origin: "India", isOem: false },
  { id: "brand-14", name: "Rolon Chains", origin: "India", isOem: false },
];

export const SEED_BIKE_MODELS: BikeModel[] = [
  { id: "bike-1", name: "Hero Splendor Plus", brand: "Hero", engineCc: 97, yearRange: "2018-2024", type: "Commuter" },
  { id: "bike-2", name: "Hero HF Deluxe", brand: "Hero", engineCc: 97, yearRange: "2019-2024", type: "Commuter" },
  { id: "bike-3", name: "Honda Activa 6G", brand: "Honda", engineCc: 109, yearRange: "2020-2024", type: "Scooter" },
  { id: "bike-4", name: "Honda Shine 125", brand: "Honda", engineCc: 124, yearRange: "2019-2024", type: "Commuter" },
  { id: "bike-5", name: "Bajaj Pulsar 150", brand: "Bajaj", engineCc: 149, yearRange: "2017-2024", type: "Commuter" },
  { id: "bike-6", name: "Bajaj Pulsar NS200", brand: "Bajaj", engineCc: 199, yearRange: "2018-2024", type: "Sports" },
  { id: "bike-7", name: "TVS Apache RTR 160", brand: "TVS", engineCc: 159, yearRange: "2019-2024", type: "Sports" },
  { id: "bike-8", name: "TVS Jupiter 125", brand: "TVS", engineCc: 124, yearRange: "2021-2024", type: "Scooter" },
  { id: "bike-9", name: "Royal Enfield Classic 350", brand: "Royal Enfield", engineCc: 349, yearRange: "2021-2024", type: "Cruiser" },
  { id: "bike-10", name: "Royal Enfield Hunter 350", brand: "Royal Enfield", engineCc: 349, yearRange: "2022-2024", type: "Cruiser" },
  { id: "bike-11", name: "Yamaha R15 V4", brand: "Yamaha", engineCc: 155, yearRange: "2021-2024", type: "Sports" },
  { id: "bike-12", name: "Suzuki Access 125", brand: "Suzuki", engineCc: 124, yearRange: "2020-2024", type: "Scooter" },
];
