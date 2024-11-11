import React from "react";
import PropTypes from "prop-types";
import "./_modal.scss";
import xMark from "./xMark.svg";

const Modal = ({ visible, modalId, setIsVisible, children, width, maxHeight }) => {
  let className = "modal fade ";
  let style = {};
  if (visible) {
    className += " show";
    style = { display: "block", paddingRight: "10px" };
  }

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={className}
      id={modalId}
      tabIndex="-1"
      aria-labelledby={"modalLabel" + modalId}
      aria-hidden="true"
      style={style}
    >
      <div className="modal-dialog tymodal">
        <div
          className="modal-content"
          style={{ width : width, maxHeight: maxHeight, overflow: 'auto' }}
        >
          <div className="modal-header border-0 p-0 justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
               
   
            </div>
            <img
              src={xMark}
              style={{ cursor: "pointer" }}
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};
Modal.defaultProps = {
  setIsVisible: () => {},
};
Modal.propTypes = {
  modalId: PropTypes.string,
  children: PropTypes.element,
  visible: PropTypes.bool,
};

export default Modal;
