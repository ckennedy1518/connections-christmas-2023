// Author: Christopher Kennedy
// Date: 11-30-23

import React from 'react';
import { OptionButton } from "../Helpers/OptionButton";
import { Stage } from '../../types';

interface IPlayerSelectProps {
    setStage: (stage: Stage) => void;
}

export const GameTypeSelect: React.FC<IPlayerSelectProps> = props => {
    const { setStage } = props;

    const onCreateGameClick = () => { setStage("Creating"); }
    const onPlayClick = () => { setStage("Playing"); }
    
    return <>
        <OptionButton onClick={onCreateGameClick} caption="Create a game" cssClass="" />
        <OptionButton onClick={onPlayClick} caption="Play!" cssClass="" />
    </>;
}