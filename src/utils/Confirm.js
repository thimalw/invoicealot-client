import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Confirm.css';

const Confirm = (options) => {
  options.customUI = ({ onClose }) => {
    return (
      <div className='confirm-alert'>
        <div className="confirm-alert-body">
          <h1 className="confirm-title">{options.title}</h1>
          <p className="confirm-message">{options.message}</p>
        </div>
        <div className="confirm-alert-actions">
          <div className="btn-row">
            {options.buttons.map((buttonData, i) =>
              <button
                key={i}
                className={buttonData.className ? buttonData.className : 'btn btn-primary'}
                onClick={!buttonData.onClick ? onClose : () => {
                  buttonData.onClick();
                  onClose();
                }}
              >
                {buttonData.label}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  };

  return confirmAlert(options);
};

export default Confirm;
