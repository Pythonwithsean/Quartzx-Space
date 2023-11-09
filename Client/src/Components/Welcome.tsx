import "../Styles/Welcome.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <>
      <h1>
        Welcome to <em>QuartzxSpace</em>
      </h1>
      <h2>
        Capturing Thoughts, Crafting Brilliance: Quartzx Space, Where Ideas Take
        Shape.
      </h2>

      <div className="welcome-conatiner">
        <section>
          {" "}
          <div className="item-1">
            <img
              className="book-img"
              src="../../public/Take-Notes-Effectively.png"
              alt="Note taking"
            />
            <div className="button-wrapper">
              <Link to={cookies.access_token ? "/Dashboard" : "/Login"}>
                {" "}
                <button type="button" className="notes-button">
                  Make Some Notes
                </button>
              </Link>
            </div>
            <section className="button-wrapper"></section>
          </div>{" "}
          <div className="item-2">
            <p>
              With Quartzx Space we allow synchronous Access and modifcation to
              files in the cloud. This allows for a more seemless experience
              when making notes and working with friends so feel free to be able
              explore the wonders and powers of QuartzxSpace.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
