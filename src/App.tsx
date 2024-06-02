import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";

import { data } from "./data";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const timedata = processData(data);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  console.log(timedata);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home timedata={timedata} />} />
      </Routes>
    </BrowserRouter>
  );
};

const processData = (rawData) => {
  const groupedData = rawData.reduce((acc, d) => {
    // Extract only the time portion and round down to the nearest minute
    const time =
      d.timestamp.split("T")[1].split(":")[0] +
      ":" +
      d.timestamp.split("T")[1].split(":")[1];
    if (!acc[time]) {
      acc[time] = {
        timestamp: d.timestamp.split("T")[0] + "T" + time,
        alerts: 0,
      };
    }
    acc[time].alerts += 1;
    return acc;
  }, {});

  // Convert the object into an array of objects
  return Object.values(groupedData).sort(
    // @ts-ignore
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  ); // Ensure data is sorted by time
};

export default App;
