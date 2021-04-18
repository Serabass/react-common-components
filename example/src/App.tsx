import React from "react";
import { Ajax, ErrorBoundary } from "react-common-components";
import "react-common-components/dist/index.css";

let App = () => {
  return (
    <ErrorBoundary>
      {() => (
        <Ajax url="https://swapi.dev/api/people/1/" method="GET">
          {({ response }) => {
            return <pre>{JSON.stringify(response, null, 4)}</pre>;
          }}
        </Ajax>
      )}
    </ErrorBoundary>
  );
};

export default App;
