import { useEffect } from "react";

export default function Modal({ isOpen, setModalOpen }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
      document.body.style.backgroundColor = "";
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="openModal">
      <div className="modal">
        <h2 className="modalTitle">안녕하세요</h2>
        <h4 className="modalText">모달 내용은 어쩌고 저쩌고..</h4>
      </div>
      <div className="closeModal">
      <button id="closeBtn" onClick={() => setModalOpen(false)} style={{ fontSize: "13px" }}>닫기</button>
      </div>
    </div>
  );
}
