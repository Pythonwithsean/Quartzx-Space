import { Link } from "react-router-dom";
import { Home, Search, StickyNote } from "lucide-react";
import { useState } from "react";
import "../Styles/QuartzxSpace.css";
import "../Styles/Bar.css";

const items = [
  {
    name: "Home",
    icon: <Home />,
  },
  {
    name: "Search",
    icon: <Search />,
  },
  {
    name: "Create a Note",
    icon: <StickyNote />,
  },
];

function CapitalizeFirstletter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function CreateNote() {}

function Delete() {}

function QuartzxSpace(): JSX.Element {
  const [active, setActive] = useState("Home");
  const username = window.localStorage.getItem("username");

  return (
    <>
      <div className="SIDEBAR">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => setActive(item.name)}
              className={item.name === active ? "Active" : ""}
            >
              {item.icon}
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="Wrapper">
        <Link to="/" className="Logo">
          Quartzx Space
        </Link>
        {/* Display the username if available */}
        {username && <h1>Welcome {CapitalizeFirstletter(username)}</h1>}
      </div>
      <div className="Text-Area"></div>
    </>
  );
}

export default QuartzxSpace;
