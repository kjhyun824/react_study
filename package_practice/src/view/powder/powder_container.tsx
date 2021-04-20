import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import PowderPresenter from './powder_presenter';

const PowderContainer = () => {
  useFocusEffect(() => {
    console.log('[DEBUG] Powder 입장!');
  });
  return <PowderPresenter />;
};

export default PowderContainer;
