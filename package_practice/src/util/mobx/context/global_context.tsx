import React, { useState } from 'react';

import { createContext } from './create_context';
import GlobalStore from '../../../view_model/store/global_store';

export const GlobalContext = createContext<GlobalStore | null>(null, 'GlobalStore');

export const GlobalProvider = ({ children }: any) => {
  const [appStore] = useState(() => new GlobalStore());
  return <GlobalContext.Provider value={appStore}>{children}</GlobalContext.Provider>;
};
