import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "../Styles/TextEditor.css";
import { io, Socket } from "socket.io-client";
import { DeltaOperation, DeltaStatic } from "quill";

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

  //Socket Connection
  useEffect(() => {
    const s: Socket = io("http://localhost:5001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []); // Make sure to pass an empty dependency array if you only want to run this effect once

  //Delta interface type
  interface Delta {
    ops?: DeltaOperation[] | undefined;
  }

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: Delta, oldDelta: Delta, source: string) => {
      if (source !== "user") return;

      console.log("sending changes", delta);
      socket.emit("send-changes", delta);
    };

    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill]);

  //Asyncrhonous updates
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: DeltaStatic) => {
      console.log("recieved changes", delta);
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
    setQuill(q);
  }, []);

  return <div id="container" ref={wrapperRef}></div>;
}
