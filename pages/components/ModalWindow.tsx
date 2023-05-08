import { Modal, ModalDialog, ModalHeader, ModalClose } from "../style";

interface IModalWindow {
  showModalWindow: () => void;
  title: string;
  children: JSX.Element;
}

const ModalWindow = ({ showModalWindow, title, children }: IModalWindow) => {
  return (
    <Modal>
      <ModalDialog>
        <ModalHeader>
          <h3>{title}</h3>
          <ModalClose onClick={showModalWindow}>&times;</ModalClose>
        </ModalHeader>
        {children}
      </ModalDialog>
    </Modal>
  );
};

export default ModalWindow;
