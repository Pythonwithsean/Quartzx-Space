// import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import "../Styles/QuartzxSpace.css";

function QuartzxSpace(): JSX.Element {
  return (
    <>
      <Link to="/" className="Logo">
        Quartzx Space
      </Link>
      <div className="QuartzxSpace">
        <h1>Quartzx Space</h1>
      <Sidebar />
    </>
  );
}

export default QuartzxSpace;
