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

Create a `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
## Node Version:

v22.15.1

---

## How to Run (Backend):

```bash
cd backend
npm install
node app.js  # or nodemon app.js if nodemon is installed
```
---
### Project Status:
All backend tasks are amost complete.

## AI Contribution:

* 05% Backend coded by **me (Sonia)**
* 95% Guidance, route logic, and validation assistance by **ChatGPT**

---
### Possible Bugs or Issues 

OTP email not received:
Sometimes the OTP email may go to the spam folder or may not be delivered due to email service limits.

User tries to update username too early:
If a user tries to change their username before 24 hours, they may see an error. 

Password reset not working properly:
If OTP is expired or incorrect, users might not understand why reset is failing. 
Old token used after logout:
If a user logs out but still has an old token saved in localStorage, they may stay logged in unless you handle it on the frontend.

Server crash on missing .env values:
If .env file is missing or incomplete (like missing EMAIL_USER or JWT_SECRET), your server might crash or fail to start.

Image upload fails silently:
If multer doesn’t receive the file correctly, the upload might silently fail. Always check if the file exists before saving in DB.

Date of Birth edge case:
If user enters a date very close to turning 15, age calculation might allow or block them depending on exact time — so test this carefully.

Frontend doesn't send token:
If the frontend forgets to send the JWT token in the headers, protected APIs like the dashboard will not work and show “Unauthorized”.



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

## Credits:

This backend was developed by **Sonia** as part of a full-stack authentication project with AI support for logic refinement and error debugging.
