import { Card } from "react-bootstrap";
import classes from "./DisplayInfo.module.css"
import { useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../store/store";

const DisplayTotalDebt = () => {
    const { statistic, loading } = useAppSelector(x => x.statistic);

    return <>
        <Card style={{ width: "300px", height: "200px", background: "rgba(162, 14, 14, 0.37)" }}>
            <Card.Body>
                <h3>Your debt:</h3>
                <div className={classes["info-body"]}>
                    {loading
                        ? <p>Loading...</p>
                        : <>
                            {statistic?.totalDebt ? <p>{statistic?.totalDebt} $</p> : <p>No information</p>}
                        </>}
                </div>
            </Card.Body>
        </Card>
    </>
};

export default DisplayTotalDebt;