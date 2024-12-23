// Author: Christopher Kennedy
// Date: 11-30-23

import React from 'react';
import { OptionButton } from "../Helpers/OptionButton";
import { Stage } from '../../Utilities/types';
import "../../Styles/_InitialPage.css";
import "../../Styles/_Buttons.css";
import { VerticalSpacer } from '../Helpers/VerticalSpacer';

interface IPlayerSelectProps {
    setStage: (stage: Stage) => void;
}

export const GameTypeSelect: React.FC<IPlayerSelectProps> = props => {
    const { setStage } = props;

    const onCreateGameClick = () => { setStage("Creating"); }
    const onPlayClick = () => { setStage("PlayEntry"); }
    
    return <div className="_background">
        <span className="_mainMessage">Welcome to Christopher's 2024 Christmas Connections!</span>
        <VerticalSpacer height={20} />
        <div className="_gameButtons">
            <OptionButton onClick={onCreateGameClick} caption="Create a game" cssClass="_navigationButton" />
            <OptionButton onClick={onPlayClick} caption="Play!" cssClass="_navigationButton" />
        </div>
    </div>;
}