const morgan = require('morgan');

/** Constructs an HTTP logging middleware.
 *
 * @param {winston.Logger} logger Log output
 * @return {e.RequestHandler} Logger
 */
function httpLogger(logger) {
    // or use combined
  return morgan('dev', { stream: { write: (message) => logger.info(message) } });
}

module.exports = httpLogger;