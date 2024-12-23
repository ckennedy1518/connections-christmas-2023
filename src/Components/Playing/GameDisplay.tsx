// Author: Christopher Kennedy
// Date: 12-19-24

import React, { useCallback, useEffect, useState } from 'react';
import { Category, Stage, Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { shuffleOrder } from '../../functions/shuffle-order';
import { GridOfButtons } from './GridOfButtons';
import { guess } from '../../functions/guess';
import "../../Styles/_Buttons.css";
import { VerticalSpacer } from '../Helpers/VerticalSpacer';

interface IGameDisplayProps {
    values: Values;
    setStage: (stage: Stage) => void;
}

export const GameDisplay: React.FC<IGameDisplayProps> = props => {
    const { values, setStage } = props;
    const [selected, setSelected] = useState([] as number[]);
    const [order, setOrder] = useState(shuffleOrder(16, selected));
    const [canSelectSubmitButton, setCanSelectSubmitButton] = useState(false);
    const [correctSoFar, setCorrectSoFar] = useState([] as Category[]);
    const [isOneAway, setIsOneAway] = useState(false);
    const [shouldShowSubmittedError, setShouldShowSubmittedError] = useState(false);

    const onGoBackClick = () => { setStage("PlayEntry"); };
    const onDeselectAllClick = () => {
        setSelected([]);
    };
    const onShuffleClick = useCallback(() => {
        setOrder(shuffleOrder(16 - correctSoFar.length * 4, selected));
    }, [correctSoFar.length, selected]);
    const onSubmitClick = () => {
        if (!canSelectSubmitButton) {
            setShouldShowSubmittedError(true);
            setTimeout(() => {
                setShouldShowSubmittedError(false);
            }, 2000);
            return;
        }

        guess(selected, values, correctSoFar, setCorrectSoFar, setIsOneAway, setSelected, setOrder);
    };

    useEffect(() => {
        // don't allow selection during one away for timing displaying the result of guesses.
        // might be slightly annoying the user has to wait 2 seconds to guess again, but at least they will
        // be told accurately if their guess was one away.
        setCanSelectSubmitButton(!isOneAway && selected.length === 4);
    }, [selected, isOneAway]);
    
    return (
        <div>
            <GridOfButtons values={values} correctSoFar={correctSoFar} selected={selected} setSelected={setSelected} order={order} />
            <VerticalSpacer height={10} />
            <div className="_gameButtons">
                <OptionButton onClick={onGoBackClick} caption="Return to game select" cssClass="_navigationButton" />
                <OptionButton onClick={onDeselectAllClick} caption="Deselect all" cssClass="_navigationButton" />
                <OptionButton onClick={onShuffleClick} caption="Shuffle" cssClass="_navigationButton" />
                <OptionButton onClick={onSubmitClick} caption="Submit" cssClass="_navigationButton" />
            </div>
            {isOneAway && <span className="_saveErrorMessage">One away!</span>}
            <VerticalSpacer height={3} />
            {shouldShowSubmittedError && <span className="_saveErrorMessage">You must select four values to submit.</span>}
        </div>
    );
}
