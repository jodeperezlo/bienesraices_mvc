// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV),
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  APP_URL: process.env.APP_URL || '/api',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_DATABASE: process.env.DB_DATABASE || 'DatabaseName',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
};
