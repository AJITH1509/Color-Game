import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export function ColorBox() {
  const [button, setButton] = useState(true);
  const [color, setColor] = useState("skyblue");
  const [index, setIndex] = useState("");
  const [addcolor, setAddcolor] = useState([]);

  function editColor(colors, index) {
    setColor(colors);
    setButton(false);
    setIndex(index);
    console.log(index);
  }

  function updateColor() {
    const updatedColors = [...addcolor]; // create a copy of the colors array
    updatedColors[index] = color; // update the color at the specified index
    setAddcolor(updatedColors); // set the state with the updated colors array
    setButton(true);
  }

  const styles = {
    backgroundColor: color,
  };

  return (
    <div>
      <div className="container">
        <input
          type="text"
          style={styles}
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
        {button ? (
          <Button
            variant="contained"
            onClick={() => setAddcolor([...addcolor, color])}
          >
            Add Color
          </Button>
        ) : (
          <Button variant="contained" onClick={() => updateColor()}>
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
        />
      ))}
    </div>
  );
}
function ColorBlocks({ colors, index, editColor }) {
  const bclr = {
    backgroundColor: colors,
  };
  return (
    <div className="colors-container">
      <div className="color-Blocks" style={bclr}></div>
      <IconButton
        sx={{ padding: "0px" }}
        onClick={() => editColor(colors, index)}
      >
        <ModeEditIcon />
      </IconButton>
    </div>
  );
}
