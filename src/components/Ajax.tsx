import React, { useState } from 'react';

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
  let [loading, setLoading] = useState<boolean>(false);
  let [error, setError] = useState<any>();

  function refetch() {
    setLoading(true);
    fetch(url, {
      method
    })
      .then((res) => {
        setResponse((res as unknown) as T);
        setLoading(false);
      })
      .catch((err) => {
        setError((err as unknown) as T);
        setLoading(false);
      });
  }

  if (!response) {
    refetch();
    return loadingCallback();
  }

  if (loading) {
    return loadingCallback();
  }

  if (error) {
    return errorCallback(error);
  }

  return children({ response: response as any });
}
