// Author: Christopher Kennedy
// Date: 12-22-24

import React from 'react';
import { Category, Values } from '../../Utilities/types';
import { CorrectColor } from './CorrectColor';
import { DisplayRemainingValues } from './DisplayRemainingValues';

interface IGameDisplayProps {
    values: Values;
    correctSoFar: Category[];
    selected: number[];
    setSelected: (selected: number[]) => void;
    order: number[];
}

export const GridOfButtons: React.FC<IGameDisplayProps> = props => {
    const { values, correctSoFar, selected, setSelected, order } = props;

    return (
        <div>
            {correctSoFar.map(category => {
                return <CorrectColor category={category} />;
            })}

            <DisplayRemainingValues values={values} selected={selected} setSelected={setSelected} order={order} />
        </div>
    );
}