// module.exports = function (req, res, next) {
//   const log = {
//     method: req.method,
//     url: req.originalUrl,
//     time: new Date().toISOString(),
//   };
//   console.log(JSON.stringify(log));
//   next();
// };


module.exports = function (req, res, next) {
  const log = {
    logID: "8d7fa4bf-9037-4825-a42b-04488cf469fa", // Your unique ID
    method: req.method,
    url: req.originalUrl,
    time: new Date().toISOString(),
    message: "log created successfully", // Your message
  };

  console.log(JSON.stringify(log));
  next();
};
