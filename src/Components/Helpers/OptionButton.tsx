// Author: Christopher Kennedy
// Date: 12-17-24

import React from 'react';
import "../../Styles/_Buttons.css";

interface IOptionButtonProps {
    onClick: () => void;
    cssClass: string;
    caption: string;
}

export const OptionButton: React.FC<IOptionButtonProps> = props => {
    const { onClick, cssClass, caption } = props;    
    return <div className="_buttonWrapper">
        <button onClick={onClick} className={cssClass}>{caption}</button>
    </div>;
}