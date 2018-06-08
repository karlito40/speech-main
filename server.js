const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const request = require('request');
const dotenv = require('dotenv');
const RateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

dotenv.config({ path: ".env" });

var apiLimiter = new RateLimit({
  windowMs: 60*1000,
  max: 20,
  delayMs: 0
});

app.prepare()
  .then(() => {
    const server = express();

    server.disable('x-powered-by');
    server.enable('trust proxy');

    server.use(helmet());
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('/posts/:id', (req, res) => {
      return app.render(req, res, '/test/posts', { id: req.params.id })
    });

    server.all('/api*', apiLimiter, (req, res) => {
      const method = req.method.toLowerCase();
      request[method]({
        url: process.env.API_HOST + req.params[0],
        headers: { Authorization: req.headers['authorization'] },
        form: req.body
      }).pipe(res);
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
  })
