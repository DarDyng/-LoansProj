import React, { useState, useEffect } from "react";
import { calculateDiffDate } from "../utils/calculateDiiffDate";

const Timer = ({ targetDate }: { targetDate: Date }) => {
    const [daysLeft, setDaysLeft] = useState<number>(calculateDiffDate(targetDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDaysLeft(calculateDiffDate(targetDate));
        }, 86400000); // 24 hours in milliseconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {daysLeft <= 0 
            ? <h1 style={{color: "red"}}>Expired</h1> 
            : <h1>Days left: {daysLeft}</h1> }
            
        </div>
    );
};

export default Timer;
