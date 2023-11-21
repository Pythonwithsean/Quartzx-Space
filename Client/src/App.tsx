import "./Styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { v4 as uuidv4 } from "uuid";
import TextEditor from "./Components/TextEditor";
import QuartzxSpace from "./Pages/QuartzxSpace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<QuartzxSpace />} />
        <Route path="/QuartzxSpace/:id" element={<TextEditor />} />
        {/* <Route
          path="/QuartzxSpace/*"
          element={<Navigate to={`/QuartzxSpace/${uuidv4()}`} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
