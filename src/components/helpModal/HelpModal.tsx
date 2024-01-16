import { useRef } from "react";

import styles from "./HelpModal.module.css";
import { GoInfo } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

export interface IHelpModalProps {
  children?: JSX.Element | JSX.Element[] | string | null;
}

export default function HelpModal(
  { children }: IHelpModalProps = { children: null }
) {
  const Modal = useRef<null | HTMLDialogElement>(null);

  const OpenModal = () => {
    Modal.current!.showModal();
  };
  const CloseModal = () => {
    Modal.current!.close();
  };
  return (
    <>
      <button onClick={OpenModal} className={styles.openM}>
        <GoInfo />
      </button>
      <dialog ref={Modal} className={styles.modal}>
        <div className={styles.hbar}>
          <h3>commands</h3>
          <button onClick={CloseModal} className={styles.closeM}>
            <RxCross1 />
          </button>
        </div>
        <div className={styles.Details}>{children}</div>
      </dialog>
    </>
  );
}
