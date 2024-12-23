// Author: Christopher Kennedy
// Date: 12-17-24

import React from 'react';
import "../../Styles/_Buttons.css";

interface IOptionButtonProps {
    onClick: () => void;
    cssClass: string;
    caption: string;
    dontApplyButtonWrapper?: boolean;
}

export const OptionButton: React.FC<IOptionButtonProps> = props => {
    const { onClick, cssClass, caption, dontApplyButtonWrapper } = props;
    const className = dontApplyButtonWrapper ? "" : "_buttonWrapper"
    return <div className={className}>
        <button onClick={onClick} className={cssClass}>{caption}</button>
    </div>;
}