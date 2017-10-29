require('babel-register');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// const session = require('cookie-session');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const apiMiddleware = require('../middlewares/apiMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const decodeSub = require('../middlewares/decodeSub');
const authCheck = require('./authCheck');
const renderServerSide = require('./renderServerSide');
const { port, host } = require('../appConfig');

require('css-modules-require-hook')({ generateScopedName: '[name]__[local]___[hash:base64:5]' });
require('../middlewares/authMiddleware/passport')(passport);

const app = express();

app.use(helmet());
// // Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(express.static('public'));
app.use(express.static('media'));
app.use(favicon(path.join(process.cwd(), './media/favicon.ico')));
// required for passport (check which ones are peer dependency)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'ilovescotch' }));
app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
app.use(decodeSub);
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('../../webpack.config');
  const devMiddleware = require('webpack-dev-middleware');
  const hotDevMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  const devMiddlewareConfig = {
    noInfo: true,
    stats: { colors: true },
    publicPath: config.output.publicPath,
  };
  app.use(devMiddleware(compiler, devMiddlewareConfig));
  app.use(hotDevMiddleware(compiler));
}

// const corsOptions = { origin: apiConfig.apiURL, optionsSuccessStatus: 200 };
const whitelist = [`http://${host}`, 'https://beckfriends.herokuapp.com', 'http://beckfriends.herokuapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if ((whitelist.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/auth', cors(corsOptions), authMiddleware);

app.use('/api', cors(corsOptions), authCheck, apiMiddleware);
app.get('*', renderServerSide);

if (port) {
  app.listen(port, (error) => {
    if (error) console.error(error);
    console.info(`==> 🌎  Listening on port ${port}`);
  });
} else {
  console.error('==> 😭 No PORT environment variable has been specified');
}
