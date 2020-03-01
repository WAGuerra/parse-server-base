import React from 'react';
import {Typography} from '@material-ui/core';

export const ComponentLoadFail: React.FC = (props) => {
  
  return (
      <Typography color={'error'}>
        Falha ao carregar componente
      </Typography>
  );
};
