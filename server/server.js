'use strict';

const express = require('express');
const path = require('path');
// const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// const webpackConfig = require('../webpack.config')
const config = require('../config');
const app = express();
const opn = require('opn');
const rp = require('request-promise');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackconfig = require('../webpack.config.js');

const app = express();
const webpackcompiler = webpack(webpackconfig);

// enable webpack middleware for hot-reloads in development
const useWebpackMiddleware = (expressApp) => {
  expressApp.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false, // this reduces the amount of stuff I see in my terminal;
      // configure to your needs
      'errors-only': true,
    },
  }));

  expressApp.use(webpackHotMiddleware(webpackcompiler, {}));

  return expressApp;
};

useWebpackMiddleware(app);

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
// opts.secretOrKey = config.SECRET_OR_KEY;
// opts.issuer = 'gusty.banjo.com';
// opts.audience = 'localhost';

// passport.use(new JwtStrategy(opts, (jwt_payload, done)) {
//   User.findOne({id: jwt_payload.sub}, (error, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   })
// }));

// main server
app.use(express.static(path.join(__dirname, '/../client')));

app.get('/', (req, res) => {
  res.render('index');
});

/* Example HTTP GET request
  http://localhost:3000/events?eventName=THIS IS A NEW EVENT
*/
// This endpoint retrieves details about a single event based on event name match.
// This makes a HTTP GET Request to the Ethereum server
app.get('/api/events', (req, res) => {
  let reqObj = {};
  if (req.query.eventName) {
    reqObj = {
      url: `${config.SERVER_URL}:${config.ETH_SERVER_PORT}/api/findEvent`,
      qs: {
        eventName: req.query.eventName,
      },
    };
  } else {
    reqObj = {
      url: `${config.SERVER_URL}:${config.ETH_SERVER_PORT}/api/getAllEvents`,
    };
  }

  rp(reqObj).then((obj) => {
    res.status(200).send(obj);
  }).catch((err) => {
    res.status(500).send(err.error);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

app.listen(config.SERVER_PORT);
