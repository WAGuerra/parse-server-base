import React from "react";
import ChoosePassword from '../views/Parse/views/ChoosePassword';
import InvalidLink from '../views/Parse/views/InvalidLink';
import InvalidVerificationLink
  from '../views/Parse/views/InvalidVerificationLink';
import LinkSendFail from '../views/Parse/views/LinkSendFail';
import PasswordResetSuccess from '../views/Parse/views/PasswordResetSuccess';
import VerifyEmailSuccess from '../views/Parse/views/VerifyEmailSuccess';
import UnableToConnectToServer
  from '../views/Status/UnableToConnectToServerPage';

const routes = {
    // "/": () => <Dashboard/>,
    "/invalid-link": () => <InvalidLink/>,
    "/invalid-verification-link": () => <InvalidVerificationLink/>,
    "/link-send-fail": () => <LinkSendFail/>,
    "/verify-email-success": () => <VerifyEmailSuccess/>,
    "/choose-password": () => <ChoosePassword/>,
    "/password-reset-success": () => <PasswordResetSuccess/>,
    "/no-connection": () => <UnableToConnectToServer/>
};

export default routes;
