const express = require("express");
const gateway = require("fast-gateway");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

// here you can write middlewares
// const auth = async (req, res, next) => {
//       try {
//             const authHeader = req.headers['authorization'];
//             const token = authHeader && authHeader.split(' ')[1];
//             if (!token) {
//                   return res.status(401).json({ message: 'No token provided' });
//             }
//             jwt.verify(token, jwtPrivateKey, (err, decoded) => {
//                   if (err) {
//                         return res.status(403).json({ message: 'Failed to authenticate token' });
//                   }
//                   // The token is valid, you can access the decoded payload
//                   if (decoded && decoded.id == req.body.id && decoded.mobile == req.body.mobile) {
//                         req.id = decoded.id;
//                         return next();
//                   } else {
//                         return res.status(403).json({ message: 'Failed to authenticate token' });
//                   }
//             });
//       } catch (error) {
//             console.log("error...", error)
//       }
// }
const server = gateway({
      //here you can call middlewares as globelly
      // middlewares:[auth],
      routes: [
            {
                  prefix: '/order',
                  target: 'http://localhost:3001/',
                  // methods:['GET','POST'],
                  // middlewares:[auth],
                  hooks: {

                  }
            },
            {
                  prefix: '/users',
                  target: 'http://localhost:3000/',
                  // methods:['GET','POST'],
                  // middlewares:[auth],
                  hooks: {
                  }
            },
      ]
});
server.get('/apigateway', (req, res) => {
      res.send("this is api gateway call!");
});

server.start(PORT).then(server => {
      if (server) {
            console.log("API gateway is running...");
      }
      else {
            console.log("API gateway not running...");
      }
});