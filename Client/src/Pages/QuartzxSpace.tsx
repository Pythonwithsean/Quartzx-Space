// import Header from "../Components/Header";
import { Link } from "react-router-dom";
import Bar from "../Components/Bar";

function QuartzxSpace(): JSX.Element {
  return (
    <>
      <Link to="/" className="Logo">
        Quartzx Space
      </Link>
      <Bar />
    </>
  );
}

export default QuartzxSpace;
