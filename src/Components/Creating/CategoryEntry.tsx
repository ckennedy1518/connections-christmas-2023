// Author: Christopher Kennedy
// Date: 12-17-24

import React from 'react';
import { Color } from '../../Utilities/types';

interface IPlayerSelectProps {
    color: Color;
}

export const CategoryEntry: React.FC<IPlayerSelectProps> = props => {
    const { color } = props;
    
    return <>
        <textarea id={color + "1"} />
        <textarea id={color + "2"} />
        <textarea id={color + "3"} />
        <textarea id={color + "4"} />
        <textarea id={color + "5"} />
    </>;
}