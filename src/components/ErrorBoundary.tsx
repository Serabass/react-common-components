import React from "react";

export interface ErrorBoundaryProps {
  children: () => any;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  try {
    return children();
  } catch (e) {
    return <span>Error: {e.message}</span>;
  }
}
