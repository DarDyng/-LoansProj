import { useAppSelector } from "../../store/store";
import classes from "./DisplayErrors.module.css";

interface IDisplayProps{
    erorrs: string[]; 
}

const DisplayErrors = ({erorrs: errors} : IDisplayProps) => {
    return <>
         {(errors && errors.length > 0) && <>
            <ul className={classes.errors}>
                {errors.map(x => <li key={x}>{x}</li>)}
            </ul>
        </>}
    </>
};
export default DisplayErrors;
