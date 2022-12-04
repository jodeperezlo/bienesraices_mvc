// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import express from 'express';
import config from './config/config.js';
import routerAPI from './api/v1/routes/index.js';
import { dbConnection } from './config/database.js';

// Create a new express application instance
const app = express();

// Connection to database
try {
  await dbConnection.authenticate();
  dbConnection.sync();
  console.log(`Connection has been established successfully to ${config.DB_DATABASE}`);
} catch (error) {
  console.error(`Unable to connect to the database ${config.DB_DATABASE}: ${error}`);
}

// Define the port
app.set('port', config.PORT);

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Pug
app.set('view engine', 'pug');
app.set('views', './src/views');

// Routes
const api = config.APP_URL;

// Default route
app.get(`${api}`, (req, res) => {
  res.end(
    `<h1>Welcome to Bienes Raíces App</h1> <h2>Made with NodeJS</h2> <p>Access to: <b>${api}/api-docs</b> for more information about the API REST.</p>`
  );
});

// Other Routes
routerAPI(app);

// Public folder
app.use(express.static('./src/public'));

// Export App
export default app;
