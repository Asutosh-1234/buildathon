export const asynchandler = (func) => {
  return async (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};
