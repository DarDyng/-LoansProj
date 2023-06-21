import { Card } from "react-bootstrap";
import { useState } from "react";
import classes from "./DisplayInfo.module.css";
import { useAppSelector } from "../../store/store";

const DisplayTotalItems = () => {
  const { statistic, loading } = useAppSelector((x) => x.statistic);
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCount((prevCount) => prevCount + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const defaultCardStyles = {
    borderRadius: "20px",
    width: "300px",
    height: "200px",
    background: isHovered ? "#778899" : "#B0C4DE",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    color: isHovered ? "white" : "black",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const textStyles = {
    fontSize: isHovered ? "32px" : "24px",
    transition: "font-size 0.3s ease-in-out",
    animation: "textScale 0.3s ease-in-out",
  };

  return (
    <Card
      style={defaultCardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classes.card}
    >
      <Card.Body>
        <h3>Count of loans:</h3>
        <div className={classes["info-body"]}>
          {loading ? (
            <p style={textStyles}>Loading...</p>
          ) : (
            <>
              {statistic?.totalLoans ? (
                <p style={textStyles}>{statistic?.totalLoans}</p>
              ) : (
                <p style={textStyles}>No information</p>
              )}
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DisplayTotalItems;


