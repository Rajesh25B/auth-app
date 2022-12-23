import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "components/Dashboard";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
