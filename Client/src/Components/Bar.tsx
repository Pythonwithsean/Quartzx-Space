import "../Styles/Bar.css";
import { Home } from "lucide-react";
import { Search } from "lucide-react";
import { StickyNote } from "lucide-react";
import { useState } from "react";

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

function Bar() {
  const [active, setActive] = useState("Home");
  return (
    <div className="SIDEBAR ">
      <ul>
        {items.map((item) => {
          return (
            <li
              onClick={() => setActive(item.name)}
              className={item.name == active ? "Active" : ""}
            >
              {item.icon}
              <button>{item.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Bar;
