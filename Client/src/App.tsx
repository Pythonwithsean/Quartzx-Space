import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TextEditor from "./Components/TextEditor";
import QuartzxSpace from "./Pages/QuartzxSpace";
import NotFound from "./Pages/NotFound";
import "./Styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Dashboard/:noteTitle?/:noteID?"
          element={<QuartzxSpace Children={<TextEditor />} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
