// Author: Christopher Kennedy
// Date: 12-17-24

import React, { useState } from 'react';
import { OptionButton } from "../Helpers/OptionButton";
import { Stage } from '../../types';
import { CategoryEntry } from './CategoryEntry';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';
import { SavePopup } from './SavePopup';

interface IPlayerSelectProps {
    setStage: (stage: Stage) => void;
}

export const CreateEntryPoint: React.FC<IPlayerSelectProps> = props => {
    const { setStage } = props;
    const [savePopupOpen, setSavePopupOpen] = useState(false);
    const SPACE_BETWEEN_ENTRIES = 10;

    const onGoBackClick = () => { setStage("GameTypeSelect"); };
    const onPreviewClick = () => { setStage("Previewing"); };
    const onSaveClick = () => { setSavePopupOpen(true); };    

    return <>
        Yellow:
        <CategoryEntry color={"Yellow"} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        Green:
        <CategoryEntry color={"Green"} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        Blue:
        <CategoryEntry color={"Blue"} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        Purple:
        <CategoryEntry color={"Purple"} />
        <VerticalSpacer height={SPACE_BETWEEN_ENTRIES} />
        <OptionButton onClick={onGoBackClick} caption="Go back" cssClass="" />
        <OptionButton onClick={onPreviewClick} caption="Preview" cssClass="" />
        <OptionButton onClick={onSaveClick} caption="Save" cssClass="" />
        {savePopupOpen && <SavePopup setStage={setStage} />}
    </>;
}