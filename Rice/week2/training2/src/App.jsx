import { useState } from "react";
import Modal from "./components/Modal.jsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const modalOpener = () => {
    setModalOpen(true);
  };
  return (
    <>
      <h1>안녕하세요</h1>
      <p>내용내용내용</p>
      <button onClick={modalOpener}>버튼 열기</button>
      <Modal isOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default App;
