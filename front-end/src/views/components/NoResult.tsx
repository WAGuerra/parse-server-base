import React from 'react';
import {Typography} from '@material-ui/core';

export const NoResult: React.FC = (props) => {
  
  return (
      <Typography variant={'subtitle1'} color={'textSecondary'}>
        Sem resultados
      </Typography>
  );
};
