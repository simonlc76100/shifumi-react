export function parseJwt(token) {
  const base64 = token.split(".")[1];
  return JSON.parse(window.atob(base64)).username;
}
