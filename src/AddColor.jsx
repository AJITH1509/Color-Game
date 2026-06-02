import { ColorBox } from "./ColorBox";

export function AddColor() {
  return (
    <div className="page-layout-container">
      <main className="main-content-area">
        {/* Semantic page-level header configuration */}
        <header className="game-brand-header">
          <h1 className="game-title">Color Studio</h1>
          <p className="game-instruction">
            Type a valid color name or hex code below to expand your interactive canvas.
          </p>
        </header>
        
        {/* Main interactive application block */}
        <ColorBox />
      </main>
      
      {/* Semantic footer layout with an automated runtime timestamp */}
      <footer className="game-footer">
        <p>© {new Date().getFullYear()} • Crafted with precision by Ajithkumar</p>
      </footer>
    </div>
  );
}
