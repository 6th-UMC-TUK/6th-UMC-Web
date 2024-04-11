import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  function increaseText() {
    console.log("increase가 출력됨");
    setCount(count + 1); 
  }
  function decreaseText() {
    console.log("decrease가 출력됨");
    setCount(count - 1);
  }
  return (
    <>
      <div>
        <h3>{count}</h3>
        <button onClick={increaseText}>+1</button>
        <button onClick={decreaseText}>-1</button>
      </div>
    </>
  );
}

export default App;