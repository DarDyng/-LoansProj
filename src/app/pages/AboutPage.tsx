import React, { useState } from "react";
import "./AboutPage.css";

const AboutPage = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const handleMouseEnter4 = () => {
    setIsHovered4(true);
  };

  const handleMouseLeave4 = () => {
    setIsHovered4(false);
  };

  return (
    <div className="about-page">
      <div
        className={`about-page__section about-page__section--gray-bg ${
          isHovered1 ? "about-page__section--hovered" : ""
        }`}
        onMouseEnter={handleMouseEnter1}
        onMouseLeave={handleMouseLeave1}
      >
        <h1 className="about-page__title">Welcome to Loan Portfolio</h1>

        <p className="about-page__description">
          If you have multiple loans or payments from different banks, Loan Portfolio is here to help you conveniently manage your loans in one place. Our program centralizes all your loan data and assists you in paying off your debts as quickly as possible.
        </p>
      </div>

      <div
        className={`about-page__section about-page__section--gray-bg ${
          isHovered2 ? "about-page__section--hovered" : ""
        }`}
        onMouseEnter={handleMouseEnter2}
        onMouseLeave={handleMouseLeave2}
      >
        <h2 className="about-page__section-title">Manage Your Loan Portfolio</h2>
        <p className="about-page__section-description">
          On the main page, you can easily manage your personal loan portfolio. Add the loan name, amount, start date, and interest rate. The program will store this information for further analysis, and the loans will be displayed in a list format. You can save and update the credit data for future reference.
        </p>
      </div>

      <div
        className={`about-page__section about-page__section--gray-bg ${
          isHovered3 ? "about-page__section--hovered" : ""
        }`}
        onMouseEnter={handleMouseEnter3}
        onMouseLeave={handleMouseLeave3}
      >
        <h2 className="about-page__section-title">Get Insights with Statistics</h2>
        <p className="about-page__section-description">
          In the statistics tab, you will find valuable insights to help you pay off your credits or loans faster. The program analyzes your loan data and provides an overview of your current debt status. It also calculates the minimum amount you should pay each month to prevent your debt from increasing, taking into account all your credits and loans.
        </p>
      </div>

      <div
      className={`about-page__section about-page__section--gray-bg ${
        isHovered4 ? "about-page__section--hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter4}
      onMouseLeave={handleMouseLeave4}
    >
      <h2 className="about-page__section-title">About Me and Project</h2>
      <div className="about-page__project-info">
        <p>Прізвище та Ім'я студента: Серафим Дмитро</p>
        <p>Назва проекту: Loan Portfolio</p>
        <p>Посилання на Телеграм: <a href="https://t.me/dardyng">Написати студенту</a></p>
        <p>Email студента: dimaserafym03@gmail.com</p>
        <p>Посилання на Github репозиторій: <a href="https://github.com/DarDyng/-LoansProj" target="_blank" rel="noopener noreferrer">Перейти до репозиторію</a></p>
        <p>Посилання на Readmy : <a href="https://github.com/DarDyng/-LoansProj#readme" target="_blank" rel="noopener noreferrer">Перейти до Readmy</a></p>
      </div>
    </div>
    </div>
  );
};

export default AboutPage
