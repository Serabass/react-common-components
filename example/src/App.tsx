import React from "react";
import { Ajax } from "react-common-components";
import "react-common-components/dist/index.css";

let App = () => {
  return (
    <Ajax url="https://swapi.dev/api/people/1/" method="GET">
      {({ response }) => <div>{response.data}</div>}
    </Ajax>
  );
};

export default App;
