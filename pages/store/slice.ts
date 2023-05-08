import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductCard } from "./types";

const initialState: {
  products: Product[];
  error: string;
  card: ProductCard[];
} = {
  products: [],
  error: "",
  card: [],
};

export const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (prod) => prod.id !== action.payload
      );
      state.card = state.card.filter(
        (prod) => prod.id !== action.payload
      );
    },
    addProductToCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductsError,
  deleteProduct,
  addProductToCard,
} = slice.actions;
export default slice.reducer;
