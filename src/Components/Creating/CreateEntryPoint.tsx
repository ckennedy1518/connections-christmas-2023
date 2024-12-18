// Author: Christopher Kennedy
// Date: 12-17-24

import React, { useCallback, useState } from 'react';
import { OptionButton } from "../Helpers/OptionButton";
import { Color, Stage } from '../../Utilities/types';
import { CategoryEntry } from './CategoryEntry';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';
import { SavePopup } from './SavePopup';
import { getCsvFormat } from '../../functions/helpers/get-csv-format';

interface IPlayerSelectProps {
    setStage: (stage: Stage) => void;
}

export const CreateEntryPoint: React.FC<IPlayerSelectProps> = props => {
    const { setStage } = props;
    const [savePopupOpen, setSavePopupOpen] = useState(false);
    const [saveString, setSaveString] = useState("");
    const [showCantSave, setShowCantSave] = useState(false);
    
    const SPACE_BETWEEN_ENTRIES = 10;

    const onGoBackClick = () => { setStage("GameTypeSelect"); };
    const onPreviewClick = () => { setStage("Previewing"); };
    const onSaveClick = useCallback(() => {
        const validToSave = getCsvFormat(setSaveString)
        if (validToSave) {
            setSavePopupOpen(true);
        } else {
            setShowCantSave(true);
            // don't show error text forever
            setTimeout(() => {
                setShowCantSave(false);
            }, 5000);
        }
    }, [showCantSave]);    

    return <>
        Yellow:
        <CategoryEntry color={Color.Yellow} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        Green:
        <CategoryEntry color={Color.Green} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        Blue:
        <CategoryEntry color={Color.Blue} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        Purple:
        <CategoryEntry color={Color.Purple} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        <OptionButton onClick={onGoBackClick} caption="Go back" cssClass="" />
        <OptionButton onClick={onPreviewClick} caption="Preview" cssClass="" />
        <OptionButton onClick={onSaveClick} caption="Save" cssClass="" />
        {savePopupOpen && <SavePopup setStage={setStage} saveString={saveString} />}
        {showCantSave && "Fill out all fields with unique values before saving."}
    </>;
}