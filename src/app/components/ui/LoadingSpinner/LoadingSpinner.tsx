import classes from "./LoadingSpinner.module.css";

interface ILoadingSpinnerProps{
    height?: number;
    width?: number;
}

const LoadingSpinner = ({height, width}:ILoadingSpinnerProps) => {
    return <>
        <div className={classes.center}>
            <div style={{
            height: height ? `${height}px` : "200px", 
            width: width ? `${width}px` : "200px", 
            }} className={classes.ring}></div>
            <span style={{
            lineHeight: height ? `${height}px` : "200px", 
            }}  className={classes.loading}>Loading...</span>
        </div>
    </>
};

export default LoadingSpinner;