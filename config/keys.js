if (process.env.NODE_ENV == 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}

// module.exports = {
//   secret: process.env.JWT_SECRET,
//   encode: process.env.JWT_ENCODE
// };
