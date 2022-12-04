// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import app from './app.js';
import config from './config/config.js';

app.listen(app.get('port'));
console.log(`Server is running on: http://${config.HOST}:${app.get('port')}${config.APP_URL}`);
