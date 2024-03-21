const express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  errorhandler = require('errorhandler');
  const connection = require("./config/dbConnection");


const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const os = require("os");
const userModel = require('./app/models/customer/v1/Customers');
const cpuCores = os.cpus().length;
//console.log('CPU Cores',cpuCores);

// Create global app object
const app = express();
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'app/api/swagger.yaml'), 'utf8'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, decryption");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Expose-Headers', 'File-name')
  next();
});

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs', express.static(path.join(__dirname, 'app/api/swagger.yaml')));

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// if (!isProduction) {
app.use(errorhandler());
// }

app.use(require('express-status-monitor')())

//require('./lib/passport');

app.use(require('./app/routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {

    console.log(err.stack);

    res.status(err.status || 500);

    if ("inner" in err) {
      if (err.inner.name == 'TokenExpiredError') {
      //  sessionLogoutTime(req);
      }
    }

    if (req.headers.decryption === "false" || !req.headers.decryption) {
      res.json({
        'errors': {
          message: err.message,
          error: err
        }
      });
    } else {

      res.json({
        'errors': {
          message: err.message,
          error: err
        }
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if ("inner" in err) {
    if (err.inner.name == 'TokenExpiredError') {
     // sessionLogoutTime(req);
    }
  }

  //decryption check
  if (req.headers.decryption === "false" || !req.headers.decryption) {
    return res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  } else {

    res.json({
      'errors': {
        message: err.message,
        error: {}
      }
    });
  }
});

if (global.gc) {
   global.gc();
} else {
   console.log('Garbage collection unavailable.  use --expose-gc '
   + 'when launching node to enable forced garbage collection.');
}  

// finally, let's start our server...

var server = app.listen(process.env.PORT || 3000, async function () {
  await connection();
  console.log('Listening on port ' + server.address().port);
});

