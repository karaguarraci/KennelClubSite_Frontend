import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Committee from "./pages/Committee";
import Links from "./pages/Links";
import Membership from "./pages/Membership";
import Photos from "./pages/Photos";
import Training from "./pages/Training";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="events" element={<Events />} />
        <Route path="committee" element={<Committee />} />
        <Route path="/links" element={<Links />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </div>
  );
}

export default App;
