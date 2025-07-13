const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hoomo';

const adminData = {
  name: 'Aastha Shrivastava',
  email: 'aasthashrivastava0804@gmail.com',
  password: '@Aastha0512',
  role: 'admin',
};

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({ role: 'admin' });
  const hash = await bcrypt.hash(adminData.password, 10);
  await User.create({
    name: adminData.name,
    email: adminData.email,
    password: hash,
    role: adminData.role,
  });
  const count = await User.countDocuments({ role: 'admin' });
  console.log(`Admin user seeded! Total admins: ${count}`);
  mongoose.disconnect();
}

seedAdmin(); 