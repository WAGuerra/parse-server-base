/**
 * The status of request to the server.
 *
 * It can be:
 *  - 0 initializing
 *  - 1 loading
 *  - 2 success
 *  - 3 fail
 */
export enum RequestStatus {
  initializing = 'initializing',
  loading = 'loading',
  success = 'success',
  fail = 'fail'
}

/**
 * The status of the live query websocket
 */
export enum LiveQuerySubscriptionStatus {
  open= 'open',
  notConnected = 'notConnected',
  fail = 'fail'
}
