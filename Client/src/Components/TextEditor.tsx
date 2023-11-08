import { useCallback } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import "../Styles/TextEditor.css";

export default function TextEditor() {
  const TextData = document.querySelector(".ql-editor p");
  setTimeout(() => console.log(TextData?.innerHTML), 2000);
  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    new Quill(editor, { theme: "snow" });
  }, []);
  return <div id="container" ref={wrapperRef}></div>;
}
