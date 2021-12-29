const HTTP = require('http-status-codes');

/** Constructs a 404 handling middleware.
 *
 * @param {winston.Logger} logger Log output
 * @return {e.RequestHandler} 404 handler
 */
function notFoundHandler(logger) {
  return (req, res, next) => {
    res.status(HTTP.StatusCodes.NOT_FOUND).send("Page not found");
    logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  };
}

module.exports = notFoundHandler;