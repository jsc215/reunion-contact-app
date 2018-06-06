const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// need to have condition for using prod or locoal db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abington-reunion-app');
module.exports = { mongoose };
