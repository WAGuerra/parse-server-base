export function getUrlParameter(name: string): string {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(
      /\+/g,
      ' ',
  ));
}

export function baseUrl(): string {
  const location = window.location;
  return `${location.protocol}//${location.host}`;
}

export function parseServerUrl(): string {
  return `${baseUrl()}${process.env.REACT_APP_PARSE_URI}`;
}
