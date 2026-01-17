// Logging Middleware
// Created: January 17, 2026
// Purpose: Log API requests and responses

const logger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`
  );
  
  // Log request body (excluding passwords)
  if (Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = '***HIDDEN***';
    if (sanitizedBody.token) sanitizedBody.token = '***HIDDEN***';
    console.log('Request Body:', sanitizedBody);
  }
  
  // Capture original send function
  const originalSend = res.send;
  
  res.send = function(body) {
    const duration = Date.now() - start;
    
    // Log response
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ` +
      `Status: ${res.statusCode} - Duration: ${duration}ms`
    );
    
    // Log error responses
    if (res.statusCode >= 400) {
      try {
        const responseBody = JSON.parse(body);
        console.log('Error Response:', {
          message: responseBody.message,
          success: responseBody.success
        });
      } catch (e) {
        console.log('Response Body:', body);
      }
    }
    
    // Call original send
    originalSend.call(this, body);
  };
  
  next();
};

module.exports = logger;
