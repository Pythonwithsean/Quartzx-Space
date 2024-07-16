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

  [{ align: [] }],

  ["image", "video"],

  ["clean"],
];

export default function TextEditor(): JSX.Element {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [quill, setQuill] = useState<Quill | undefined>(undefined);
  const { noteID: documentId } = useParams<{ noteID: string }>();
  const { noteTitle: documentTitle } = useParams<{ noteTitle: string }>();
  //Socket Connection
  useEffect(() => {
    const s: Socket = io("http://localhost:4002", {});
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    return () => {
      s.disconnect();
    };
  }, []);

  type Delta = {
    ops?: DeltaOperation[] | undefined;
  };
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: Delta, oldDelta: Delta, source: string) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta, oldDelta);
    };

    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill, documentTitle]);

  //Save Data

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [quill, socket]);

  //Function that ensures that the user has a note Selected and show contents of the user once they are connected
  useEffect(() => {
    if (quill == null || socket == null) return;

    if (documentTitle === undefined || documentId === undefined) {
      quill.disable();
      quill.setText("Select a note to edit");
      return;
    }
    socket.emit(
      "get-document",
      documentId,
      documentTitle,
      window.localStorage.getItem("username")
    );

    socket.once("load-document", (document) => {
      quill?.setContents(document);
      quill?.enable();
    });
  }, [documentTitle, documentId, socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: DeltaStatic) => {
      quill?.updateContents(delta);
    };

    socket?.on("receive-changes", handler);

    return () => {
      socket?.off("receive-changes", handler);
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
