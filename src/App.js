import React, { useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Note from './Note';


function App() {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    setNotes([...notes, { id: Date.now(), text: 'New Note', x: 0, y: 0, pinned: false }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const handleDrag = (id, deltaX, deltaY) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, x: note.x + deltaX, y: note.y + deltaY }
          : note
      )
    );
  };

  return (
    <div className="App">
      <button className='addnote' onClick={addNote}>+ Click to add note</button>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          x={note.x}
          y={note.y}
          pinned={note.pinned}
          onDrag={handleDrag}
          onDelete={deleteNote}
          onUpdate={updateNote}
          onTogglePin={togglePin}
        />
      ))}
    </div>
  );
}

export default App;
