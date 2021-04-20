import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { GlobalContext } from '../../util/mobx/context/global_context';
import useAction from '../../util/mobx/hook/useAction';
import useStore from '../../util/mobx/hook/useStore';
import PowderAction from '../../view_model/action/powder_action';
import PowderPresenter from './powder_presenter';

const PowderContainer = () => {
  const powder_action = useAction<PowderAction>(PowderAction, useStore(GlobalContext));
  useEffect(() => {
    return () => {
      powder_action.deinit();
    };
  }, []);

  const is_focused = useIsFocused();
  return <>{is_focused ? <PowderPresenter /> : null}</>;
};

export default PowderContainer;
