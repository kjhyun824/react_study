import React from 'react';

const useStore = <T,>(store_context: React.Context<T>) => {
  const store = React.useContext<T>(store_context);
  if (!store) {
    throw Error(`Cannot find ${store_context.displayName} In Context Provider`);
  }
  return store;
};

export default useStore;
