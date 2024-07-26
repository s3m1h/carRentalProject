import React from "react";
import MainHeader from "../layout/MainHeader";
import CarSearch from "../common/CarSearch";
import CarCarousel from "../common/CarCarousel";
import Jumbotrons from "../common/Jumbotrons";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  return (
    <>
    {message && <p>{message}</p>}
      <MainHeader />
      <CarSearch />
      <Jumbotrons />
      <CarCarousel />
    </>
  );
};

export default Home;
