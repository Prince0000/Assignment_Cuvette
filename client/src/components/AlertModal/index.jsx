import React from "react";
import "./AlertModal.css";

const AlertModal = ({ isOpen, message, type, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-modal-overlay">
      <div className={`alert-modal ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertModal;
