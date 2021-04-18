import React, { useState } from "react";

function fetchMock(...args: any[]) {
  return Promise.resolve({
    data: "test"
  });
}

export interface AjaxProps<T> {
  url: string;
  method: any;
  errorCallback?: (error: any) => React.ReactNode;
  loadingCallback?: () => React.ReactNode;
  children: ({ response }: { response: T }) => any;
}

export function Ajax<T extends any = any>({
  url,
  method,
  children,
  errorCallback = (error) => <span>{error.message}</span>,
  loadingCallback = () => <span>Loading...</span>
}: AjaxProps<T>) {
  let [response, setResponse] = useState<T>();
  let [error, setError] = useState<any>();

  function refetch() {
    fetchMock(url, {
      method
    })
      .then((res) => {
        setResponse((res as unknown) as T);
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
