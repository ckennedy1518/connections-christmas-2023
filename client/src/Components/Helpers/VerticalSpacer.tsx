// Author: Christopher Kennedy
// Date: 12-17-24

import React from 'react';

interface IPlayerSelectProps {
    height: number;
}

export const VerticalSpacer: React.FC<IPlayerSelectProps> = props => {
    const { height } = props;
    
    return <div style={{ height: height, display: "hidden" }}></div>;
}