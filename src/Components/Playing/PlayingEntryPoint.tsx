// Author: Christopher Kennedy
// Date: 12-19-24

import React, { useCallback, useState } from 'react';
import { SaveResult, Stage, Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { getGameValues } from '../../functions/get-game-values';
import { GameDisplay } from './GameDisplay';
import { getDummyValues } from './Helpers/get-dummy-values';

interface IPlayingEntryPointProps {
    setStage: (stage: Stage) => void;
}

export const PlayingEntryPoint: React.FC<IPlayingEntryPointProps> = props => {
    const { setStage } = props;
    const [isPlayingGame, setIsPlayingGame] = useState(false);
    const [values, setValues] = useState(getDummyValues());
    const [apiResult, setApiResult] = useState(SaveResult.NotCalledYet);
    const GAME_SELECT_TEXTBOX_ID = "gameSelect";

    const onGoBackClick = () => { setStage("GameTypeSelect"); };
    const onSelectClick = useCallback(async () => { 
        const text = document.getElementById(GAME_SELECT_TEXTBOX_ID) as HTMLTextAreaElement;
        const fileName = text?.value;
        callBackHelper(fileName, setValues, setApiResult, setIsPlayingGame);
    }, []);
    const onDefaultClick = useCallback(async () => {
        callBackHelper("Default", setValues, setApiResult, setIsPlayingGame);
    }, []);

    return <>
        What game would you like to play?
        <textarea id={GAME_SELECT_TEXTBOX_ID} />
        <OptionButton onClick={onGoBackClick} caption="Go back" cssClass="" />
        <OptionButton onClick={onSelectClick} caption="Select" cssClass="" />
        <OptionButton onClick={onDefaultClick} caption="Christopher's Default Game" cssClass="" />
        {isPlayingGame && <GameDisplay values={values} setStage={setStage} setIsPlayingGame={setIsPlayingGame} />}
        {apiResult === SaveResult.NoGameFound && "Game not found, please try again."}
        {apiResult === SaveResult.BadString && "That game is not valid"}
    </>;
}

async function callBackHelper(
    fileName: string,
    setValues: (values: Values) => void,
    setApiResult: (apiResult: SaveResult) => void,
    setIsPlayingGame: (isPlayingGame: boolean) => void
): Promise<void> {
    const didGetValues = await getGameValues(fileName, setValues);

    if (didGetValues === SaveResult.NoGameFound) {
        setApiResult(didGetValues);
        // don't show error text forever
        setTimeout(() => {
            setApiResult(SaveResult.NotCalledYet);
        }, 5000);
    } else if (didGetValues === SaveResult.Good) {
        setApiResult(didGetValues);
        setIsPlayingGame(true);
    }
}