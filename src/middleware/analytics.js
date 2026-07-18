// analytics middleware
const analyticsMiddleware = (req, res, next) => {
  const startTime = Date.now();

  console.log(`[Analytics] ${req.method} ${req.path} - Started`);
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[Analytics] ${req.method} ${req.path} - Completed in ${duration}ms - Status: ${res.statusCode}`);
  });

  next();
};

module.exports = analyticsMiddleware;
