"use client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Products from "./components/Products";
import { Main } from "./style";

const MyApp = () => {
  return (
    <Provider store={store}>
      <Main>
        <Products />
      </Main>
    </Provider>
  );
};

export default MyApp;
