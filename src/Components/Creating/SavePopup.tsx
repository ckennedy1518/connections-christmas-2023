// Author: Christopher Kennedy
// Date: 12-17-24

import React, { useCallback, useState } from 'react';
import { OptionButton } from "../Helpers/OptionButton";
import { SaveResult, Stage } from '../../Utilities/types';
import { Modal } from '../Helpers/Modal';
import { saveGame } from '../../functions/save-game';

interface IPlayerSelectProps {
    setStage: (stage: Stage) => void;
    saveString: string;
}

export const SavePopup: React.FC<IPlayerSelectProps> = props => {
    const { setStage, saveString } = props;
    let [showModal, setShowModal] = useState(true);
    const [saveResult, setSaveResult] = useState(SaveResult.NotCalledYet);
    let savePopupId = "savePopupId";

    const onGoBackClick = () => setShowModal(false);
    const onSaveClick = useCallback(async () => {
        const result = await saveGame(savePopupId, saveString) 
        if (result === SaveResult.Good) {
            setShowModal(false);
            setStage("GameTypeSelect");
        } else {
            setSaveResult(result);
        }
    }, [saveResult]);

    return (
        <Modal isOpen={showModal} onClose={() => {}}>
            <textarea onTouchEnd={onSaveClick} id={savePopupId} />
            <OptionButton onClick={onGoBackClick} caption="Go Back" cssClass="" />
            <OptionButton onClick={onSaveClick} caption="Save" cssClass="" />
            {saveResult === SaveResult.FileAlreadyExists && "That name is already taken."}
            {saveResult === SaveResult.BadString && "That file name is not valid."}
            {saveResult === SaveResult.BadCharacter && "You cannot use \".\", \"\\\" or \"/\" in the save name."}
            {saveResult === SaveResult.FailedToCreateFile && "Failed to create file. Try again."}
        </Modal>
    );
}