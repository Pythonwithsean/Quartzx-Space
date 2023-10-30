import "../Styles/Welcome.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <section className="button-wrapper">
          <p>
            With Quartzx Space we allow synchronous Access and modifcation to
            files in the cloud. This allows for a more seemless experience when
            making notes and working with friends so feel free to be able
            explore the wonders and powers of QuartzxSpace.
          </p>
        </section>
        <h1>Be able to access notes in one place </h1>
        <h2>
          With QuartzxSpace you are able to create and access notes with friends
          from anywhere around the world{" "}
        </h2>
      </div>
    </>
  );
}

export default Home;
