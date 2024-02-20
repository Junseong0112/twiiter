import { useEffect } from "react";
import { analytics } from "./service/firebase";

function App() {
  useEffect(() => {
    console.log(analytics);
  });

  return <div className="App"></div>;
}

export default App;
