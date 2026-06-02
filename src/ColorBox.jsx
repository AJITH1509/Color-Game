import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";

// Helper for generating safe, runtime-unique keys without external dependencies
const generateUniqueId = () => `color_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export function ColorBox() {
  const inputRef = useRef(null);

  // Clean, self-descriptive state naming conventions
  const [isEditing, setIsEditing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#3b82f6"); // Modern digital blue default
  const [editingId, setEditingId] = useState(null);
  const [colorsList, setColorsList] = useState([
    { id: "1", value: "#ef4444" },
    { id: "2", value: "#10b981" },
    { id: "3", value: "#3b82f6" }
  ]);

  const handleAddColor = () => {
    if (!currentColor.trim()) return;
    
    const newColorItem = {
      id: generateUniqueId(),
      value: currentColor.trim()
    };
    
    setColorsList([...colorsList, newColorItem]);
    setCurrentColor("#3b82f6"); // Reset to safe visual default
    inputRef.current?.focus();
  };

  const handleEditTrigger = (colorObj) => {
    setIsEditing(true);
    setCurrentColor(colorObj.value);
    setEditingId(colorObj.id);
    inputRef.current?.focus();
  };

  const handleUpdateColor = () => {
    if (!currentColor.trim() || !editingId) return;

    const updatedColors = colorsList.map((item) => 
      item.id === editingId ? { ...item, value: currentColor.trim() } : item
    );

    setColorsList(updatedColors);
    setIsEditing(false);
    setEditingId(null);
    setCurrentColor("#3b82f6"); // Clear state loop gracefully
  };

  const handleDeleteColor = (targetId) => {
    setColorsList(colorsList.filter((item) => item.id !== targetId));
    // If deleting the color currently being edited, cancel edit state
    if (editingId === targetId) {
      setIsEditing(false);
      setEditingId(null);
      setCurrentColor("#3b82f6");
    }
  };

  return (
    <div className="main-container">
      <div className="app-card">
        <header className="app-header">
          <h2>Color Palette Canvas</h2>
          <p>Create, update, and manage your dynamic color components seamlessly.</p>
        </header>

        <div className="input-control-group">
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="color-text-input"
              onChange={(e) => setCurrentColor(e.target.value)}
              value={currentColor}
              placeholder="e.g., #ff5733 or lime"
              aria-label="Color string input value"
            />
            <div 
              className="input-color-preview" 
              style={{ backgroundColor: currentColor }} 
              aria-hidden="true"
            />
          </div>

          {isEditing ? (
            <Button
              className="action-button"
              color="success"
              variant="contained"
              startIcon={<DoneIcon />}
              onClick={handleUpdateColor}
              disableElevation
            >
              Update
            </Button>
          ) : (
            <Button
              className="action-button"
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddColor}
              disableElevation
            >
              Add
            </Button>
          )}
        </div>

        <div className="palette-divider" />

        <div className="colors-list-wrapper">
          {colorsList.length === 0 ? (
            <p className="empty-state">No colors in canvas. Type a value above to begin.</p>
          ) : (
            colorsList.map((item) => (
              <ColorBlocks
                key={item.id}
                colorItem={item}
                onEditTrigger={handleEditTrigger}
                onDeleteTrigger={handleDeleteColor}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ColorBlocks({ colorItem, onEditTrigger, onDeleteTrigger }) {
  return (
    <div className="colors-container">
      <div className="color-strip-preview" style={{ backgroundColor: colorItem.value }}>
        <span className="color-value-badge">{colorItem.value}</span>
      </div>
      
      <div className="action-actions-group">
        <Tooltip title="Edit Color Value" placement="top" arrow>
          <IconButton
            size="small"
            onClick={() => onEditTrigger(colorItem)}
            color="secondary"
            aria-label={`Edit color ${colorItem.value}`}
            className="action-icon-btn"
          >
            <ModeEditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Color" placement="top" arrow>
          <IconButton
            size="small"
            onClick={() => onDeleteTrigger(colorItem.id)}
            color="error"
            aria-label={`Delete color ${colorItem.value}`}
            className="action-icon-btn"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
