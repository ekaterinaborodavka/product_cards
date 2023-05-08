import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  actionTypes,
  Product,
  ProductCard as ProductCardType,
} from "../store/types";
import { RootState } from "../store/store";
import ModalWindow from "./ModalWindow";
import AddDeleteModalContent from "./AddDeleteModalContent";
import {
  ProductCard,
  ProductCardRow,
  Error,
  Button,
  CardQuantity,
  ButtonsWrapper,
} from "../style";

const Products = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [errorQuantity, setErrorQuantity] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);
  const [currentProductInCard, setcurrentProductInCard] =
    useState<ProductCardType>({} as ProductCardType);
  const products = useSelector((state: RootState) => state.products);
  const card = useSelector((state: RootState) => state.card);
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    dispatch({ type: actionTypes.LOAD_PRODUCTS });
  }, []);

  const deleteProduct = useCallback(
    (id: number) => {
      dispatch({ type: actionTypes.DELETE_PRODUCTS, id });
    },
    [dispatch]
  );

  const addProductToCard = useCallback(
    (quantity: number) => {
      const newProductCard = {
        id: currentProduct.id,
        quantity,
      };
      const exists = card.find((prod) => currentProduct.id === prod.id);
      if (exists && currentProduct.stock < exists?.quantity + quantity) {
        setErrorQuantity(true);
      } else {
        const newCard = card.map((item) => {
          if (item.id === currentProduct.id) {
            return {
              id: item.id,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });

        dispatch({
          type: actionTypes.ADD_PRODUCTS_TO_CARD,
          productsCard: exists ? newCard : [...card, newProductCard],
        });
        showModalWindow();
      }
    },
    [dispatch, products, currentProduct, card]
  );

  const deleteProductFromCard = useCallback(
    (quantity: number) => {
      const newCard = card.map((item) => {
        if (item.id === currentProductInCard.id) {
          return {
            ...item,
            quantity: item.quantity - quantity,
          };
        }
        return item;
      });
      dispatch({
        type: actionTypes.ADD_PRODUCTS_TO_CARD,
        productsCard: newCard,
      });
      showModalWindow();
    },
    [dispatch, card, currentProductInCard]
  );

  const getQuantity = useCallback(
    (id: number) => {
      const quantity = card.find((item) => id === item.id)?.quantity;
      return quantity ? quantity : 0;
    },
    [card]
  );

  const showModalWindow = useCallback(() => {
    setShowModal((show) => !show);
    setErrorQuantity(false);
    setDeleteModal(false);
  }, [setShowModal]);

  const openModal = useCallback(
    (product: Product, isDelete?: boolean) => {
      showModalWindow();
      setCurrentProduct(product);
      if (isDelete) {
        const cardProduct = card.find((item) => product.id === item.id);
        setcurrentProductInCard(cardProduct!);
        setDeleteModal(true);
      }
    },
    [setShowModal, card]
  );

  const getTotalQuantity = useCallback(() => {
    return card.reduce((acc, item) => acc + item.quantity, 0);
  }, [card]);

  return (
    <>
      <h2>Card. Total quantity: {getTotalQuantity()}</h2>
      {error && <Error>{error}</Error>}
      {products &&
        products.map((prod) => (
          <ProductCard key={prod.id}>
            <ProductCardRow>
              <h3>{prod.title}</h3>
              <Button onClick={() => deleteProduct(prod.id)}>
                Delete product
              </Button>
            </ProductCardRow>
            <ProductCardRow>
              <span>Price: {prod.price}$</span>
              <span>Stock quantity: {prod.stock}</span>
              <CardQuantity>
                Quantity in cart: {getQuantity(prod.id)}
              </CardQuantity>
            </ProductCardRow>
            <ButtonsWrapper>
              <Button isAddButton onClick={() => openModal(prod)}>
                Add product to cart
              </Button>
              <Button onClick={() => openModal(prod, true)}>
                Delete product from the cart
              </Button>
            </ButtonsWrapper>
          </ProductCard>
        ))}
      {showModal && (
        <ModalWindow
          showModalWindow={showModalWindow}
          title={
            deleteModal
              ? "Delete a product from the carts"
              : "Add product to cart"
          }
        >
          <AddDeleteModalContent
            maxQuantity={currentProduct.stock}
            maxQuantityForDelete={
              currentProductInCard ? currentProductInCard.quantity : 0
            }
            addProductToCard={addProductToCard}
            errorQuantity={errorQuantity}
            deleteModal={deleteModal}
            deleteProductFromCard={deleteProductFromCard}
          />
        </ModalWindow>
      )}
    </>
  );
};

export default Products;
