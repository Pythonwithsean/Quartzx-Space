import Header from "../Components/Header";
import "../Styles/Home.css";
import { Send } from "lucide-react";
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section className="Container">
        <h1>The Platform for Students to Embrace Learning</h1>
        <button
          onClick={() => {
            navigate("/Login");
          }}
        >
          Get Started{" "}
          <span>
            {" "}
            <Send
              size={16}
              style={{
                display: "inline-block",
              }}
            />
          </span>
        </button>
      </section>
      <section>
        <h1>Testing</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quia
          voluptates
        </p>
      </section>
    </>
  );
}

export default Home;
