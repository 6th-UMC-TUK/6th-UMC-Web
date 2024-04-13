import { useState } from "react";
import Modal from "./components/Modal";
import "./App.css";


function App() {
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="container">
        <h1>안녕하세요!</h1>
        <h3>내용내용내용</h3>
        <div>
          <button className="openBtn" onClick={() => setModalOpen(true)}>버튼열기</button>
        </div>
      </div>
      <Modal isOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default App;