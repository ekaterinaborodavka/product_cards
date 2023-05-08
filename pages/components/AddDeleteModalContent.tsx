import { useState, useCallback } from "react";
import { ModalContent, Button, ErrorQuantity } from "../style";

interface IAddDeleteProductModal {
  maxQuantity: number;
  maxQuantityForDelete: number;
  addProductToCard: (quantity: number) => void;
  deleteProductFromCard: (quantity: number) => void;
  errorQuantity: boolean;
  deleteModal: boolean;
}

const AddDeleteModalContent = ({
  maxQuantity,
  addProductToCard,
  errorQuantity,
  deleteModal,
  maxQuantityForDelete,
  deleteProductFromCard,
}: IAddDeleteProductModal) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
    },
    [setValue]
  );

  return (
    <ModalContent>
      {errorQuantity && (
        <ErrorQuantity>Not enough products in stock</ErrorQuantity>
      )}
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        max={deleteModal ? maxQuantityForDelete : maxQuantity}
      />
      {deleteModal ? (
        <Button onClick={() => deleteProductFromCard(value)}>Delete</Button>
      ) : (
        <Button isAddButton onClick={() => addProductToCard(value)}>
          Add
        </Button>
      )}
    </ModalContent>
  );
};

export default AddDeleteModalContent;
