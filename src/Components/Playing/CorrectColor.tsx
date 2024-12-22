// Author: Christopher Kennedy
// Date: 12-22-24

import React from 'react';
import { Category, Color } from '../../Utilities/types';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';

interface IGameDisplayProps {
    category: Category;
}

export const CorrectColor: React.FC<IGameDisplayProps> = props => {
    const { category } = props;
    
    return (
        <div>
            {category.color}
            <VerticalSpacer height={10} />
            {category.categoryDesc}
            <VerticalSpacer height={10} />
            {category.value1}, {category.value2}, {category.value3}, {category.value4}
        </div>
    );
}