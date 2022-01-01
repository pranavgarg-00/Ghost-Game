const HTTP = require('http-status-codes');

/** Constructs a 404 handling middleware.
 *
 * @param {winston.Logger} logger Log output
 * @return {e.RequestHandler} 404 handler
 */
function notFoundHandler() {
  return (req, res) => {
    // logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(HTTP.StatusCodes.NOT_FOUND).send("Page not found");
  };
}

module.exports = notFoundHandler;