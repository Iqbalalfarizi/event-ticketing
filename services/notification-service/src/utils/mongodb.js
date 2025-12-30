const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Mongodb Connected');
  } catch (error) {
    console.log('❌ Mongodb connection error: ', error);
    process.exit(1);
  }
};

module.exports = connectMongo;
