// Author: Christopher Kennedy
// Date: 11-26-23

import React, { useState } from 'react';
import { PlayerSelect } from "./PlayerSelect";

const App: React.FC = () => {
    const [currentStage, setCurrentStage] = useState("PlayerSelect");

    const advanceStage = () => {
        if (currentStage === "PlayerSelect") {
            setCurrentStage("Playing");
        }
        else {
            setCurrentStage("Finished");
        }
    };

    return <>
        {currentStage === "PlayerSelect" && <PlayerSelect stage={currentStage} />}
        {currentStage === "Playing" && <div></div>}
        {currentStage === "Finished" && <div></div>}
    </>;
}

export default App;