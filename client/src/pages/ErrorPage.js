import React, { useState, useEffect } from "react";
import NavBarWithSearch from "../components/navbar";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const { state } = useLocation();
  const { msg } = state; // Read values passed on state
  return (
    <div className="container">
      <NavBarWithSearch />
      <div
        className="container"
        style={{ marginTop: 50, alignItems: "center" }}
      >
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default ErrorPage;
