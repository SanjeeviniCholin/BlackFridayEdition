require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('Please set MONGO_URI in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const users = [
    { name: 'Sanju', email: 'sanju@gmail.com', password: 'password123' },
    { name: 'Sanjeevini',   email: 'sanjeevini@gmail.com',   password: 'password123' }
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      console.log('User exists:', u.email);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 10);
    await User.create({ name: u.name, email: u.email, password: hashed });
    console.log('Created', u.email, 'password:', u.password);
  }

  console.log('Seeding done');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
