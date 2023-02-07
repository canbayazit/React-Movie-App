import React from "react";
import { useParams } from "react-router-dom";
import DetailPage from "./MoviePage/DetailPage";
import PersonPage from "./PersonPage/PersonPage";

const Index = () => {
  const { category } = useParams();
  return <>{category === "person" ? <PersonPage /> : <DetailPage />}</>;
};

export default Index;
