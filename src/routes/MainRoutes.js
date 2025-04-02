import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import HomePage from "../pages/home/HomePage";

function MainRoutes() {
  return (
    <Routes>
      <Route path={routes.homeRoute} element={<HomePage />} />
    </Routes>
  );
}

export default MainRoutes;
