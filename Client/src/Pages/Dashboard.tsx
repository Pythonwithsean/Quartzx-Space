import React, { useState, useEffect } from "react";
import {
  Home,
  Search,
  StickyNote,
  Trash2,
  BarChart2,
  Clock,
  Calendar,
  BookOpen,
  Plus,
  Edit3,
  Star,
  Activity,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import "../Styles/Dashboard.css";

// Function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Sample data for dashboard
const sampleNotes = [
  {
    id: "1",
    title: "Project Ideas",
    preview: "List of potential projects to work on this quarter...",
    lastEdited: "2023-05-10T14:22:00",
    category: "Work",
    wordCount: 342,
  },
  {
    id: "2",
    title: "Meeting Notes",
    preview: "Discussion points from the team meeting on product roadmap...",
    lastEdited: "2023-05-08T09:15:00",
    category: "Work",
    wordCount: 518,
  },
  {
    id: "3",
    title: "Book Recommendations",
    preview: "Books I want to read this summer: 1. Atomic Habits...",
    lastEdited: "2023-05-05T18:30:00",
    category: "Personal",
    wordCount: 205,
  },
  {
    id: "4",
    title: "Learning Resources",
    preview: "Useful websites and courses for learning React and TypeScript...",
    lastEdited: "2023-05-01T11:45:00",
    category: "Education",
    wordCount: 423,
  },
];

const recentActivity = [
  {
    id: "1",
    action: "Created note",
    title: "Project Ideas",
    timestamp: "2023-05-10T14:22:00",
  },
  {
    id: "2",
    action: "Edited note",
    title: "Meeting Notes",
    timestamp: "2023-05-08T09:15:00",
  },
  {
    id: "3",
    action: "Added to favorites",
    title: "Book Recommendations",
    timestamp: "2023-05-05T18:30:00",
  },
  {
    id: "4",
    action: "Created note",
    title: "Learning Resources",
    timestamp: "2023-05-01T11:45:00",
  },
];

function Dashboard() {
  const [notes, setNotes] = useState<any[]>(sampleNotes);
  const [activities, setActivities] = useState<any[]>(recentActivity);
  const [username, setUsername] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = window.localStorage.getItem("username");
    setUsername(storedUsername);

    // In a real app, you would fetch notes and activities from an API here
    // For now, we're using the sample data
  }, []);

  const handleCreateNote = () => {
    if (newNoteTitle.trim() === "") return;

    // In a real app, you would call an API to create the note
    // For now, we'll just navigate to a new note page
    navigate(`/Dashboard/${newNoteTitle}/${uuidv4()}`);
    setIsCreateModalOpen(false);
    setNewNoteTitle("");
  };

  const navigateToNote = (noteTitle: string) => {
    navigate(`/Dashboard/${noteTitle}/${uuidv4()}`);
  };

  // Calculate dashboard statistics
  const totalNotes = notes.length;
  const totalWords = notes.reduce((sum, note) => sum + note.wordCount, 0);
  const categoryCounts = notes.reduce((acc: any, note) => {
    acc[note.category] = (acc[note.category] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.keys(categoryCounts).length;

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-welcome">
          <h1>Dashboard</h1>
          {username && (
            <p className="welcome-message">
              Welcome back,{" "}
              {username.charAt(0).toUpperCase() + username.slice(1)}!
            </p>
          )}
        </div>
        <button
          className="create-note-button"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <StickyNote size={20} />
          </div>
          <div className="stat-details">
            <h3>{totalNotes}</h3>
            <p>Total Notes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen size={20} />
          </div>
          <div className="stat-details">
            <h3>{totalWords}</h3>
            <p>Total Words</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={20} />
          </div>
          <div className="stat-details">
            <h3>{categories}</h3>
            <p>Categories</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <div className="stat-details">
            <h3>
              {notes.length > 0 ? formatDate(notes[0].lastEdited) : "N/A"}
            </h3>
            <p>Last Update</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Recent Notes Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Notes</h2>
            <Link to="/notes" className="view-all">
              View All
            </Link>
          </div>

          <div className="notes-grid">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-card"
                onClick={() => navigateToNote(note.title)}
              >
                <div className="note-card-header">
                  <span className="note-category">{note.category}</span>
                  <div className="note-actions">
                    <button className="note-action-icon">
                      <Star size={16} />
                    </button>
                    <button className="note-action-icon">
                      <Edit3 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="note-title">{note.title}</h3>
                <p className="note-preview">{note.preview}</p>
                <div className="note-meta">
                  <span className="note-date">
                    <Clock size={14} />
                    {formatDate(note.lastEdited)}
                  </span>
                  <span className="note-words">{note.wordCount} words</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>

          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.action === "Created note" && <Plus size={16} />}
                  {activity.action === "Edited note" && <Edit3 size={16} />}
                  {activity.action === "Added to favorites" && (
                    <Star size={16} />
                  )}
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-title">{activity.title}</span>
                  </p>
                  <span className="activity-time">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Note</h2>
            <input
              type="text"
              placeholder="Note Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button
                className="modal-button cancel"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setNewNoteTitle("");
                }}
              >
                Cancel
              </button>
              <button
                className="modal-button create"
                onClick={handleCreateNote}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
