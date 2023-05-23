import { Card } from "react-bootstrap";
import classes from "./DisplayInfo.module.css"
import { useAppSelector } from "../../store/store";

const DisplayTotalItems = () => {
    const { statistic, loading } = useAppSelector(x => x.statistic);

    return <>
        <Card style={{ borderRadius: "10px", width: "300px", height: "200px", background: "" }}>
            <Card.Body>
                <h3>Count of loans:</h3>
                <div className={classes["info-body"]}>
                    {loading
                        ? <p>Loading...</p>
                        : <>
                            {statistic?.totalLoans ? <p>{statistic?.totalLoans}</p> : <p>No information</p>}
                        </>}
                </div>
            </Card.Body>
        </Card>
    </>
};

export default DisplayTotalItems;