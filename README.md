# 🥦 Veggis - E-Commerce Backend

This is the backend for **Veggis**, a full-stack e-commerce project I'm building with Next.js and MongoDB. My main focus here was setting up a clean administrative workflow and making sure the data handling for products and orders is solid.

---

## Current Features

###  Admin & Moderator System
I wanted a secure way to bring moderators onto the platform without just giving out passwords. 
* **Invitation Logic:** Admins can invite moderators. I'm using **Resend** to send out the invite emails.
* **Token Verification:** Built a 6-digit token system. Once a moderator is invited, they have a set time to verify their account and set a password.
* **Security:** Using **Bcrypt** for password hashing. Once a password is set, the invitation token is cleared from the database for security.

###  E-Commerce Logic
* **Product & Checkout Schemas:** Designed the Mongoose models to handle everything from product details to the final checkout process.
* **Image Management:** Instead of storing images on my own server, I hooked up **ImageKit** to handle uploads and serve images fast via their CDN.
* **Validation:** I'm using **Zod** throughout the project to validate API requests and keep the data clean.

---

## Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Database:** MongoDB with Mongoose
* **Email:** Resend
* **Images:** ImageKit
* **Validation:** Zod



---

##  Feedback
Feedback and code reviews are welcome! Feel free to explore the logic and open an issue if you have suggestions.
