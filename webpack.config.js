module.exports={
 output: {
                      path: __dirname +"/frontend/static/frontend",
                    filename: "main.js"
  },
    module: {
            rules:[
                {
                test: /\.js$/,
                exclude:/node_modules/,
                use: {
                    loader:"babel-loader"
                    }
                }

            ]

         }

};

