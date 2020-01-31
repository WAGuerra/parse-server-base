import {
  appId, cloudCodeMain, databaseUri, masterKey, serverUrl,
} from './config';
import liveQueryClassNames from './LiveQueryClasses';
import colors from 'colors';

const ParseServer = require('parse-server').ParseServer;

console.info('\nParse endpoint:\t', colors.cyan(serverUrl));
console.info('Database uri:\t', colors.cyan(databaseUri));

const parseServer = new ParseServer({
  databaseURI: databaseUri,
  cloud: cloudCodeMain,
  appId: appId,
  masterKey: masterKey, //Add your master key here. Keep
  // it secret!
  serverURL: serverUrl,
  logLevel: process.env.PARSE_LOG_LEVEL || 'error',
  liveQuery: {
    /**
     * List of classes to support for query subscriptions
     */
    classNames: liveQueryClassNames,
  },
  /**
   *  verifyUserEmails: true,// Enable email
   * verification preventLoginWithUnverifiedEmail: true, publicServerURL:
   * serverUrl, // The public URL of your app. This will appear in the link
   * that is used to verify email addresses and reset passwords. Set the mount
   * path as it is in serverURL emailVerifyTokenValidityDuration: 2 * 60 * 60,
   * in seconds (2 hours = 7200 seconds)
   **/
  //revokeSessionOnPasswordReset: true,
  // emailAdapter: {
  //     module: "@parse/simple-mailgun-adapter", options: {
  // The address that your emails come from
  // fromAddress: "nao-responda@domain", // Your domain
  // from
  // mailgun.com
  // domain: "domain", // Your API key from mailgun.com
  // apiKey: "apiKey"
  // }
  // },
  passwordPolicy: {
    /**
     * enforce  password  with at least 8 char with at least 1 lower case, 1
     * upper case and 1 digit
     */
    validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    /**
     * optional error message to be sent instead of the default
     */
    validationError: 'password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit',
    /**
     * "Password does not meet the Password Policy requirements." message.
     * optional setting to disallow username in passwords
     */
    doNotAllowUsername: true,
    /**
     * optional setting to prevent reuse of previous n passwords. Maximum value
     * that can be specified is 20. Not specifying it or specifying 0 will not
     * enforce history.
     */
    maxPasswordHistory: 3,
    /**
     * optional setting to set a validity duration for password reset links (in
     * seconds) expire after 24 hours
     */
    resetTokenValidityDuration: 24 * 60 * 60,
  },
  accountLockout: {
    /**
     * duration policy setting determines the number of minutes that a
     * locked-out account remains locked out before automatically becoming
     * unlocked. Set it to a value greater than 0 and less than 100000.
     **/
    duration: 5,

    // threshold policy setting determines the number of
    // failed sign-in attempts that will cause a user account
    // to be locked. Set it to an integer value greater than 0
    // and less than 1000.
    threshold: 3,
  },
  customPages: {
    invalidLink: serverUrl + '/invalid-link',
    invalidVerificationLink: serverUrl + '/invalid-verification-link',
    linkSendFail: serverUrl + '/link-send-fail',
    verifyEmailSuccess: serverUrl + '/verify-email-success',
    choosePassword: serverUrl + '/choose-password',
    passwordResetSuccess: serverUrl + '/password-reset-success',
  },
});

// Register subclasses here

export default parseServer;