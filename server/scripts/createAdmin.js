const mongoose = require('mongoose');
const Admin = require('../models/Admin');

mongoose.connect('mongodb://localhost:27017/cp3DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const admin = new Admin({
      username: 'admin',
      password: '$2a$12$hnkcuOp5/3WK7J4ZSkp.zO8V5FvW0V4ThUHlCOwgI8EvJp/7ibLcO'
    });
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
