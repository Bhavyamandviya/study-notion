import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/common/Navbar";

import _ from "lodash";
import NavigateRoute from "./Routes";
// import { AppRoute } from "./Routes";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <NavigateRoute />
    </div>
  );
}

export default App;
