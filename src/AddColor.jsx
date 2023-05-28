import { ColorBox } from "./ColorBox";

export function AddColor() {
  return (
    <div className="AddColor-container">
      <div className="header">
        <h1>Color Game</h1>
        <p className="para">type valid color name and click on add color</p>
        <ColorBox />
      </div>
      <br />
      <hr />
      <p className="para"> © created by Ajithkumar</p>
    </div>
  );
}
