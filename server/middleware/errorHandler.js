const HTTP = require('http-status-codes');

/** Constructs an error handling middleware.
 *
 * @param {winston.Logger} logger Log output
 * @return {e.ErrorRequestHandler} Error handler
 */
function errorHandler(logger) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, _) => {
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    //logger.error(logger.exceptions.getAllInfo(err));
    res.status(HTTP.StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  };
}

module.exports = errorHandler;
