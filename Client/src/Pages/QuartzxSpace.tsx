import { Link } from "react-router-dom";
import { Home, Search, StickyNote, Trash2 } from "lucide-react";
import { useEffect, useState, ReactNode } from "react";
import "../Styles/QuartzxSpace.css";
import "../Styles/Bar.css";
import { useNavigate } from "react-router-dom";
import CreateNote from "../utils/CreateNote";
import { v4 as uuidv4 } from "uuid";

//Function to Capitalize the first letter of a string
function CapitalizeFirstletter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Todo make the Create note function Create a URI for the note and then use that URI to create a note
//Todo make the Get note function get the URI of the note and then use that URI to get the note
//Todo make the Delete note function get the URI of the note and then use that URI to delete the note

// Async Function to Get Notes through the API

async function deleteNotes(query: string, username: string) {
  const reponse = await fetch("http://localhost:3001/notes/delete-notes", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user: username,
      title: query,
    }),
  });
  if (reponse.ok) {
    alert("Note Deleted");
    window.location.reload();
  }
}

interface QuartzxSpaceProps {
  Children: ReactNode;
}

//Function Returning QuartzxSpace Page

function QuartzxSpace({ Children }: QuartzxSpaceProps): JSX.Element {
  const [notes, setNotes] = useState<string[]>([]); // State to store the fetched notes
  const username = window.localStorage.getItem("username");
  const [r, setR] = useState<boolean>(false);
  const [f, setF] = useState<boolean>(false);
  const [s, setS] = useState<boolean>(false);
  const [found, setFound] = useState<String[]>([]);
  const [search, setSearch] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const [deleteNote, setDeleteNote] = useState("");
  const navigate = useNavigate();

  async function GetNotes() {
    const response = await fetch("http://localhost:3001/notes/get-notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: window.localStorage.getItem("username"),
      }),
    });

    const data = await response.json();
    const notes = data.notes || [];

    return notes;
  }

  const navigateToNote = (noteTitle: string) => {
    navigate(`/Dashboard/${noteTitle}/${uuidv4()}`);
  };

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
      //Render the sidebar
      <div className="SIDEBAR">
        <ul>
          <li onClick={() => navigate("/")}>
            <Home />
            Home
          </li>
          <li
            onClick={() => {
              setR(false);
              setF(false);
              setS(true);
            }}
          >
            <Search /> Search
          </li>
          {s ? (
            <input
              type="text"
              placeholder="Title"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.trim());
                () => {
                  setFound(found.filter((element) => element === search));
                };
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setS(false);
                  console.log(search);
                }
              }}
            />
          ) : null}
          {found.length !== 0
            ? found.map((element) => {
                console.log(element);
                return <div>{element}</div>;
              })
            : null}
          <li
            onClick={() => {
              setR(true);
              setF(false);
              setS(false);
            }}
          >
            <StickyNote />
            Add New Note
          </li>
          {r ? (
            <input
              type="text"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => {
                setNoteTitle(e.target.value.trim());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setR(false);
                  if (username !== null) {
                    CreateNote(noteTitle, username);
                    navigateToNote(noteTitle);
                  }
                }
              }}
            />
          ) : null}

          <li
            onClick={() => {
              setF(true);
              setR(false);
              setS(false);
            }}
          >
            <Trash2 />
            Delete a Note
          </li>
          {f ? (
            <input
              type="text"
              placeholder="Title"
              value={deleteNote}
              onChange={(e) => {
                setDeleteNote(e.target.value.trim());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setF(false);
                  if (username !== null) deleteNotes(deleteNote, username);
                  setDeleteNote("");
                }
              }}
            />
          ) : null}

          {/* Dynamically render notes in the sidebar */}
          <h4>List Of Notes</h4>
          {notes.map((note, index) => (
            <li
              key={index}
              className="Note"
              onClick={() => {
                navigateToNote(note);
              }}
            >
              <span className="NoteTitle">{note}</span>
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
        <h1>Currently on {window.location.href.split("/")[4]} </h1>
        <div className="Text-Area">{Children}</div>
      </div>
    </>
  );
}

export default QuartzxSpace;
