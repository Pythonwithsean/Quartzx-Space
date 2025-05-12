import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TextEditor from "./Components/TextEditor";
import QuartzxSpace from "./Pages/QuartzxSpace";
import NotFound from "./Pages/NotFound";
import "./Styles/App.css";
import Dashboard from "./Pages/Dashboard";
import MinimalEditor from "./Components/TextEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TextEditor" element={<MinimalEditor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
