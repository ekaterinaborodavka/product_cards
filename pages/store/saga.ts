import { all, put, takeLatest } from "redux-saga/effects";
import { actionTypes, Product, ProductResponse } from "./types";
import {
  setProducts,
  setProductsError,
  deleteProduct,
  addProductToCard,
} from "./slice";

function* loadProductsSaga() {
  try {
    const res: ProductResponse = yield fetch(
      "https://dummyjson.com/products?limit=10"
    ).then((res) => res.json());
    yield put(setProducts(res.products));
  } catch (err) {
    yield put(setProductsError("Error loading data"));
  }
}

function* DeleteProductSaga(action: { type: typeof actionTypes; id: number }) {
  try {
    yield fetch(`https://dummyjson.com/products/${action.id}`, {
      method: "DELETE",
    });
    yield put(deleteProduct(action.id));
  } catch (err) {
    yield put(setProductsError("Product deletion error"));
  }
}

function* AddProductOnCardSaga(action: {
  type: typeof actionTypes;
  productsCard: Product[];
}) {
  try {
    yield put(addProductToCard(action.productsCard));
  } catch (err) {
    yield put(setProductsError("Add product error"));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_PRODUCTS, loadProductsSaga),
    takeLatest(actionTypes.DELETE_PRODUCTS, DeleteProductSaga),
    takeLatest(actionTypes.ADD_PRODUCTS_TO_CARD, AddProductOnCardSaga),
  ]);
}

export default rootSaga;
