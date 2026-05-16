export function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV === 'development';
  const status = err.status || err.statusCode || 500;

  if (status >= 500) {
    console.error('[Error]', err);
  }

  res.status(status).json({
    success: false,
    message: err.message || 'An unexpected error occurred.',
    ...(isDev && { stack: err.stack }),
  });
}
