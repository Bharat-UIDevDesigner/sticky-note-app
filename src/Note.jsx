import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Keep only one import statement for Draggable
import './Note.css';

function Note({
  id,
  text,
  x,
  y,
  pinned,
  onDrag,
  onDelete,
  onUpdate,
  onTogglePin,
}) {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onUpdate(id, editedText);
  };

  return (
    <Draggable
      disabled={pinned}
      onDrag={(e, data) => onDrag(id, data.deltaX, data.deltaY)}
      defaultPosition={{ x, y }}
    >
      <div className={`note ${pinned ? 'pinned' : ''}`}>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <div onDoubleClick={handleDoubleClick}>
            {text}
          </div>
        )}
        <button onClick={() => onDelete(id)}>X</button>
        <button onClick={() => onTogglePin(id)}>{pinned ? 'Unpin' : 'Pin'}</button>
      </div>
    </Draggable>
  );
}

export default Note;
