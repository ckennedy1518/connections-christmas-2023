// Author: Christopher Kennedy
// Date: 12-17-24

import React, { ReactNode } from 'react';
import "../../Styles/_Modal.css"

interface IModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose?: () => void;
}

export const Modal: React.FC<IModalProps> = props => {
    const { isOpen, children, onClose } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};