export default function handleRequestError(error, extra) {
  const { response } = error;
  if (!response || response.status >= 500) {
    reportError(error, extra);
    return;
  }
  reportWarning(error, extra);
}