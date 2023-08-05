import React from "react";

const Modal = ({ imageURL, onClose }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={onClose} onKeyDown={(e) => handleKeyDown(e)} tabIndex="0">
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <img src={imageURL} alt="Large version" />
      </div>
    </div>
  );
};

export default Modal;