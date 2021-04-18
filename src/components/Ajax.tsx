import React, { useState } from "react";

function fetchMock(...args: any[]) {
  return Promise.resolve({
    json: () => Promise.resolve(args)
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
