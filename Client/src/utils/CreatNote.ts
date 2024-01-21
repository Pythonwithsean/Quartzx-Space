
import { v4 as uuidv4 } from "uuid";

const navigateToNote = (noteTitle: string) => {
  console.log(noteTitle);
  window.location.href =
    window.location.origin + `/Dashboard/${noteTitle}/${uuidv4()}`;
};

//Async Function to Create a Note through the API
export default async function CreateNote(noteTitle: string, user: string): Promise<void> {
  try {
     const response = await fetch("http://localhost:4000/notes/Create-Notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: noteTitle,
        user : user
      }),
    });

    if (response.ok) {
      // Handle successful response
      console.log("Note created successfully");
      navigateToNote(noteTitle);

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
