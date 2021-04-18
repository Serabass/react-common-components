import React from "react";
import { Ajax, ErrorBoundary } from "react-common-components";
import "react-common-components/dist/index.css";

let App = () => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <ErrorBoundary>
      {() => (
        <Ajax url="https://swapi.dev/api/people/1/" method="GET">
          {({ response }) => <div>{response.name}</div>}
        </Ajax>
      )}
    </ErrorBoundary>
  );
};

export default App;
