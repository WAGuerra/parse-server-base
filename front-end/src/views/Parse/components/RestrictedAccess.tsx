import React, {
  Fragment,
  ReactElement,
} from 'react';
import {useHasRole} from '../../../lib/Parse/hooks/useHasRole';

interface RestrictedAccessInterface {
  role: string,
  children?: ReactElement | ReactElement[]
}

export const RestrictedAccess: React.FC<RestrictedAccessInterface> = ({role, children}) => {
  const [hasRole] = useHasRole(role);
  
  if (!hasRole) {
    return null;
  }
  
  return (
    <Fragment>{children}</Fragment>
  );
};
