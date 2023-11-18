import { Link } from "react-router-dom";
import { Home, Search, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import "../Styles/QuartzxSpace.css";
import "../Styles/Bar.css";
import contents from "../Components/TextEditor";

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

async function CreateNote(
  noteTitle: string | null,
  noteContent: string | null
) {
  fetch("http://localhost:4000/notes/send-notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: noteTitle,
      content: noteContent,
    }),
  }).then((response) => console.log(response));
}

async function GetNotes() {
  const response = await fetch("http://localhost:4000/notes/get-notes");
  const data = await response.json();
  const notes = data.notes || [];
  return notes;
}

async function DeleteNotes() {
  fetch("http://localhost:4000/notes/delete-notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Note",
      content: "This is a test note",
    }),
  }).then((response) => console.log(response));
}

function QuartzxSpace(): JSX.Element {
  const [active, setActive] = useState("Home");
  const [notes, setNotes] = useState([]); // State to store the fetched notes
  const username = window.localStorage.getItem("username");
  const [r, setR] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    // Fetch notes and update state
    async function fetchNotes() {
      const fetchedNotes = await GetNotes();
      setNotes(fetchedNotes);
    }

    fetchNotes(); // Create a note (you may want to handle this differently)
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <>
      <div className="SIDEBAR">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setActive(item.name);
                {
                  item.name === "Create a Note" ? setR(true) : null;
                }
              }}
              className={item.name === active ? "Active" : ""}
            >
              {item.icon}
              <button>{item.name}</button>
            </li>
          ))}
          {/* Dynamically render notes in the sidebar */}
          {notes.map((note, index) => (
            <li key={index} className="Note">
              <span className="NoteTitle">{note.title}</span>
            </li>
          ))}
          {r ? (
            <input
              type="text"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => {
                setNoteTitle(e.target.value);
                console.log(noteTitle);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log(`This is the note Title ${noteTitle}`);
                  setR(false);
                }
              }}
            />
          ) : null}
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
