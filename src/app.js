import bodyParser from 'body-parser';
import express from 'express';
import { AuthService } from './auth.service';

let web = express();
const port = process.env.PORT || 3000;

web.use(bodyParser.json({ limit: '50mb' }));
web.use(bodyParser.urlencoded({ extended: false }));

web.all('*', function (req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${req.method} ${req.path}`, req.body);
  }
  next();
});

web.get('/', function (req, res) {
  res.status(403).end();
});

web.post('/api/login', function (req, res) {
  try {
    res
      .json(AuthService.login(req.body.user, req.body.password))
      .end();
  } catch (err) {
    res
      .status(401)
      .end();
  }
});

web.get('/api/status', function (req, res) {
  res.json({
    name: 'auth-service',
    status: 200,
    message: 'healthy'
  });
});

web.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
