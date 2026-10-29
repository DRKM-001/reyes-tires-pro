// Contract shared by the website and the /api endpoints (functions/api).
// A future backend (inventory, CRM, booking) should keep these shapes.

export type Lang = "en" | "es";
export type Condition = "used" | "new" | "either";

export interface QuoteRequest {
  mode?: "tires" | "wheels" | "package"; // default "tires"
  size: string;            // tire size, e.g. "225/45R17" (optional for wheels / package)
  wheelSize?: string;      // wheels / package: rim diameter, e.g. "20"
  style?: string;          // wheels / package: finish, e.g. "black"
  qty: 1 | 2 | 4;
  condition: Condition;
  name?: string;
  phone?: string;
  vehicle?: string;        // e.g. "2019 Honda Civic"
  notes?: string;
  lang: Lang;
  source?: string;         // page path the request came from
}

export interface QuoteResponse {
  ok: true;
  id: string;              // reference for the shop
  whatsappUrl: string;     // prefilled chat, the main way the shop answers today
  delivered: string[];     // where the lead was sent, e.g. ["webhook", "email"]; empty until a backend is connected
}

export interface ApiError {
  ok: false;
  error: string;           // machine code, e.g. "invalid_size"
  message: string;         // human-readable
}

export interface ShopInfo {
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  crossStreets: string;
  languages: Lang[];
  hours: { day: number; opens: string; closes: string }[];
  rating: { value: string; count: number; source: "google" };
  links: { maps: string; reviews: string; instagram: string; yelp: string };
}

export interface HoursResponse {
  timeZone: string;
  open: boolean;
  closesAt?: string;       // "18:00"
  opensAt?: string;        // next opening, ISO weekday + time, e.g. "Thu 08:00"
  whatsappAnytime: true;
}

export interface InventoryItem {
  id: string;
  size: string;
  brand: string;
  model?: string;
  condition: "used" | "new";
  treadDepth32?: number;   // used tires: tread left, in 32nds
  dotYear?: number;
  qtyAvailable: number;
  priceEach?: number;      // USD; omitted when the shop prefers "call for price"
  photos?: string[];
}

export interface InventoryResponse {
  status: "ok" | "not_connected";
  query: { size?: string; condition?: Condition };
  items: InventoryItem[];
}
