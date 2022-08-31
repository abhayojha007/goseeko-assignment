import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PageView from "./pages/PageView";
import ShowSearchResults from "./pages/ShowSearchResults";
import ErrorPage from "./pages/ErrorPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/topic-content/*" element={<PageView />} />
      <Route path="/search" element={<ShowSearchResults />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
