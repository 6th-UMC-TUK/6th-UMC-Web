import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, setModalOpen }) {
  const modalCloser = () => {
    setModalOpen(false);
  };
  return (
    <>
      {
        <div
          className="modal-wrapper"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <div className="modal">
            <div className="modal-title">안녕하세요</div>
            <p>모달 내용은 어쩌고 저쩌고..</p>
            <div className="close-wrapper">
              <button id="close" onClick={modalCloser}>
                닫기
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Modal;
