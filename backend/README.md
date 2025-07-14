# 📘 Backend README - User Authentication System

## Project Title:

**User Signup & Dashboard (Backend)**

## Author:

**Sonia**

---

## Technologies Used:

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT (JSON Web Token)
* Bcrypt for password hashing
* Multer for image uploads
* Nodemailer for OTP email
* dotenv for environment variables

---

## Backend Features:

* **Signup API** with:

  * Email, Password, Gender, DOB, Phone Number
  * Auto-generated username (editable after 24 hours only)
  * Password strength validation
  * Pakistani number validation (must start with "03" and be 11 digits)
  * Age check (must be 15+)
  * Profile and Cover image upload using Multer

* **Login API**

  * Verifies email & password
  * Returns JWT token and userId

* **Dashboard API**

  * Protected by JWT middleware
  * Returns user data (email, gender, username, dob, images)

* **Update Username API**

  * Checks 24-hour limit before allowing change

* **Update Profile/Cover Images API**

  * Uploads to `uploads/` folder, updates DB

* **Forgot Password API**

  * Sends OTP email via Nodemailer
  * Resend OTP if expired

* **Reset Password API**

  * Accepts new password & confirms it

---

## Validations:

* Password must include:

  * At least 8 characters
  * Uppercase, lowercase, number, special character
* Phone number must:

  * Start with "03"
  * Be 11 digits long
* Username change allowed only after 24 hours
* DOB check: Minimum 15 years old

---

## Security:

* All passwords hashed using bcrypt
* JWT used for protected routes
* Tokens stored in frontend localStorage
* Environment variables used for secrets (via `.env`)

---

## How to Run (Backend):

```bash
cd backend
npm install
node app.js  # or nodemon app.js if nodemon is installed
```

Create a `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## AI Contribution:

* 05% Backend coded by **me (Sonia)**
* 95% Guidance, route logic, and validation assistance by **ChatGPT**

---

## 📁 Folder Structure:

```
backend/
├── controller/
│   └── userController.js
├── model/
│   └── userModel.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   └── userRoute.js
├── config/
│   └── db.js
├── uploads/
├── .env
├── app.js
└── package.json
```

---

## 💬 Credits:

This backend was developed by **Sonia** as part of a full-stack authentication project with AI support for logic refinement and error debugging.
