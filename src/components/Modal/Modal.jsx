import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        {children}
        <button className={css.buttonClose} type="button" onClick={onClose}>
          <AiOutlineCloseCircle className={css.svg} />
        </button>
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
};
