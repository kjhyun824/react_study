import { useRef } from 'react';

/**
 * Create ref to the functional component (It will not re-run on each render)
 * @param action
 * @param args context | obj | array
 * @return Action
 */

// Comment: how can I type args?

const useAction = <T,>(action: any, store: any, ...args: any[]): T => {
  let actionRef = useRef(null);
  if (!actionRef.current) {
    actionRef.current = new action(store, ...args);
  }
  return actionRef.current!;
};

export default useAction;
