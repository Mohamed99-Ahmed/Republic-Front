export interface User {
    _id: string;
    name: string;
    email: string;
    phone: number;
    location: string;
    role: string;
    passwordChangedAt: string;
  }
  
  export interface Category {
    createdAt: string;
    _id: string;
    categoryName: string;
    countProducts: number;
    id: string;
  }
  
  export interface Product {
    _id: string;
    name: string;
    price: number | { single: number; double: number };
    description?: string;
    createdAt: string;
    category: Category;
    imageCover?: string;
    id: string;
  }
  
  export interface Item {
    quantity: number;
    product: Product;
    _id: string;
    itemTotal: number | null;
    id: string;
  }
  
  export interface Order {
    _id: string;
    user: User;
    items: Item[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalPrice: number | null;
    id: string;
  }
  
  export interface ApiResponse {
    status: string;
    data: {
      data: Order;
    };
  }