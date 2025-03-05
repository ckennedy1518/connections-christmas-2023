// Author: Christopher Kennedy
// Date: 12-19-24

import React, { useCallback, useEffect, useState } from 'react';
import { Category, Color, Stage, Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { shuffleOrder } from '../../functions/shuffle-order';
import { GridOfButtons } from './GridOfButtons';
import { guess } from '../../functions/guess';
import "../../Styles/_Buttons.css";
import { VerticalSpacer } from '../Helpers/VerticalSpacer';
import { Mistakes } from './Mistakes';
import { reveal } from '../../functions/reveal';
import { getGuessString } from '../../functions/helpers/get-guess-string';

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
    const [shouldShowAlreadyGuessedError, setShouldShowAlreadyGuessedError] = useState(false);
    const [mistakesRemaining, setMistakesRemaining] = useState(4);
    const [haveAnswersBeenRevealed, setHaveanswersBeenRevealed] = useState(false);
    const [guesses, setGuesses] = useState([] as string[]);

    const onGoBackClick = () => { setStage("PlayEntry"); };
    const onDeselectAllClick = () => {
        setSelected([]);
    };
    const onShuffleClick = useCallback(() => {
        setOrder(shuffleOrder(16 - correctSoFar.length * 4, selected));
    }, [correctSoFar.length, selected]);
    const onSubmitClick = useCallback(() => {
        if (!canSelectSubmitButton) {
            setShouldShowSubmittedError(true);
            setTimeout(() => {
                setShouldShowSubmittedError(false);
            }, 2000);
            return;
        }

        if (guesses.includes(getGuessString(selected, values, correctSoFar))) {
            setShouldShowAlreadyGuessedError(true);
            setTimeout(() => {
                setShouldShowAlreadyGuessedError(false);
            }, 2000);
            return;
        }

        guess(selected, values, correctSoFar, mistakesRemaining, guesses, setCorrectSoFar, setIsOneAway, setSelected, setOrder, setMistakesRemaining, setGuesses);
    }, [canSelectSubmitButton, correctSoFar, mistakesRemaining, guesses, selected, values]);
    const onRevealAnswersClick = useCallback(() => {
        setHaveanswersBeenRevealed(true);
        let delay = 0;
        for (const color of Object.values(Color)) {
            if (!correctSoFar.some(v => v.color === color)) {
                setTimeout(() => {
                    reveal(color, values, correctSoFar, setCorrectSoFar, setOrder);
                }, delay);
                delay += 1000;
            }
        }
    }, [correctSoFar, values]);

    useEffect(() => {
        // don't allow selection during one away for timing displaying the result of guesses.
        // might be slightly annoying the user has to wait 2 seconds to guess again, but at least they will
        // be told accurately if their guess was one away.
        setCanSelectSubmitButton(!isOneAway && selected.length === 4);
    }, [selected, isOneAway]);
    
    return (
        <div>
            <GridOfButtons values={values} correctSoFar={correctSoFar} selected={selected} setSelected={setSelected} order={order} />
            <VerticalSpacer height={20} />
            <Mistakes mistakesRemaining={mistakesRemaining} />
            <VerticalSpacer height={20} />
            {mistakesRemaining > 0 ? (
                <div className="_gameButtons">
                    <OptionButton onClick={onGoBackClick} caption="Return to game select" cssClass="_navigationButton" />
                    <OptionButton onClick={onDeselectAllClick} caption="Deselect all" cssClass="_navigationButton" />
                    <OptionButton onClick={onShuffleClick} caption="Shuffle" cssClass="_navigationButton" />
                    <OptionButton onClick={onSubmitClick} caption="Submit" cssClass="_navigationButton" />
                </div>
            ) : (
                <div className="_gameButtons">
                    <OptionButton onClick={onGoBackClick} caption="Return to game select" cssClass="_navigationButton" />
                    {!haveAnswersBeenRevealed && <OptionButton onClick={onRevealAnswersClick} caption="Reveal Answers" cssClass="_navigationButton" />}
                </div>
            )}
            {isOneAway && <span className="_saveErrorMessage">One away!</span>}
            <VerticalSpacer height={3} />
            {shouldShowSubmittedError && <span className="_saveErrorMessage">You must select four values to submit.</span>}
            {shouldShowAlreadyGuessedError && <span className="_saveErrorMessage">Already guessed!</span>}
        </div>
    );
}
