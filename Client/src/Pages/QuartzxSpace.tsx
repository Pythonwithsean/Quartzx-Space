import { Link } from "react-router-dom";
import Bar from "../Components/Bar";
import TextEditor from "../Components/TextEditor";
import "../Styles/QuartzxSpace.css";
import { Routes, Route } from "react-router-dom";

function QuartzxSpace(): JSX.Element {
  return (
    <>
      <Bar />
      <div className="Wrapper">
        <Link to="/" className="Logo">
          Quartzx Space
        </Link>
      </div>
      <div className="Text-Area">
        <TextEditor />
      </div>
      <Outlet />
    </>
  );
}

export default QuartzxSpace;
