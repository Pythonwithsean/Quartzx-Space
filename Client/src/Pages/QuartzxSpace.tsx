import { Link } from "react-router-dom";
import { Home, Search, StickyNote, Trash2 } from "lucide-react";
import { useEffect, useState, ReactNode } from "react";
import "../Styles/QuartzxSpace.css";
import "../Styles/Bar.css";
import { useNavigate } from "react-router-dom";

//Function to Capitalize the first letter of a string
function CapitalizeFirstletter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Todo make the Create note function Create a URI for the note and then use that URI to create a note
//Todo make the Get note function get the URI of the note and then use that URI to get the note
//Todo make the Delete note function get the URI of the note and then use that URI to delete the note

// Async Function to Create a Note through the API
// async function CreateNote(noteTitlex: string): Promise<void> {
//   try {
//     const noteT = await noteTitle;

//     const response = await fetch("http://localhost:4000/notes/Create-Notes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: noteT,
//       }),
//     });

//     if (response.ok) {
//       // Handle successful response
//       console.log("Note created successfully");
//     } else {
//       // Handle non-successful response (e.g., show an error message)
//       console.error(
//         "Failed to create note:",
//         response.status,
//         response.statusText
//       );
//     }
//   } catch (error) {
//     // Handle any other errors that might occur
//     console.error("Error creating note:", error);
//   }
// }

const navigateToNote = (noteTitle: string) => {
  window.location.href = window.location.origin + `/Dashboard/${noteTitle}`;
};

// Async Function to Get Notes through the API
async function GetNotes() {
  const response = await fetch("http://localhost:4000/notes/get-notes");
  const data = await response.json();
  const notes = data.notes || [];
  return notes;
}

interface QuartzxSpaceProps {
  Children: ReactNode;
}

//Function Returning QuartzxSpace Page

function QuartzxSpace({ Children }: QuartzxSpaceProps): JSX.Element {
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

  return (
    <>
      //Render the sidebar
      <div className="SIDEBAR">
        <ul>
          <li onClick={() => navigate("/")}>
            <Home />
            Home
          </li>
          <li>
            <Search /> Search
          </li>
          <li
            onClick={() => {
              setR(true);
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
                }
              }}
            />
          ) : null}

          <li>
            <Trash2 />
            Delete a Note
          </li>

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
        <div className="Text-Area">{Children}</div>
      </div>
    </>
  );
}

export default QuartzxSpace;
