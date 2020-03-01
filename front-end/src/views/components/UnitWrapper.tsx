import React, {ReactNode} from 'react';
import {Typography} from '@material-ui/core';
import {NullOrUndefinedValue} from './NullOrUndefinedValue';

interface UnitWrapperInterface {
  value: string | ReactNode,
  unit?: string,
  size?: 'small' | 'medium',
  type?: 'prefixed' | 'suffixed'
}

export const UnitWrapper: React.FC<UnitWrapperInterface> = ({value, type, unit, size, children}) => {
  
  if (value == null) {
    return <NullOrUndefinedValue/>;
  }
  
  const Unit = (
      <Typography noWrap variant={(
                                      size === 'medium'
                                  ) ? 'body2' : 'caption'} component={'span'}
                  color={'textSecondary'}>
        {unit || children}
      </Typography>
  );
  
  return (
      <span>
        {(
             type === 'prefixed'
         ) ? Unit : ''} {value} {(
                                     type !== 'prefixed'
                                 ) ? Unit : ''}
      </span>
  );
};
