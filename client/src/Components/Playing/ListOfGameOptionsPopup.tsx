// Author: Christopher Kennedy
// Date: 12-22-24

import React, { useState } from 'react';
import { Modal } from '../Helpers/Modal';
import { OptionButton } from '../Helpers/OptionButton';
import { VerticalSpacer } from '../Helpers/VerticalSpacer';
import "../../Styles/_Playing.css";

interface IListOfGameOptionsPopupProps {
    listOfFiles: string[];
    setShouldShowOptions: (shouldShowOptions: boolean) => void;
}

export const ListOfGameOptionsPopup: React.FC<IListOfGameOptionsPopupProps> = props => {
    const { listOfFiles, setShouldShowOptions } = props;
    const [isOpen, setIsOpen] = useState(true);

    const onGoBackClicked = () => {
        setIsOpen(false);
        setShouldShowOptions(false);
    };
    
    return (
        <Modal isOpen={isOpen}>
            {listOfFiles.map(file => {
                const split = file.split(".");
                if (split.length === 0) {
                    return null;
                }
                return <>
                    <span className="_centerContent">{split[0]}</span>
                    <VerticalSpacer height={10} />
                </>;
            })}
            <div className="_gameButtons">
                <OptionButton onClick={onGoBackClicked} caption="Go Back" cssClass="_navigationButton" />
            </div>
        </Modal>
    );
}