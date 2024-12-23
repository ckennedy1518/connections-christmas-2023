// Author: Christopher Kennedy
// Date: 12-22-24

import React from 'react';
import { Category } from '../../Utilities/types';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';

interface IGameDisplayProps {
    category: Category;
}

export const CorrectColor: React.FC<IGameDisplayProps> = props => {
    const { category } = props;

    let className = "";
    switch (category.color) {
        case ("Yellow"):
            className = "_yellowCorrectBanner";
            break;
        case ("Green"):
            className = "_greenCorrectBanner";
            break;
        case ("Blue"):
            className = "_blueCorrectBanner";
            break;
        case ("Purple"):
            className = "_purpleCorrectBanner";
            break;
    }
    
    return (
        <>
            <div className={className + " _correctBannerContainer"}>
                <h3 className="_categoryDescription">{category.categoryDesc}</h3>
                <span className="_categoryValuesRight">{category.value1}, {category.value2}, {category.value3}, {category.value4}</span>
            </div>
            <VerticalSpacer height={5} />
        </>
    );
}
