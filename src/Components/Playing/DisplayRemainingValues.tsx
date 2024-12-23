// Author: Christopher Kennedy
// Date: 12-22-24

import React, { useCallback } from 'react';
import { Category, Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { getValuesInStringList } from './Helpers/get-values-in-string-list';
import "../../Styles/_Buttons.css"

interface IDisplayRemainingValuesProps {
    values: Values;
    selected: number[];
    setSelected: (selected: number[]) => void;
    order: number[];
    correctSoFar: Category[];
}

export const DisplayRemainingValues: React.FC<IDisplayRemainingValuesProps> = props => {
    const { values, selected, setSelected, order, correctSoFar } = props;

    // index represents the non-randomized value so we can check if guess is correct
    // we account later for if yellow/green/some other category has already been guessed correctly.
    const onButtonClick = useCallback((index: number) => {
        let toSetSelected;
        if (selected.includes(index)) {
            // de-selecting
            toSetSelected = selected.filter(num => num !== index);
        } else {
            // only 4 guesses can be selected at once
            if (selected.length === 4) {
                return;
            }

            // need this rather than push with mutability for re-rendering
            toSetSelected = [...selected, index];
        }
        setSelected(toSetSelected);
    }, [selected, setSelected]);

    // This is a mapping between the randomized values and the value we should be displaying.
    const valsToDisplayInButtons = getValuesInStringList(values, correctSoFar);
    if (order.length !== valsToDisplayInButtons.length) {
        return null;
    }
    
    return (
        <div className="_gridOfAllButtons">
            {order.map(value => {
                let cssClass = "_unselectedButton";
                if (selected.includes(value)) {
                    cssClass = "_selectedButton";
                }

                return (
                    <OptionButton
                        onClick={() => onButtonClick(value)}
                        caption={valsToDisplayInButtons[value]}
                        cssClass={cssClass}
                        dontApplyButtonWrapper
                    />
                );
            })}
        </div>
    );
}