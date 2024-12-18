// Author: Christopher Kennedy
// Date: 11-26-23

import React, { useState } from 'react';
import { GameTypeSelect } from "./InitialScreen/GameTypeSelect";
import { Stage } from "../types";

const App: React.FC = () => {
    const [currentStage, setCurrentStage] = useState("GameTypeSelect" as Stage);

    return <>
        {currentStage === "GameTypeSelect" && <GameTypeSelect setStage={setCurrentStage} />}
        {currentStage === "Creating" && <div>Creating</div>}
        {currentStage === "Playing" && <div>Playing</div>}
        {currentStage === "Finished" && <div>Finished</div>}
    </>;
}

export default App;