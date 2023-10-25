import "./Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import QuartzxSpace from "./Pages/QuartzxSpace";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/QuartzxSpace" element={<QuartzxSpace />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
