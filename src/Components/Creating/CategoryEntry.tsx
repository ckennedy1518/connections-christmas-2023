// Author: Christopher Kennedy
// Date: 12-17-24

import React from 'react';
import { Color } from '../../Utilities/types';

interface IPlayerSelectProps {
    color: Color;
}

export const CategoryEntry: React.FC<IPlayerSelectProps> = props => {
    const { color } = props;
    
    return <div>
        <textarea id={color + "1"} placeholder="Entry 1" className="_textArea" />
        <textarea id={color + "2"} placeholder="Entry 2" className="_textArea" />
        <textarea id={color + "3"} placeholder="Entry 3" className="_textArea" />
        <textarea id={color + "4"} placeholder="Entry 4" className="_textArea" />
        <textarea id={color + "5"} placeholder="Category Description" className="_textArea" />
    </div>;
}