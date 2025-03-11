import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/home.jsx";

const App = () => {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
