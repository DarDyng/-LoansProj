interface IDisplaySuccessProps{
    message: string | undefined;
}

const DisplaySuccess = ({message}: IDisplaySuccessProps) => {
    return <>
        {message && <>
            <span style={{color: "green"}}>{message}</span>
        </>}
    </>
};

export default DisplaySuccess;