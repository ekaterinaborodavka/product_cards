import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductCard = styled.div`
  width: 600px;
  border: 1px solid gray;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
`;

export const ProductCardRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button<{ isAddButton?: boolean }>`
  border: none;
  color: ${(props) => (props.disabled ? "gray" : props.isAddButton ? "#006A4E" : "#e41b17")};
  background: transparent;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
`;

export const Error = styled.h3`
  color: #e41b17;
  margin-top: 50px;
`;

export const CardQuantity = styled.span`
  color: #31906e;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;
`;

export const ModalDialog = styled.div`
  width: 100%;
  max-width: 550px;
  background: white;
  position: relative;
  margin: 0 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: slide-in;
  animation-duration: 0.5s;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const ModalClose = styled.span`
  cursor: pointer;
  padding: 10px;
  margin: 0 0 0 auto;
  font-size: 30px;
`;

export const ModalContent = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
  input {
    width: 100%;
    margin-bottom: 20px;
  }
  margin-bottom: 30px;
`;

export const ErrorQuantity = styled.div`
  width: 100%;
  color: #e41b17;
  text-align: center;
  margin-bottom: 10px;
`;