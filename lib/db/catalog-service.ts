import { Category, Brand, BikeModel } from "@/types";
import { getDatabase, saveDatabase } from "./storage";
import { logAuditEvent } from "./settings-service";

export async function getCategories(): Promise<Category[]> {
  const db = getDatabase();
  return [...db.categories];
}

export async function getBrands(): Promise<Brand[]> {
  const db = getDatabase();
  return [...db.brands];
}

export async function getBikeModels(): Promise<BikeModel[]> {
  const db = getDatabase();
  return [...db.bikeModels];
}

export async function createCategory(cat: Omit<Category, "id">): Promise<Category> {
  const db = getDatabase();
  const newCat: Category = {
    ...cat,
    id: `cat-${Date.now()}`,
  };
  db.categories.push(newCat);
  saveDatabase(db);
  await logAuditEvent("CREATE_CATEGORY", `Added category: ${newCat.name}`);
  return newCat;
}

export async function createBrand(brand: Omit<Brand, "id">): Promise<Brand> {
  const db = getDatabase();
  const newBrand: Brand = {
    ...brand,
    id: `brand-${Date.now()}`,
  };
  db.brands.push(newBrand);
  saveDatabase(db);
  await logAuditEvent("CREATE_BRAND", `Added brand: ${newBrand.name}`);
  return newBrand;
}

export async function createBikeModel(model: Omit<BikeModel, "id">): Promise<BikeModel> {
  const db = getDatabase();
  const newModel: BikeModel = {
    ...model,
    id: `bike-${Date.now()}`,
  };
  db.bikeModels.push(newModel);
  saveDatabase(db);
  await logAuditEvent("CREATE_BIKE_MODEL", `Added bike model: ${newModel.name}`);
  return newModel;
}
