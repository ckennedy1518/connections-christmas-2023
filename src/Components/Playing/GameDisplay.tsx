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
    const [order, setOrder] = useState(shuffleOrder(16, selected, setSelected));
    const submitButtonCSS = useRef<string>("");
    const [correctSoFar, setCorrectSoFar] = useState([] as Category[]);


    const onGoBackClick = () => { setStage("PlayEntry"); };
    const onDeselectAllClick = () => {
        setSelected([]);
    };
    const onShuffleClick = useCallback(() => {
        setOrder(shuffleOrder(16 - correctSoFar.length * 4, selected, setSelected));
    }, [correctSoFar.length, selected]);
    const onSubmitClick = () => {
        guess(selected, values);
    };

    useEffect(() => {
        submitButtonCSS.current = selected.length === 4 ? "_canSelect" : "_cannotSelect";
    }, [selected]);
    
    return (
        <div>
            <GridOfButtons values={values} correctSoFar={correctSoFar} selected={selected} setSelected={setSelected} order={order} />

            <OptionButton onClick={onGoBackClick} caption="Return to game select" cssClass="" />
            <OptionButton onClick={onDeselectAllClick} caption="Deselect all" cssClass="" />
            <OptionButton onClick={onShuffleClick} caption="Shuffle" cssClass="" />
            <OptionButton onClick={onSubmitClick} caption="Submit" cssClass={submitButtonCSS.current} />
        </div>
    );
}
