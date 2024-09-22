
// // setupMiddlewares: (middlewares, devServer) => {
// //   if (!devServer) {
// //     throw new Error('webpack-dev-server is not defined');
// //   }

// //   // Add your custom middleware here
// //   middlewares.push((req, res, next) => {
// //     // Your middleware logic
// //     next();
// //   });

// //   return middlewares;
// // }

// const webpack = require('webpack');

// module.exports = {
//   // Your existing config...
//   devServer: {
//     // setupMiddlewares: (middlewares, devServer) => {
//     //   // Add your middleware logic here
//     //   return middlewares;
//     // },

//     setupMiddlewares: (middlewares, devServer) => {
//       if (!devServer) {
//         throw new Error('webpack-dev-server is not defined');
//       }

//       // Add your custom middleware here
//       middlewares.push((req, res, next) => {
//         // Your middleware logic
//         next();
//       });

//       return middlewares;
//     }
//   },
// };

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares; // No custom middleware
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // Other devServer options...
  },
};
