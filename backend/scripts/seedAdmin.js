require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Admin = require('../model/Admin');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file');
            process.exit(1);
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: adminEmail });

        if (existingAdmin) {
            // Update existing admin's password
            existingAdmin.password = adminPassword;
            await existingAdmin.save();
            console.log('✅ Admin password updated successfully!');
            console.log(`   Email: ${adminEmail}`);
        } else {
            // Create new admin
            const admin = new Admin({
                email: adminEmail,
                password: adminPassword,
                name: 'Super Admin',
                role: 'superadmin',
                isActive: true
            });

            await admin.save();
            console.log('✅ Admin user created successfully!');
            console.log(`   Email: ${adminEmail}`);
            console.log(`   Role: superadmin`);
        }

        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
