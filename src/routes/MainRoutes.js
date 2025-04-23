import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import HomePage from "../pages/home/HomePage";
import Answers from "../pages/answers/Answers";

function MainRoutes() {
  return (
    <Routes>
      <Route path={routes.homeRoute} element={<HomePage />} />
      <Route path={routes.answers} element={<Answers />} />
    </Routes>
  );
}

export default MainRoutes;
