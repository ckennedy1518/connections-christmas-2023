// Author: Christopher Kennedy
// Date: 12-22-24

import React from 'react';
import "../../Styles/_Playing.css";

interface IMistakesProps {
    mistakesRemaining: number;
}

export const Mistakes: React.FC<IMistakesProps> = props => {
    const { mistakesRemaining } = props;
    
    // This is yuck, but I am tired and don't want to research react syntax
    let mistakeDots: JSX.Element | null = null;
    switch (mistakesRemaining) {
        case (1):
            mistakeDots = <span className="_mistakeDot"></span>;
            break;
        case (2):
            mistakeDots = <>
                <span className="_mistakeDot"></span>
                <div className="_rightPadding"></div>
                <span className="_mistakeDot"></span>
            </>;
            break;
        case (3):
            mistakeDots = <>
                <span className="_mistakeDot"></span>
                <div className="_rightPadding"></div>
                <span className="_mistakeDot"></span>
                <div className="_rightPadding"></div>
                <span className="_mistakeDot"></span>
            </>;
            break;
        case (4):
            mistakeDots = <>
                <span className="_mistakeDot"></span>
                <div className="_rightPadding"></div>
                <span className="_mistakeDot"></span>
                <div className="_rightPadding"></div>
                <span className="_mistakeDot"></span>
                <div className="_rightPadding"></div>
                <span className="_mistakeDot"></span>
            </>;
            break;
    }

    return (
        <div className="_flexRow">
            <span className="_mistakesLabel">Mistakes Remaining:</span>
            {mistakeDots}
        </div>
    );
}