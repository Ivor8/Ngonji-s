const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@ngonji.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email: admin@ngonji.com');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create new admin user
    const admin = new Admin({
      email: 'admin@ngonji.com',
      password: '12345678',
      name: 'Administrator',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@ngonji.com');
    console.log('🔑 Password: 12345678');
    console.log('👤 Name: Administrator');
    console.log('🎭 Role: admin');

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
