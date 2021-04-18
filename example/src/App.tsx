import React from 'react';
import { Ajax } from 'react-common-components';
import 'react-common-components/dist/index.css';

let App = () => {
  return (
    <Ajax url='https://swapi.dev/api/people/1/' method='GET'>
      {
        (() => {
          return <div>1</div>;
        }) as any
      }
    </Ajax>
  );
};

export default App;
