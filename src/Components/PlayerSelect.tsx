// Author: Christopher Kennedy
// Date: 11-30-23

import React from 'react';

type stage = {
    stage: string;
}

export const PlayerSelect: React.FC<stage> = props => {
    return <div>{props.stage}</div>;
}