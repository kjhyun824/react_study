import React from 'react';

export const createContext = <T,>(ctx: T, displayName?: string) => {
  const context = React.createContext(ctx);
  context.displayName = displayName;
  return context;
};
