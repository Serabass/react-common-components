import React, { useState } from "react";

function fetchMock(...args: any[]) {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "http://swapi.dev/api/planets/1/",
        films: [
          "http://swapi.dev/api/films/1/",
          "http://swapi.dev/api/films/2/",
          "http://swapi.dev/api/films/3/",
          "http://swapi.dev/api/films/6/"
        ],
        species: [],
        vehicles: [
          "http://swapi.dev/api/vehicles/14/",
          "http://swapi.dev/api/vehicles/30/"
        ],
        starships: [
          "http://swapi.dev/api/starships/12/",
          "http://swapi.dev/api/starships/22/"
        ],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "http://swapi.dev/api/people/1/"
      })
  });
}

export interface AjaxProps<TRes, TData> {
  url: string;
  method: any;
  data?: TData;
  errorCallback?: (error: Error) => React.ReactNode;
  loadingCallback?: () => React.ReactNode;
  children: ({ response, refetch }: { response: TRes; refetch?: any }) => any;
}

export function Ajax<TRes extends any = any, TData extends any = any>({
  url,
  method,
  data,
  children,
  errorCallback = (error) => <span>{error.message}</span>,
  loadingCallback = () => <span>Loading...</span>
}: AjaxProps<TRes, TData>) {
  let [response, setResponse] = useState<TRes>();
  let [error, setError] = useState<Error>();

  function refetch() {
    fetchMock(url, {
      method
    })
      .then(async (res) => {
        let json = (await res.json()) as TRes;
        setResponse(json);
      })
      .catch((err) => {
        setError(err);
      });
  }

  if (error) {
    return errorCallback(error);
  }

  if (!response) {
    refetch();
    return loadingCallback();
  }

  return children({ response });
}
