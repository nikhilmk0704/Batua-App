/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.notAcceptable();
 * return res.notAcceptable(data);
 * return res.notAcceptable(data, 'some/specific/notAcceptable/view');
 *
 * e.g.:
 * ```
 * return res.notAcceptable(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function notAcceptable(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(406);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 406 ("Not Acceptable") response: \n',data);
  }
  else sails.log.verbose('Sending 406 ("Not Acceptable") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    data = undefined;
  }

  // If the user-agent wants JSON, always respond with JSON
  if (req.wantsJSON) {
    return res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if (options.view) {
    return res.view(options.view, { data: data });
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView({ data: data }, function couldNotGuessView () {
    return res.jsonx(data);
  });

};
