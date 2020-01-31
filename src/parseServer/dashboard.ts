import {appId, masterKey, parseDashboardRootPass, serverUrl} from './config';

const ParseDashboard = require('parse-dashboard');

const dashboard = new ParseDashboard({
  'apps': [
    {
      'serverURL': serverUrl,
      'appId': appId,
      'masterKey': masterKey,
      'appName': "Application", //TODO change if needed
      'supportedPushLocales': ['en', 'pt'],
    },
  ],
  'users': [
    {
      'user': 'dashboard-root',
      'pass': parseDashboardRootPass,
    },
  ],
  /**
   * To be used with a reverse proxy. No need to check if it is a secure
   * channel.
   */
  'trustProxy': 1,
}, {
  /**
   * Considering that the server is behind a Reverse Proxy.
   */
  allowInsecureHTTP: true,
});

export default dashboard;