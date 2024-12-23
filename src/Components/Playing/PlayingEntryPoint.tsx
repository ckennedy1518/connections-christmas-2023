// Author: Christopher Kennedy
// Date: 12-19-24

import React, { useCallback, useRef, useState } from 'react';
import { SaveResult, Stage, Values } from '../../Utilities/types';
import { OptionButton } from '../Helpers/OptionButton';
import { getGameValues } from '../../functions/get-game-values';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';
import { ListOfGameOptionsPopup } from './ListOfGameOptionsPopup';
import { getListOfFiles } from '../../functions/get-list-of-files';

interface IPlayingEntryPointProps {
    setStage: (stage: Stage) => void;
    setValues: (values: Values) => void;
}

export const PlayingEntryPoint: React.FC<IPlayingEntryPointProps> = props => {
    const { setStage, setValues } = props;
    const [apiResult, setApiResult] = useState(SaveResult.NotCalledYet);
    const [shouldShowOptions, setShouldShowOptions] = useState(false);
    const fileList = useRef<string[]>([]);
    const GAME_SELECT_TEXTBOX_ID = "gameSelect";

    const onGoBackClick = () => { setStage("GameTypeSelect"); };
    const onViewOptions = useCallback(async () => {
        fileList.current = await getListOfFiles();
        setShouldShowOptions(true);
    }, []);
    const onSelectClick = useCallback(async () => {
        const text = document.getElementById(GAME_SELECT_TEXTBOX_ID) as HTMLTextAreaElement;
        const fileName = text?.value;
        callBackHelper(fileName, setValues, setApiResult, setStage);
    }, [setStage, setValues]);
    const onDefaultClick = useCallback(async () => {
        callBackHelper("Default", setValues, setApiResult, setStage);
    }, [setStage, setValues]);

    return <div className="_background">
        <div className="_categoryLabelAndTextArea">
            <span className="_textAreaLabel _blackText">What game would you like to play?</span>
            <textarea id={GAME_SELECT_TEXTBOX_ID} className="_textArea _smallerTextArea" />
        </div>
        <VerticalSpacer height={10} />
        <div className="_gameButtons">
            <OptionButton onClick={onGoBackClick} caption="Go back" cssClass="_navigationButton" />
            <OptionButton onClick={onViewOptions} caption="View Options" cssClass="_navigationButton" />
            <OptionButton onClick={onSelectClick} caption="Select" cssClass="_navigationButton" />
            <OptionButton onClick={onDefaultClick} caption="Christopher's Default Game" cssClass="_navigationButton" />
        </div>
        <VerticalSpacer height={3} />
        {apiResult === SaveResult.NoGameFound && <span className="_saveErrorMessage">Game not found, please try again.</span>}
        {apiResult === SaveResult.BadString && <span className="_saveErrorMessage">That game is not valid.</span>}
        {shouldShowOptions && <ListOfGameOptionsPopup listOfFiles={fileList.current} setShouldShowOptions={setShouldShowOptions} />}
    </div>;
}

async function callBackHelper(
    fileName: string,
    setValues: (values: Values) => void,
    setApiResult: (apiResult: SaveResult) => void,
    setStage: (stage: Stage) => void
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
        setStage("Playing");
    }
}