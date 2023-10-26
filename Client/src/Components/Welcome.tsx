import "../Styles/Welcome.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home(): JSX.Element {
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <>
      <h1>Welcome to QuartzxSpace</h1>
      <h2>
        Capturing Thoughts, Crafting Brilliance: Quartzx Space, Where Ideas Take
        Shape.
      </h2>
      <h3>
        Quartzx Space is a place to write, read, and connect. It's easy and free
        to post your thinking on any topic and connect with millions of readers.
      </h3>
      <div className="welcome-conatiner">
        <div>
          <p>Note taking application, Feel free to type your mind your away.</p>
          <img
            className="book-img"
            src="../../public/Take-Notes-Effectively.png"
            alt="Note taking"
          />
          <article>
            Quartzx Space is an application that exits to allow you seemlessly
            make notes for Personal Use, School and Education Use and More!!!
          </article>
        </div>
        <div className="button-wrapper">
          <Link to={cookies.access_token ? "/QuartzxSpace" : "/Login"}>
            {" "}
            <button type="button" className="notes-button">
              Make Some Notes
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
