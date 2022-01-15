const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const customCss = fs.readFileSync(`${process.cwd()}/swagger.css`, 'utf8');

const userRouter = require('./routes/userRoutes');

// Start express app
const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);
app.get('/', (req, res) => res.json({ msg: 'Welcome to the Grace API' }));
app.use('/api/v1/users', userRouter);

module.exports = app;
