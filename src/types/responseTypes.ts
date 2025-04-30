export interface User {
    _id?: string;
    name?: string;
    email?: string;
    phone?: number;
    location?: string;
    role?: string;
    passwordChangedAt?: string;
    photo?:string
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
    choice:string,
    size:string
  }

  export interface CartType {
    _id: string;
    id: string;
    user: User;
    items: Item[];
    totalPrice: number;
    __v: number;
    description?: string;
  }
  export interface OrderType {
    _id: string;
    user: User;
    cart: CartType;
    cartCopy: CartType;
    items: Item[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    price: number | null;
    id: string;
    paid:boolean
  
  }
  
