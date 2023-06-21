import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../store/store";

const DisplayTotalDebt = () => {
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

  useEffect(() => {
    const card = document.getElementById("display-card");
    if (card) {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const defaultCardStyles = {
    borderRadius: "20px",
    width: "300px",
    height: "200px",
    background: isHovered ? "#778899": "#B0C4DE",
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
    transition: "font-size 0.3s ease-in-out", // Плавна анімація збільшення тексту
  };

  return (
    <>
      <Card id="display-card" style={defaultCardStyles}>
        <Card.Body>
          <h3>Your total loans:</h3>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {statistic?.totalDebt ? (
                  <p style={textStyles}>{statistic?.totalDebt} $</p>
                ) : (
                  <p>No information</p>
                )}
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default DisplayTotalDebt;
