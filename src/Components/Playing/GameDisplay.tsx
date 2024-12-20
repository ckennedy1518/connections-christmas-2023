// Author: Christopher Kennedy
// Date: 12-19-24

import React from 'react';
import { Stage, Values } from '../../Utilities/types';

interface IGameDisplayProps {
    values: Values;
    setIsPlayingGame: (isPlayingGame: boolean) => void;
    setStage: (stage: Stage) => void;
}

export const GameDisplay: React.FC<IGameDisplayProps> = props => {
    const { values, setIsPlayingGame, setStage } = props;
    
    return (
        <>
            {values}
        </>
    );
}