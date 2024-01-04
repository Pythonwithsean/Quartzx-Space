import "./Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TextEditor from "./Components/TextEditor";
import QuartzxSpace from "./Pages/QuartzxSpace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Dashboard?/:notetitle"
          element={<QuartzxSpace Children={<TextEditor />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
