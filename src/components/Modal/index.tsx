import React from "react";
import styles from "@styles/components/Modal.module.scss";

interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  setModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, isOpen, setModal }) => {
  const closeModal = () => {
    setModal(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modalContent}>
              <h2>{title}</h2>
              <p>{content}</p>
              <button className={styles.closeModal} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
