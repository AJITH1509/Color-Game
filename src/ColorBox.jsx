import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export function ColorBox() {
  const inputRef = useRef(null);

  const [button, setButton] = useState(true);
  const [color, setColor] = useState("skyblue");
  const [index, setIndex] = useState("");
  const [addcolor, setAddcolor] = useState([]);

  function editColor(colors, index) {
    inputRef.current.focus();
    setColor(colors);
    setButton(false);
    setIndex(index);
  }

  function updateColor() {
    const updatedColors = [...addcolor]; // create a copy of the colors array
    updatedColors[index] = color; // update the color at the specified index
    setAddcolor(updatedColors); // set the state with the updated colors array
    setButton(true);
  }
  function deleteColor(index) {
    const clrs = [...addcolor];
    const deleteColors = clrs.filter((colors, i) => i !== index);
    setAddcolor(deleteColors);
  }

  const styles = {
    backgroundColor: color,
  };

  return (
    <div className="main-container">
      <div className="container">
        <input
          ref={inputRef}
          type="text"
          style={styles}
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
        {button ? (
          <Button
            sx={{ marginLeft: "5px" }}
            variant="outlined"
            onClick={() => setAddcolor([...addcolor, color])}
          >
            Add Color
          </Button>
        ) : (
          <Button
            sx={{ marginLeft: "5px" }}
            color="success"
            variant="outlined"
            onClick={() => updateColor()}
          >
            Update Color
          </Button>
        )}
      </div>
      {addcolor.map((clr, index) => (
        <ColorBlocks
          colors={clr}
          key={index}
          index={index}
          editColor={editColor}
          deleteColor={deleteColor}
        />
      ))}
    </div>
  );
}
function ColorBlocks({ colors, index, editColor, deleteColor }) {
  const bclr = {
    backgroundColor: colors,
  };
  return (
    <div className="colors-container">
      <div className="color-Blocks" style={bclr}></div>
      <IconButton
        sx={{ padding: "0px 0px 0px 5px" }}
        onClick={() => editColor(colors, index)}
        color="secondary"
      >
        <ModeEditIcon />
      </IconButton>
      <IconButton
        sx={{ padding: "0px 0px 0px 5px" }}
        onClick={() => deleteColor(index)}
        color="error"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
