export const actionTypes = {
  LOAD_PRODUCTS: "LOAD_PRODUCTS",
  DELETE_PRODUCTS: "DELETE_PRODUCTS",
  ADD_PRODUCTS_TO_CARD: "ADD_PRODUCTS_TO_CARD",
};

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductCard {
  id: number;
  quantity: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
