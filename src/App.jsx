import { useState } from "react";
import "./App.css";
import * as d3 from "d3";

const data = [4, 8, 15, 16, 23, 42];

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
