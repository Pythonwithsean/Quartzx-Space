"use client";

import { useState, useRef, useEffect } from "react";
import {
  Moon,
  Sun,
  Save,
  Download,
  HelpCircle,
  MoreHorizontal,
  List,
} from "lucide-react";
import "../Styles/MinimalEditor.css";

interface MinimalEditorProps {
  initialContent?: string;
  noteTitle?: string;
  onSave?: (content: string) => void;
}

function MinimalEditor({
  initialContent = "",
  noteTitle = "Untitled",
  onSave,
}: MinimalEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Focus the editor on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const chars = content.length;

    setWordCount(words);
    setCharCount(chars);
    setIsSaved(false);
  }, [content]);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    setIsSaved(true);
    // You could also implement local storage saving here
    localStorage.setItem(`note-${noteTitle}`, content);
  };

  // Handle download as text file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${noteTitle}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save on Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div
      className={`minimal-editor ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="editor-header">
        <h1 className="note-title">{noteTitle}</h1>
        <div className="editor-actions">
          <button
            className="action-button theme-toggle"
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className={`action-button save-button ${!isSaved ? "unsaved" : ""}`}
            onClick={handleSave}
            title="Save (Ctrl+S)"
          >
            <Save size={18} />
          </button>
        </div>
      </div>

      <textarea
        ref={editorRef}
        className="editor-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        spellCheck="false"
      />

      <div className="editor-footer">
        <div className="word-count">
          {wordCount} words | {charCount} characters
        </div>
        <div className="footer-actions">
          <button className="footer-button" title="Help">
            <HelpCircle size={16} />
          </button>
          <button
            className="footer-button"
            onClick={() => setShowMenu(!showMenu)}
            title="More options"
          >
            <MoreHorizontal size={16} />
          </button>
          <button className="footer-button" title="Download">
            <Download size={16} onClick={handleDownload} />
          </button>
          <button className="footer-button" title="View as list">
            <List size={16} />
          </button>
        </div>

        {showMenu && (
          <div className="menu-dropdown">
            <button onClick={handleDownload}>Download as TXT</button>
            <button onClick={handleSave}>Save to cloud</button>
            <button onClick={() => setContent("")}>Clear editor</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MinimalEditor;
