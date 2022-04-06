export default function handleRequestError(error, extra) {
  const { request } = error;
  if (!request || request.status >= 500) {
    reportError(error, extra);
    return;
  }
  reportWarning(error, extra);
}