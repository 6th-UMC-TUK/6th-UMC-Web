import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from '../redux/modalSlice';
import { clearCart } from '../redux/cartSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  background: #d9534f;
  color: white;
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;
`;

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>정말로 비우시겠습니까?</h2>
        <div>
          <ConfirmButton onClick={() => {
            dispatch(clearCart());
            dispatch(closeModal());
          }}>네</ConfirmButton>
          <CancelButton onClick={() => dispatch(closeModal())}>아니요</CancelButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
