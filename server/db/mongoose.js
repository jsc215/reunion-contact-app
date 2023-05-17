const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

// need to have condition for using prod or locoal db
mongoose.connect(uri || 'mongodb://localhost:27017/abington-reunion-app', {});

// mongoose.set('useCreateIndex', true);
module.exports = { mongoose };
