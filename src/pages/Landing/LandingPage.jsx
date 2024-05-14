import React from "react";
import Hero from "../../components/landingPage/Hero";
import Advantages from "../../components/landingPage/Advantages";
import FaqSection from "../../components/landingPage/FaqSection";
import Calander from "../../components/landingPage/Calander";
const LandingPage = () => {
  return (
    <>
      <Hero />
      <Advantages />
      <Calander />
      <FaqSection />
    </>
  );
};

export default LandingPage;
