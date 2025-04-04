import React from "react";
import Home from "./layout/Home";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
