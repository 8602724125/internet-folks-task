const mongoose = require('mongoose');

const mongoURI = process.env.MONGODBURI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose; 