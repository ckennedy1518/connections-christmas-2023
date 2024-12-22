// Author: Christopher Kennedy
// Date: 12-22-24

import React from 'react';
import { Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { getValuesInStringList } from './Helpers/get-values-in-string-list';

interface IDisplayRemainingValuesProps {
    values: Values;
    selected: number[];
    setSelected: (selected: number[]) => void;
    order: number[];
}

export const DisplayRemainingValues: React.FC<IDisplayRemainingValuesProps> = props => {
    const { values, selected, setSelected, order } = props;

    const valsToDisplayInButtons = getValuesInStringList(values);
    if (order.length !== valsToDisplayInButtons.length) {
        return <>order.length !== valsToDisplayInButtons.length</>;
    }

    return (
        <div className="_gridOfAllButtons">
            {order.map(value => {
                // order looks like [2,4,3,5,7,1,6,0] (e.g. if two categories left)
                // 0,1,2,3 are one category, 4,5,6,7 another
                // indexFromOrder represents the non-randomized value so we can check if guess is correct
                const indexFromOrder = order[value];
                const onClick = () => {
                    let toSetSelected = selected;
                    if (selected.includes(indexFromOrder)) {
                        // de-selecting
                        toSetSelected = selected.filter(num => num !== indexFromOrder);
                    } else {
                        toSetSelected.push(indexFromOrder);
                    }
                    setSelected(toSetSelected);
                };
                return <OptionButton onClick={onClick} caption={valsToDisplayInButtons[value]} cssClass="" />;
            })}
        </div>
    );
}