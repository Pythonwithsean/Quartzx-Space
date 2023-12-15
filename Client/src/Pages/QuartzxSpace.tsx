import { Link } from "react-router-dom";
import { Home, Search, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import "../Styles/QuartzxSpace.css";
import "../Styles/Bar.css";
import { useNavigate } from "react-router-dom";

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

async function CreateNote(noteTitle: string) {
  try {
    const noteT = await noteTitle;

    const response = await fetch("http://localhost:4000/notes/Create-Notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: noteT,
      }),
    });

    if (response.ok) {
      // Handle successful response
      console.log("Note created successfully");
    } else {
      // Handle non-successful response (e.g., show an error message)
      console.error(
        "Failed to create note:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    // Handle any other errors that might occur
    console.error("Error creating note:", error);
  }
}

async function GetNotes() {
  const response = await fetch("http://localhost:4000/notes/get-notes");
  const data = await response.json();
  const notes = data.notes || [];
  return notes;
}

// async function DeleteNotes() {
//   fetch("http://localhost:4000/notes/delete-notes", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: "Test Note",
//       content: "This is a test note",
//     }),
//   }).then((response) => console.log(response));
// }

function QuartzxSpace(): JSX.Element {
  const [active, setActive] = useState("Home");
  const [notes, setNotes] = useState<string[]>([]); // State to store the fetched notes
  const username = window.localStorage.getItem("username");
  const [r, setR] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch notes and update state
    async function fetchNotes() {
      const fetchedNotes = await GetNotes();
      setNotes(fetchedNotes);
    }

    fetchNotes(); // Create a note (you may want to handle this differently)
  }, []); // The empty dependency array ensures this effect runs once on mount

  // Function to create a new note
  async function CreateNote() {
    try {
      // Remove leading and trailing spaces
      const trimmedTitle = noteTitle.trim();

      if (!trimmedTitle) {
        // Display an alert if the title is empty or contains only spaces
        alert(
          "Note title cannot be empty or contain only spaces. Please enter a valid title."
        );
        return;
      }

      const response = await fetch("http://localhost:4000/notes/Create-Notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
        }),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Note created successfully");
      } else {
        // Handle non-successful response (e.g., show an error message)
        console.error(
          "Failed to create note:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle any other errors that might occur
      console.error("Error creating note:", error);
    } finally {
      setNoteTitle(""); // Clear the noteTitle after creating the note
    }
  }

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
                  item.name === "Create a Note"
                    ? (() => {
                        setR(true);
                        CreateNote();
                      })()
                    : null;
                }
              }}
              className={item.name === active ? "Active" : ""}
            >
              {item.icon}
              <button>{item.name}</button>
            </li>
          ))}

          {/* Dynamically render notes in the sidebar */}
          <h4>Notes</h4>
          {notes.map((note, index) => (
            <li key={index} className="Note">
              <span
                className="NoteTitle"
                onClick={() => navigate(`/QuartzxSpace/${note}`)}
              >
                {note}
              </span>
            </li>
          ))}
          {r ? (
            <input
              type="text"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => {
                // Prevent leading and trailing spaces
                setNoteTitle(e.target.value.trim());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  CreateNote();
                  setR(false);
                  navigate(`/QuartzxSpace/${noteTitle}`);
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
