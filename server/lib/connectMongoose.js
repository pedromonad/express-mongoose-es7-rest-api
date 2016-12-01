'use strict';

const mongoose = require('mongoose');
const localConfig = require('../config/localConfig');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function(err) {
    console.error('mongodb connection error:', err);
    process.exit(1);
});

conn.once('open', function() {
    console.info('Connected to Mongodb.');
});

console.log(`Connecting to ${localConfig.uri} ...`);

mongoose.connect(localConfig.uri, localConfig.options);

export { conn };
