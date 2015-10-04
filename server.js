import P from 'bluebird';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';

import routes from './config/routes';
import errorHandler from './app/middlewares/error_handler';

P.onPossiblyUnhandledRejection(::console.log);

let app = express();

// all environments
app.use(morgan(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

// Routes
let router = require(`express-promise-router`)();
routes(router);
app.use(`/`, router);

//Catch 404 and forwarding to error handler
app.use(function(err, req, res, next) {
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
