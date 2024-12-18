// Author: Christopher Kennedy
// Date: 12-17-24

import React from 'react';

interface IOptionButtonProps {
    onClick: () => void;
    cssClass: string;
    caption: string
}

export const OptionButton: React.FC<IOptionButtonProps> = props => {
    const { onClick, cssClass, caption } = props;    
    return <button onClick={onClick} className={cssClass}>{caption}</button>;
}