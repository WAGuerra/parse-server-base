import React from 'react';
import {Typography} from '@material-ui/core';

export const NullOrUndefinedValue: React.FC = (props) => {
  return (
      <Typography variant={'body2'} color={'textSecondary'} component={"span"}>??</Typography>);
};
