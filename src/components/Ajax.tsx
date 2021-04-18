import React, { useState } from "react";

function fetchMock(...args: any[]) {
  return Promise.resolve({
    json() {
      return Promise.resolve(args);
    }
  });
}

export interface AjaxProps<T> {
  url: string;
  method: any;
  errorCallback?: (error: Error) => React.ReactNode;
  loadingCallback?: () => React.ReactNode;
  children: ({ response, refetch }: { response: T; refetch?: any }) => any;
}

export function Ajax<T extends any = any>({
  url,
  method,
  children,
  errorCallback = (error) => <span>{error.message}</span>,
  loadingCallback = () => <span>Loading...</span>
}: AjaxProps<T>) {
  let [response, setResponse] = useState<T>();
  let [error, setError] = useState<Error>();

  function refetch() {
    fetchMock(url, {
      method
    })
      .then(async (res) => {
        let json = (await res.json()) as T;
        setResponse(json);
      })
      .catch((err) => {
        setError(err);
      });
  }

  if (!response) {
    console.log("no response");
    refetch();
    return loadingCallback();
  }

  if (error) {
    return errorCallback(error);
  }

  return children({ response: response as any });
}
