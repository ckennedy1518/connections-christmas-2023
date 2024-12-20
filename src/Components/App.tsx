// Author: Christopher Kennedy
// Date: 11-26-23

import React, { useState } from 'react';
import { GameTypeSelect } from "./InitialScreen/GameTypeSelect";
import { Stage } from "../Utilities/types";
import { CreateEntryPoint } from './Creating/CreateEntryPoint';
import { PlayingEntryPoint } from './Playing/PlayingEntryPoint';
import { GameDisplay } from './Playing/GameDisplay';
import { getDummyValues } from './Playing/Helpers/get-dummy-values';

const App: React.FC = () => {
    const [currentStage, setCurrentStage] = useState("GameTypeSelect" as Stage);
        const [values, setValues] = useState(getDummyValues());

    return <>
        {currentStage === "GameTypeSelect" && <GameTypeSelect setStage={setCurrentStage} />}
        {currentStage === "Creating" && <CreateEntryPoint setStage={setCurrentStage} />}
        {currentStage === "Previewing" && <div>Previewing</div>}
        {currentStage === "PlayEntry" && <PlayingEntryPoint setStage={setCurrentStage} setValues={setValues} />}
        {currentStage === "Playing" && <GameDisplay values={values} setStage={setCurrentStage} />}
        {currentStage === "Finished" && <div>Finished</div>}
    </>;
}

export default App;