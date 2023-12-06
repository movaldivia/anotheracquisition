import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Events from "../components/Events";
import NewEvent from "../components/NewEvent";

export default (
  <Router>
    <Routes>
      <Route path="/app/events/new" element={<NewEvent />} />
      <Route path="/app/events" element={<Events />} />
      <Route path="/app/signup" element={<SignUp />} />
      <Route path="/app/signin" element={<SignIn />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);
