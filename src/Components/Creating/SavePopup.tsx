// Author: Christopher Kennedy
// Date: 12-17-24

import React, { useCallback, useState } from 'react';
import { OptionButton } from "../Helpers/OptionButton";
import { SaveResult, Stage } from '../../Utilities/types';
import { Modal } from '../Helpers/Modal';
import { saveGame } from '../../functions/save-game';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';

interface IPlayerSelectProps {
    setStage: (stage: Stage) => void;
    showPopup: (value: boolean) => void;
    saveString: string;
}

export const SavePopup: React.FC<IPlayerSelectProps> = props => {
    const { setStage, saveString, showPopup } = props;
    const [showModal, setShowModal] = useState(true);
    const [saveResult, setSaveResult] = useState(SaveResult.NotCalledYet);
    const SAVE_POPUP_ID = "savePopupId";

    const onGoBackClick = () => {
        setShowModal(false);
        showPopup(false);
    };
    const onSaveClick = useCallback(async () => {
        const result = await saveGame(SAVE_POPUP_ID, saveString) 
        if (result === SaveResult.Good) {
            setShowModal(false);
            setStage("GameTypeSelect");
        } else {
            setSaveResult(result);
        }
    }, [saveString, setStage]);

    return (
        <Modal isOpen={showModal} onClose={() => {}}>
            <div className="_gameSave">
                <span className="_textAreaLabel">Name this game:</span>
                <textarea onTouchEnd={onSaveClick} id={SAVE_POPUP_ID} className="_textArea _smallerTextArea" />
            </div>
            <VerticalSpacer height={10} />
            <div className="_gameButtons">
                <OptionButton onClick={onGoBackClick} caption="Go Back" cssClass="_navigationButton" />
                <OptionButton onClick={onSaveClick} caption="Save" cssClass="_navigationButton" />
            </div>
            <VerticalSpacer height={3} />
            {saveResult === SaveResult.FileAlreadyExists && <span className="_saveErrorMessage">That name is already taken.</span>}
            {saveResult === SaveResult.BadString && <span className="_saveErrorMessage">That file name is not valid.</span>}
            {saveResult === SaveResult.BadCharacter && <span className="_saveErrorMessage">You cannot use ".", "\" or "/" in the name of the game.</span>}
            {saveResult === SaveResult.FailedToCreateFile && <span className="_saveErrorMessage">Failed to create file. Try again.</span>}
        </Modal>
    );
}