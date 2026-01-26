// ACCOUNT TYPES
export interface User {
  uuid: string; // UUID
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password?: string; // Optional if using token-only logic later, but required for the form
}

export interface RegisterRequest extends LoginRequest {
  email: string;
}

export interface AuthResponse {
  access: string;  // The short-lived token for API calls
  refresh: string; // The long-lived token to get a new access token
  user: User;      // The actual User object we defined earlier
}

// INVENTORY TYPES
export type ItemStatus = 'FULL' | 'HALF' | 'LOW' | 'GONE';

export interface Category {
  uuid: string;
  name: string;
}

export interface Location {
  uuid: string;
  name: string;
  user: string; // User UUID
}

export interface BaseItem {
  uuid: string;
  name: string;
  category?: Category;
}

export interface PantryItem {
  uuid: string;
  item: BaseItem;
  location: Location;
  status: ItemStatus;
  expiry_date?: string; // ISO Date string from Django
}

export interface ListItem {
  uuid: string;
  name: string;
  is_checked: boolean;
  list?: string; // The UUID of the parent list
}

export interface GroceryList {
  uuid: string;
  name: string;
  created_at: string;
  items: ListItem[]; // The nested items
}