// Author: Christopher Kennedy
// Date: 11-26-23

import React, { useState } from 'react';
import { GameTypeSelect } from "./InitialScreen/GameTypeSelect";
import { Stage } from "../types";
import { CreateEntryPoint } from './Creating/CreateEntryPoint';

const App: React.FC = () => {
    const [currentStage, setCurrentStage] = useState("GameTypeSelect" as Stage);

    return <>
        {currentStage === "GameTypeSelect" && <GameTypeSelect setStage={setCurrentStage} />}
        {currentStage === "Creating" && <CreateEntryPoint setStage={setCurrentStage} />}
        {currentStage === "Previewing" && <div>Previewing</div>}
        {currentStage === "Playing" && <div>Playing</div>}
        {currentStage === "Finished" && <div>Finished</div>}
    </>;
}

export default App;