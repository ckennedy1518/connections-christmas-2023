// Author: Christopher Kennedy
// Date: 12-19-24

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Category, Stage, Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { shuffleOrder } from '../../functions/shuffle-order';
import { GridOfButtons } from './GridOfButtons';
import { guess } from '../../functions/guess';

interface IGameDisplayProps {
    values: Values;
    setStage: (stage: Stage) => void;
}

export const GameDisplay: React.FC<IGameDisplayProps> = props => {
    const { values, setStage } = props;
    const [selected, setSelected] = useState([] as number[]);
    const [order, setOrder] = useState(shuffleOrder(16, selected));
    const canSelectSubmitButton = useRef<boolean>(false);
    const submitButtonCSS = useRef<string>("");
    const [correctSoFar, setCorrectSoFar] = useState([] as Category[]);
    const [isOneAway, setIsOneAway] = useState(false);


    const onGoBackClick = () => { setStage("PlayEntry"); };
    const onDeselectAllClick = () => {
        setSelected([]);
    };
    const onShuffleClick = useCallback(() => {
        setOrder(shuffleOrder(16 - correctSoFar.length * 4, selected));
    }, [correctSoFar.length, selected]);
    const onSubmitClick = () => {
        if (!canSelectSubmitButton?.current) {
            return;
        }

        guess(selected, values, correctSoFar, setCorrectSoFar, setIsOneAway, setSelected, setOrder);
        if (correctSoFar.length === 4) {
            setStage("Finished");
        }
    };

    useEffect(() => {
        // don't allow selection during one away for timing displaying the result of guesses.
        // might be slightly annoying the user has to wait 2 seconds to guess again, but at least they will
        // be told accurately if their guess was one away.
        if (canSelectSubmitButton) {
            canSelectSubmitButton.current = (!isOneAway && selected.length === 4);
        }
    }, [selected, isOneAway]);

    useEffect(() => {
        if (submitButtonCSS) {
            submitButtonCSS.current = canSelectSubmitButton?.current  ? "_canSelect" : "_cannotSelect";
        }
    }, [submitButtonCSS, canSelectSubmitButton]);
    
    return (
        <div>
            <GridOfButtons values={values} correctSoFar={correctSoFar} selected={selected} setSelected={setSelected} order={order} />

            <OptionButton onClick={onGoBackClick} caption="Return to game select" cssClass="" />
            <OptionButton onClick={onDeselectAllClick} caption="Deselect all" cssClass="" />
            <OptionButton onClick={onShuffleClick} caption="Shuffle" cssClass="" />
            <OptionButton onClick={onSubmitClick} caption="Submit" cssClass={submitButtonCSS.current} />
            {isOneAway && "One away!"}
        </div>
    );
}
