import React from "react";

function Modal({ element, onClose, value, title }) {
  return (
    // <div
    //   id="open-modal"
    //   class="modal-window"
    //   style={
    //     value
    //       ? { visibility: "visible", opacity: "1", pointerEvents: "auto" }
    //       : {}
    //   }
    // >
    //   <div>
    //     <a href="#" onClick={() => onClose(false)} id="modelClose">
    //       <img src="/static/images/close.png" />
    //     </a>
    //     {element}
    //   </div>
    // </div>
     <div
      class="modal"
      tabindex="-1"
      style={
        value
          ? { display:'block', visibility: "visible", opacity: "1", pointerEvents: "auto" }
          : {}
      }
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              onClick={() => onClose()}
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              {element}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Modal;
