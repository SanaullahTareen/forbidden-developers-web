/**
 * Admin Password Reset Script
 * ============================
 * Use this script to reset admin password if you forget it.
 * 
 * Usage:
 *   node scripts/resetPassword.js <email> <newPassword>
 * 
 * Example:
 *   node scripts/resetPassword.js admin@example.com MyNewSecurePass123!
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Inline Admin schema to avoid model compilation issues
const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
    isActive: Boolean,
    loginAttempts: Number,
    lockUntil: Date
});

const Admin = mongoose.model('Admin', adminSchema);

async function resetPassword() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('\n❌ Error: Missing arguments');
        console.log('\n📖 Usage:');
        console.log('   node scripts/resetPassword.js <email> <newPassword>');
        console.log('\n📝 Example:');
        console.log('   node scripts/resetPassword.js admin@example.com MyNewSecurePass123!');
        console.log('\n⚠️  Password requirements:');
        console.log('   - Minimum 8 characters');
        console.log('   - Recommended: mix of letters, numbers, symbols\n');
        process.exit(1);
    }

    const [email, newPassword] = args;

    // Validate password
    if (newPassword.length < 8) {
        console.log('\n❌ Error: Password must be at least 8 characters long\n');
        process.exit(1);
    }

    try {
        // Connect to MongoDB
        console.log('\n🔗 Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find admin by email
        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if (!admin) {
            console.log(`\n❌ Error: No admin found with email: ${email}`);
            console.log('\n💡 Tip: Run "node scripts/seedAdmin.js" to create a new admin account\n');
            process.exit(1);
        }

        // Hash new password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password and reset lockout
        await Admin.updateOne(
            { _id: admin._id },
            {
                $set: {
                    password: hashedPassword,
                    loginAttempts: 0
                },
                $unset: { lockUntil: 1 }
            }
        );

        console.log('\n✅ Password reset successful!');
        console.log(`\n📧 Email: ${email}`);
        console.log(`🔑 New Password: ${'*'.repeat(newPassword.length)}`);
        console.log('\n🔐 You can now login at: /fd-admin-portal\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message, '\n');
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

resetPassword();
