// import Header from "../Components/Header";
import { Link } from "react-router-dom";
import Bar from "../Components/Bar";

function QuartzxSpace(): JSX.Element {
  return (
    <>
      <Bar />
      <div className="Wrapper">
        {" "}
        <Link to="/" className="Logo">
          Quartzx Space
        </Link>
      </div>
    </>
  );
}

export default QuartzxSpace;
