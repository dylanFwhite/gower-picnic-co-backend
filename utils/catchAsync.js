// Async error wrapper
// Returns the input function 'wrapped' in a catch that passed any resulting
// error objects to the 'next()' function
export default (fn) => (req, res, next) => fn(req, res, next).catch(next);
