import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
    console.log("+1");
  };
  const decrease = () => {
    setCount(count - 1);
    console.log("-1");
  };

  return (
    <>
      <h1>{count}</h1>
      <div>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    </>
  );
}

export default App;
