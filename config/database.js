import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', function(err) {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', function() {
  console.error('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;
