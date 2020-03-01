import React, {Fragment} from 'react';
import {useRoutes} from 'hookrouter';
import {useParseValues} from '../providers/ParseProvider';
import NotFoundPage from '../views/Status/NotFoundPage';
import Login from '../views/UserAccess/views/LoginPage';
import routes from './routes';

const RootRouter: React.FC = () => {
  const routeResult = useRoutes(routes);
  const [{user},] = useParseValues();
  
  if (!user) {
    return <Login/>;
  }
  
  return (
      <Fragment>{routeResult || <NotFoundPage/>}</Fragment>
  );
};

RootRouter.propTypes = {};

export default RootRouter;
