module.exports = {
    mode: 'production',
    entry: ['./src/app.js'],  // <-- make sure that this line matches the path to your starting js file
    output: {
      filename: './bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    }
  };
  