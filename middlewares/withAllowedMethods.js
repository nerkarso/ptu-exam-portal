/**
 * This middleware checks which HTTP methods are allowed
 */
export const withAllowedMethods = (handler, methods) => (req, res) => {
  // Method is allowed
  if (methods.includes(req.method)) return handler(req, res);
  // Method is not allowed
  res.setHeader('Allow', methods);
  return res.status(405).json({
    error: true,
    message: `Method ${req.method} Not Allowed`,
  });
};
