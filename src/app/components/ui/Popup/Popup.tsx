import { ReactNode } from "react";
import "./Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IPopupProps {
    children: ReactNode;
    trigger: boolean;
    setTrigger: (trigger: boolean) => void;
};

const Popup = ({ children, trigger, setTrigger }: IPopupProps) => {

    const handleClose = () => {
        setTrigger(false);
    }

    return <>
        {trigger == true ? <>
            <div className="popup" onClick={() => handleClose()}>
                <div className="popup-inner" onClick={(event) => event.stopPropagation()}>
                    <button className="close-btn"><FontAwesomeIcon icon={faXmark} onClick={() => handleClose()} /></button>
                    {children}
                </div>
            </div>
        </> : ""}
    </>
};


export default Popup;