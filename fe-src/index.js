import React, {useEffect, useState} from "react";
import {render} from "react-dom";

function App() {
  let [value, setValue] = useState("No value");
  React.useEffect(() => {
    fetch("/api").then(res => res.json()).then(
      value => setValue(value.value.id)
    ).catch(console.error)
  }, []);

  return <h1>App, value: {value}</h1>
}

render(<App />, document.getElementById("root"));