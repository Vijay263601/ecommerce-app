🛒 E-Commerce Web Application (with Admin Dashboard & Razorpay)

A fully functional e-commerce web application built using HTML, CSS, and JavaScript, featuring a complete shopping flow, admin dashboard, and Razorpay payment gateway integration (test mode).

This project demonstrates real-world frontend engineering concepts such as state management, admin control, payment handling, and modular UI design.

🚀 Live Features
👤 User Side

Browse products with search & filters

Product detail pages with:

Multiple images

Original price (MRP) & discounted price

Reviews section

Add to cart with stock management

Update quantities & remove items

Apply coupons

Checkout with Razorpay (UPI / Card / Wallets)

View order history

🧑‍💼 Admin Dashboard

Secure Admin Login

Product management:

Add / Edit / Delete products

Multiple images per product

MRP vs selling price

Stock control

Manage:

Coupons

Ads / announcements

View customer orders

Mark orders as Paid / Cancelled

💳 Payment Integration

Razorpay Checkout (Test Mode)

Supports:

UPI

Credit / Debit Cards

Wallets & Netbanking

Orders are automatically marked as PAID on successful payment

⚠️ No real money is deducted (test mode only)

🛠️ Tech Stack

HTML5

CSS3 (Responsive, modern UI)

JavaScript (Vanilla JS)

Razorpay Checkout API

LocalStorage for state & data persistence

📂 Project Structure
/ (root)
│
├── index.html          # Product listing
├── product.html        # Product details
├── cart.html
├── checkout.html
├── orders.html
│
├── /admin
│   ├── login.html
│   ├── index.html
│   ├── products.html
│   ├── orders.html
│   ├── coupons.html
│   ├── ads.html
│
├── /css
│   └── style.css
│
├── /js
│   ├── data.js
│   ├── shop.js
│   ├── cart.js
│   ├── checkout.js
│   ├── orders.js
│
└── README.md

🔐 Admin Login (Demo)
Username: admin
Password: 1234


⚠️ Frontend-only authentication (for demo/portfolio use)

🧪 Razorpay Test Details

Use these in Razorpay popup:

✅ UPI
success@razorpay

✅ Card
4111 1111 1111 1111
Any Expiry | Any CVV

📌 How to Run Locally

Clone the repository

Open index.html in your browser

For admin panel, open:

/admin/login.html


No backend or server required

🧠 Key Learnings

E-commerce workflow design

Frontend state management using LocalStorage

Payment gateway integration

Admin vs user role separation

Modular and scalable UI architecture

⚠️ Disclaimer

This project is built for learning and portfolio purposes.
Authentication and payment verification are frontend-only.

✨ Future Enhancements (Optional)

Backend (Node.js + Database)

User authentication

Razorpay webhook verification

Invoice generation

Analytics dashboard

👨‍💻 Author

Vijay Singh Majila