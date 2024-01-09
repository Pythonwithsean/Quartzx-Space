import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "../Styles/TextEditor.css";
import { io, Socket } from "socket.io-client";
import { DeltaOperation, DeltaStatic } from "quill";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [""] }], // dropdown with defaults from theme
  [{ font: [] }],

  ["clean"],
];

export default function TextEditor(): JSX.Element {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [quill, setQuill] = useState<Quill | undefined>(undefined);
  const { noteID: documentId } = useParams<{ noteID: string }>();
  const { noteTitle: documentTitle } = useParams<{ noteTitle: string }>();

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document: string) => {
      quill?.setContents(JSON.parse(document));
      quill?.enable();
    });
    socket.emit("get-document", documentId);
  }, [documentId, documentTitle, socket, quill]);

  //Socket Connection
  useEffect(() => {
    const s: Socket = io("http://localhost:5003");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);
  // Make sure to pass an empty dependency array if you only want to run this effect once

  //Delta interface type

  type Delta = {
    ops?: DeltaOperation[] | undefined;
  };

  //Payload for sending changes

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: Delta, oldDelta: Delta, source: string) => {
      if (source !== "user") return;

      socket.emit("send-changes", delta, oldDelta, documentTitle, documentId);
      return () => {
        socket?.off("send-changes", handler);
      };
    };

    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill, documentTitle, documentId]);

  //function to send contents to database

  //Asyncrhonous updates
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: DeltaStatic) => {
      quill?.updateContents(delta);
    };

    socket?.on("receive-changes", handler); // // Connect to the server event "receive-changes"

    return () => {
      socket?.off("receive-changes", handler); // Change event name to "receive-changes"
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return <div id="container" ref={wrapperRef}></div>;
}
