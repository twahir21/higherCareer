const crypto = require('crypto');
const nodemailer = require('nodemailer');

const dotenv = require("dotenv")
dotenv.config();

function generateOtp() {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
}


async function sendOtp(userId, email) {
    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 60 * 1000); // Expires in 60 seconds

    // Save OTP to database
    const query = `
        INSERT INTO otp (user_id, otp_code, expires_at) 
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id) 
        DO UPDATE SET otp_code = $2, expires_at = $3, attempts = 0, is_verified = FALSE
    `;
    const values = [userId, otpCode, expiresAt];

    try {
        await Database.query(query, values);

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.email-pswd,
            },
        });

        await transporter.sendMail({
            from: '"Your App" <your-email@gmail.com>',
            to: email,
            subject: 'Account Activation Approved - Your OTP Code Inside ✨',
            html: `
                <p>Dear User,</p>
                <p>We are pleased to inform you that your account has been approved by the admin. 🎉</p>
                <p>Your OTP code for activating your account is: <strong>${otpCode}</strong></p>
                <p><strong>Note:</strong> This OTP will expire in 60 seconds, so please use it promptly.</p>
                <p>If you encounter any issues, feel free to contact the HCA technical support team. 🚀</p>
                <br/>
                <p>Best Regards,<br/>The HCA Team</p>
            `,
        });
        

        console.log('OTP sent to email:', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}

// verify 
async function verifyOtp(userId, otpCode) {
    const query = `
        SELECT otp_code, expires_at, attempts 
        FROM otp 
        WHERE user_id = $1
    `;
    const values = [userId];

    try {
        const result = await Database.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('OTP not found');
        }

        const { otp_code, expires_at, attempts } = result.rows[0];

        if (attempts >= 5) {
            throw new Error('Maximum OTP attempts exceeded');
        }

        if (new Date() > new Date(expires_at)) {
            throw new Error('OTP has expired');
        }

        if (otpCode !== otp_code) {
            // Increment attempts
            const updateQuery = `
                UPDATE otp 
                SET attempts = attempts + 1 
                WHERE user_id = $1
            `;
            await Database.query(updateQuery, [userId]);
            throw new Error('Invalid OTP');
        }

        // Mark OTP as verified
        const updateQuery = `
            UPDATE otp 
            SET is_verified = TRUE 
            WHERE user_id = $1
        `;
        await Database.query(updateQuery, [userId]);

        return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
}


// resend
async function resendOtp(userId, email) {
    const query = `
        SELECT expires_at, attempts 
        FROM otp 
        WHERE user_id = $1
    `;
    const values = [userId];

    try {
        const result = await Database.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('No OTP found to resend');
        }

        const { expires_at, attempts } = result.rows[0];

        if (attempts >= 5) {
            throw new Error('Maximum OTP attempts exceeded');
        }

        if (new Date() < new Date(expires_at)) {
            throw new Error('OTP has not yet expired');
        }

        // Generate and send a new OTP
        await sendOtp(userId, email);
    } catch (error) {
        console.error('Error resending OTP:', error);
        throw error;
    }
}
